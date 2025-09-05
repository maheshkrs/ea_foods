EA Foods — React Assignment

This project implements the EA Foods pre-ordering system with:

A mock backend using json-server + custom server.js.

A React + Redux Toolkit frontend built with Vite.

The app allows customers, TSUs, and SRs to:

Browse products.

Place next-day pre-orders (cutoff logic at 6 PM).

Cancel orders.

For ops: manage bulk stock updates.

Project Structure
Project/
│── db.json           # Mock database for json-server
│── server.js         # Custom server logic (bulk updates, middleware)
│── package.json      # Backend dependencies + scripts
│── frontend/         # React + Vite frontend app
│   ├── src/...
│   ├── package.json
│── README.md         # (this file)

Getting Started
1. Install dependencies

From root, install backend deps:

npm install


Then install frontend deps:

cd frontend
npm install

2. Start Backend

Run the mock API server:

npm run server


This will:

Serve data from db.json at http://localhost:5000.

Enable server.js custom routes.

3. Start Frontend

In another terminal:

cd frontend
npm run dev


App available at:
 http://localhost:5173

4. Build & Preview Frontend
cd frontend
npm run build
npm run preview

5. Run Tests

Frontend tests are written with Vitest + React Testing Library.

cd frontend
npm run test

Design Notes
Architecture

Backend:

json-server
 for quick CRUD APIs.

Custom server.js adds ops endpoints (/ops/update-stock).

Frontend:

React 19 + Vite for modern DX.

Redux Toolkit for state + async thunks.

TailwindCSS for styling.

Axios (with interceptors) for API client.

React Window for virtualized lists.

Vitest + RTL for tests.

Assumptions

Cutoff time for next-day delivery is 6 PM.

Customers, TSUs (Trade Sales Units), and SRs (Sales Representatives) all use the same UI for placing orders.

Auth is out of scope for this assignment.

Stock updates are handled by ops only (through bulk upload UI).

Trade-offs

json-server chosen for speed and realism. MirageJS could keep everything in-browser but adds bundle weight.

Minimal design system: Tailwind used directly, no MUI/AntD to keep it light.

Optimistic stock update implemented locally; full backend sync still required.


⏱Time Log
Task	                                                     Hours
Backend setup (json-server, server.js custom routes)	      1h
Frontend setup (Vite, Tailwind, Redux Toolkit)	              1h
Catalog page (grid + virtualization)	                      0.5h
Orders flow (place, cancel)	                                  1h
Ops Panel (bulk stock updates)	                              1h
API client with interceptors	                              0.5h
ErrorBoundary, Suspense, lazy routes	                      0.5h
Unit tests (date utils, slices)	                              1h
Integration tests (Catalog loading & render)	              0.5h
Debugging tests/state injection issues	                      1h
Documentation (README)	                                      0.5h

                                                       Total ≈ 8.5h