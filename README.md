# Event Registration System API

This is a backend system for managing events and user registrations, built as part of the **CodeAlpha Internship**. It follows the **Model-View-Controller (MVC)** architecture for scalability and maintainability.

## Tech Stack

- **Node.js** & **Express.js** (Backend Framework)
- **PostgreSQL** (Relational Database)
- **Prisma ORM** (Database Management)
- **JavaScript (ES Modules)**

## Features

- **Users:** Register, view details, update profile, and delete account.
- **Events:** Create events, view all events, see event details, and delete events.
- **Registrations:**
  - Users can register for events.
  - **Validation:** Checks if the user exists, if the event exists, and if the event is fully booked.
  - **Duplicate Check:** Prevents a user from registering for the same event twice.
  - Cancel registration.

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SabinaNorbekova/CodeAlpha_EventRegistrationSystem
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Database:**
   - Create a `.env` file in the root directory.
   - Add your connection string:
     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/event_db?schema=public"
     ```

4. **Run Migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Server:**
   ```bash
   npm run start:dev
   ```
   Server will run on `http://localhost:3000`

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details (with registrations)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Events

- `POST /api/events` - Create a new event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registrations

- `POST /api/registration` - Register for an event (Body: `{ "userId": 1, "eventId": 1 }`)
- `GET /api/registration` - View all registrations
- `DELETE /api/registration/:id` - Cancel registration

---

**Author:** Sabina Norbekova
**Internship:** CodeAlpha
