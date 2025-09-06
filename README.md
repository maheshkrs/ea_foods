EA Foods — Fullstack Assignment

This project implements the EA Foods pre-ordering system.
It consists of:

A mock backend using json-server + server.js.

A React + Redux Toolkit frontend built with Vite.

The app allows customers, TSUs (Trade Sales Units), and SRs (Sales Reps) to:

Browse products.

Place next-day pre-orders (cutoff logic at 6 PM).

Cancel orders (restoring stock).

For ops: manage bulk stock updates.

Project Structure
Project/
│── db.json           # Mock database
│── server.js         # Custom backend routes (bulk stock update, cancel restore)
│── package.json      # Backend dependencies
│── frontend/         # React + Vite frontend
│   ├── src ─────────────├──api
│   │                    ├──assets
│   │                    ├──components 
│   │                    ├──pages
│   │                    ├──redux
│   │                    ├──test
│   │                    ├──utils
│   │                    ├──App.css
│   │                    ├──App.jsx
│   │                    ├──setupTest.js
│   │                    ├──.estlintrc.js
│   │                    ├──index.html
│   │                    ├──package.json
│   │                    ├──postcss.config.cjs
│   │                    ├──tailwind.config.cjs
│   │                    ├──vite.config.js
│   │ 
│   │
│   ├── package.json
│   └── README.md
│── README.md         # (this file)

Getting Started
1. Install dependencies
# backend
npm install

# frontend
cd frontend
npm install

2. Start backend
npm run server


Serves db.json at http://localhost:5000 and adds custom endpoints from server.js:

POST /ops/update-stock → bulk stock update.

DELETE /orders/:id → cancel order & restore stock.

3. Start frontend
cd frontend
npm run dev


Visit: http://localhost:5173

4. Run tests
cd frontend
npm run test

Testing

Unit tests:

utils/dateUtils.test.js → cutoff logic (+1 day vs +2 days).

productsSlice.test.js, ordersSlice.test.js → reducers, fulfilled/rejected cases.

Integration tests:

Catalog.test.jsx → verifies loading state, product rendering.

All tests use Vitest + React Testing Library with data-testid attributes for reliable selectors.

Design Notes
Assumptions

Cutoff time: orders after 6 PM → delivery in 2 days; before 6 PM → next day.

Cancel order: restores product stock in both Redux state and backend.

Ops Manager updates : updates stock 8:03AM and 6:03PM

Roles: TSUs and SRs use the same order placement UI as customers.

Persistence: json-server used; no real DB.

Auth: skipped for assignment scope.

Trade-offs

json-server chosen over MirageJS: simpler, easier to demo, less bundle overhead.

TailwindCSS instead of UI kit: faster dev, consistent design, lightweight.

Optimistic UI for stock updates: UI updates immediately, then re-sync with server. Safer but requires careful rollback handling in real apps.

Lazy-loaded routes: reduces initial bundle but adds Suspense complexity.

Edge Cases handled

Canceling order → product stock restored.

Placing order with quantity > stock → shows validation error.

Placing order after cutoff → delivery date auto-shifted to +2 days.

Empty catalog → shows fallback message.

Future Improvements

Role-based dashboards (Customer / TSU / SR / Ops).

Pagination + infinite scroll for large catalogs.

Better error reporting (Sentry integration).

Convert to TypeScript for stricter contracts.

CI pipeline with lint + test enforcement.

Code Quality

Linting: ESLint (npm run lint) enforces React best practices.

Formatting: Prettier (npm run format) ensures consistent code style.

Configs are included in frontend/.eslintrc.cjs and frontend/.prettierrc.

Time Log (Detailed)
Task	                                                        Hours
Backend setup (json-server, server.js routes)	                2.0
Frontend environment (Vite, Tailwind, ESLint, Prettier)	        1.5
Product Catalog (grid, virtualization, ProductCard)	            2.0
SlotSelector + cutoff date logic	                            1.0
Orders slice + Place/Cancel flows	                            1.5
Cancel order restoring stock (frontend + server.js)	            1.0
Ops Panel (bulk stock update UI + thunk)	                    1.5
Axios API client with interceptors	                            0.5
ErrorBoundary, lazy routes, Suspense	                        0.5
Unit tests (utils, slices)	                                    1.5
Integration tests (Catalog)	                                    1.0
Debugging test state injection / async issues	                1.0
README + Documentation	                                        0.5

                                                        Total ≈ 15.0h