# Role-Based Booking Application

A full-stack booking platform built with **React**, **TailwindCSS**, and **Supabase**.  
This app provides role-based access for **Users** (who can browse and book services) and **Providers** (who can manage services, availability, and bookings).

---

## 🚀 Features

### 🔑 Authentication & Roles

- Secure login with **BetterAuth** (email/password).
- Role-based access:
  - **Users** → Browse & book services.
  - **Providers** → Manage services, availability, and bookings.

### 👤 User Features

- **Service Browsing & Discovery**
  - Search and infinite scroll for service listings.
  - View details (name, description, duration, price).
- **Date & Time Picker**
  - Calendar-based booking with real-time availability.
  - Prevents double booking.
- **Booking Management**
  - Confirm bookings with a summary screen.
  - View or cancel existing bookings.

### 🛠 Provider Features

- **Service Management**
  - Add, update, or delete services.
- **Availability Management**
  - Define available slots, adjust or block times.
- **Booking Oversight**
  - Dashboard with upcoming/past bookings.
  - Handle cancellations.

---

## 🏗 Tech Stack

### Frontend

- **Nextjs** (React Framework)
- **TailwindCSS** (responsive UI)
- Key components:
  - Service List (infinite scroll)
  - Service Details Page
  - User Dashboard
  - Provider Dashboard

### Backend

- **Supabase** (Postgres)
- **BetterAuth** (Authentication)
- **Inngest** (Background Jobs)
- **tRPC** (Type-safe API layer for client–server communication)


---

## 📦 Getting Started

### Prerequisites

- Node.js (>= 16)

### Installation

   ```bash
1. Clone the repo:

   git clone  https://github.com/CasManny/bookeasy.git

   cd bookeasy

2. Install dependencies:
   npm install

3. Set up environment variables (.env):

DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000 



4. Run locally:
   npm run dev
   
   ```