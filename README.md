# Desktop Support Ticketing System

A full-stack CRUD application for managing desktop support service tickets, built with Node.js, Express, MongoDB, and React.js. The project implements user authentication, ticket management, and DevOps best practices including CI/CD and version control.
---

## Custom File Explanations

Below are detailed explanations of the main files I've created, their contents, purpose, and how they relate to each other:

### **frontend/src/pages/Tickets.jsx**
- **What it is:** A React page component for creating new tickets.
- **What it contains:** Imports and renders the `TicketCreationForm` component. Manages the state for editing tickets (though currently only used for creation).
- **What it does:** Displays a form for users to submit new support tickets.
- **Relationships:** Uses `TicketCreationForm` from `components/`. Could be extended to support editing tickets.

### **frontend/src/pages/MyTickets.jsx**
- **What it is:** A React page component for displaying the current user's tickets.
- **What it contains:** Fetches tickets for the logged-in user from the backend using their JWT token. Handles ticket status changes.
- **What it does:** Shows a list of tickets created by the user and allows status updates.
- **Relationships:** Uses the `TicketList` component to display tickets. Relies on authentication context (`useAuth`).

### **frontend/src/pages/SearchResults.jsx**
- **What it is:** A React page for searching and filtering all tickets.
- **What it contains:** Fetches all tickets, provides a search bar, and allows users to toggle which columns are visible in the results table.
- **What it does:** Lets users search tickets by various fields and customize the table view.
- **Relationships:** Uses `axiosInstance` for API calls and `useAuth` for authentication.

### **frontend/src/components/TicketList.jsx**
- **What it is:** A reusable React component for displaying a list of tickets.
- **What it contains:** Renders ticket details, status dropdown, countdown timers for SLA, and a delete button.
- **What it does:** Displays tickets in a styled list, allows status changes and deletion, and shows SLA countdowns.
- **Relationships:** Used by `MyTickets.jsx` to render the user's tickets. Calls backend endpoints for status updates and deletion.

### **frontend/src/components/TicketCreationForm.jsx**
- **What it is:** A React component for the ticket creation form.
- **What it contains:** Form fields for title, description, priority, category, and assignment. Handles form submission and API call to create a ticket.
- **What it does:** Allows users to submit new support tickets to the backend.
- **Relationships:** Used by `Tickets.jsx` to provide the ticket creation UI.

### **frontend/src/components/TaskList.jsx**
- **What it is:** A React component for listing tickets with edit and delete options.
- **What it contains:** Renders each ticket with details and buttons for editing or deleting.
- **What it does:** Lets users edit or delete tickets from a list.
- **Relationships:** Similar to `TicketList`, but with an edit button. Used where ticket editing is needed.

### **frontend/src/components/MyTicketPage.jsx**
- **What it is:** A wrapper component for displaying the user's tickets.
- **What it contains:** Fetches tickets for the logged-in user and passes them to the `MyTickets` component.
- **What it does:** Handles loading and error states for fetching tickets.
- **Relationships:** Uses `MyTickets` (which in turn uses `TicketList`). Relies on authentication.

### **backend/routes/tickets.js**
- **What it is:** Express router for ticket-related API endpoints.
- **What it contains:** Endpoints for getting, creating, updating status, and deleting tickets. Implements SLA logic for response and resolution times.
- **What it does:** Handles all ticket CRUD operations and enforces authentication and authorization.
- **Relationships:** Uses the `Ticket` model and `protect` middleware. Called by frontend components via API.

### **backend/models/Ticket.js**
- **What it is:** Mongoose schema/model for tickets.
- **What it contains:** Defines the structure of a ticket document, including fields for title, description, priority, category, assignment, status, SLA deadlines, and creator.
- **What it does:** Represents tickets in the MongoDB database.
- **Relationships:** Used by ticket routes and controllers to interact with the database.

### **backend/controllers/ticketController.js**
- **What it is:** Controller functions for ticket API endpoints.
- **What it contains:** Functions to get, create, update, and delete tickets, with authorization checks.
- **What it does:** Implements the business logic for ticket operations.
- **Relationships:** Used by the ticket routes to handle requests and interact with the `Ticket` model.

---

### **Relationships Overview**

- **Frontend pages** (`Tickets.jsx`, `MyTickets.jsx`, `SearchResults.jsx`) use **components** (`TicketCreationForm.jsx`, `TicketList.jsx`, `TaskList.jsx`) to display and manage tickets.
- **Components** make API calls to the **backend** (`tickets.js` routes), which use **controllers** (`ticketController.js`) and **models** (`Ticket.js`) to interact with the database.
- **Authentication** is enforced throughout using context/hooks on the frontend and middleware on

---

**Live Frontend:** [http://13.210.197.85:3000]

---

## Public IP

```bash
PublicIP: 13.210.197.85 - if instance is turned off, restart it and change publicIP 
```

---

## User Credentials

- **Username:** `n9359842@qut.edu.au`
- **Password:** `snoopyboy1996`

---

## Features

- User registration, login, and profile management (JWT-based authentication)
- Create, read, update, and delete (CRUD) service tickets
- Ticket priorities, categories, assignment, and status tracking
- SLA countdown timers for response and resolution
- Search and filter tickets
- Responsive, user-friendly UI (React + Tailwind + Bootstrap)
- Role-based access (future enhancement)
- CI/CD pipeline with GitHub Actions
- Deployed on AWS EC2

---

##  Project Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm
- MongoDB Atlas account (or local MongoDB) [this is already connected to the project Cluster0 so no need to edit or update .env file]
- AWS EC2 instance (for deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/n9359842tria/DesktopSupportTicketingSystem.git
cd sdlapps
```

### 2. Update axiosConfig.jsx to work locally

```bash
  //baseURL: 'http://localhost:5001', // local ##uncomment this section
  baseURL: 'http://13.210.197.85:5001', // live ##comment this
```

### 3. Run the project

```bash
npm start
```
The frontend will run on [http://localhost:3000]

---

## 📊 JIRA Board

- **JIRA Board URL:** [https://seantria.atlassian.net/jira/software/projects/DSTS/boards/34atlOrigin=eyJpIjoiM2I4NThlMDg3MDI4NDRjYThhNTM4NjNmODI3OThkYTQiLCJwIjoiaiJ9]


## 🏗️ CI/CD Pipeline
---

- Automated with GitHub Actions [.github/workflows/ci.yml]

---

## 📚 Documentation

- **Requirement, Block Definition, and Parametric Diagrams:** Provided in the project report
- **Screenshots:** Provided in the project report
