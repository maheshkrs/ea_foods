const jsonServer = require("json-server");
const dayjs = require("dayjs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Place order 
server.post("/orders", (req, res) => {
  const db = router.db;
  const { productId, qty, slot } = req.body;

  const product = db.get("products").find({ id: productId }).value();
  if (!product) return res.status(404).jsonp({ error: "Product not found" });

  if (qty > product.stock) {
    return res.status(400).jsonp({ error: "Insufficient stock" });
  }

  // Cutoff
  const now = dayjs();
  let deliveryDate = dayjs().add(1, "day");
  if (now.hour() >= 18) deliveryDate = deliveryDate.add(1, "day");

  // Deduct stock
  db.get("products").find({ id: productId }).assign({ stock: product.stock - qty }).write();

  const newOrder = {
    id: "o" + Date.now(),
    productId,
    qty,
    slot,
    deliveryDate: deliveryDate.format("YYYY-MM-DD"),
    status: "Scheduled",
    createdAt: now.toISOString()
  };

  db.get("orders").push(newOrder).write();
  res.status(201).jsonp(newOrder);
});

// Cancel order 
server.delete("/orders/:id", (req, res) => {
  const db = router.db;
  const order = db.get("orders").find({ id: req.params.id }).value();
  if (!order) return res.status(404).jsonp({ error: "Order not found" });

  const product = db.get("products").find({ id: order.productId }).value();
  if (product) {
    db.get("products").find({ id: product.id }).assign({ stock: product.stock + order.qty }).write();
  }

  db.get("orders").remove({ id: req.params.id }).write();
  res.status(200).jsonp({ message: "Order cancelled" });
});

//  update stock
server.post("/ops/update-stock", (req, res) => {
  const db = router.db;
  const { updates } = req.body;
  if (!Array.isArray(updates)) return res.status(400).jsonp({ error: "Invalid updates" });

  updates.forEach((u) => {
    db.get("products").find({ id: u.productId }).assign({ stock: u.newStock }).write();
  });

  res.status(200).jsonp({ ok: true,updates });
});

server.use(router);

server.listen(5000, () => {
  console.log(" Server running at http://localhost:5000");
});
