# Sigma Café API (Mission 11 starter)

A small Express API for a café menu. Most of it is already written.
In class you will build the missing endpoints with GitHub Copilot.

## Run it

```
npm install
npm start
```

The server runs on http://localhost:3000

## Endpoints

| Method | Route | Status |
|---|---|---|
| GET | /menu | Done |
| GET | /menu/:id | Done |
| POST | /menu | TODO — build with Copilot |
| PUT | /menu/:id | TODO — build with Copilot |
| DELETE | /menu/:id | Done |

## A menu item looks like this

```json
{ "id": 1, "name": "Flat White", "price": 6.5, "available": true }
```

The menu is stored in memory, so it resets every time you restart the server.
