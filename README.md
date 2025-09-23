# Role-Based Booking Application

A full-stack booking platform built with **React**, **TailwindCSS**, and **Supabase**.  
This app provides role-based access for **Users** (who can browse and book services) and **Providers** (who can manage services, availability, and bookings).

---

## 🚀 Features

### 🔑 Authentication & Roles

- Secure login with **Supabase Auth** (email/password, OAuth, or magic link).
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
  - Handle cancellations or reschedules.

---

## 🏗 Tech Stack

### Frontend

- **React** (with React Router)
- **TailwindCSS** (responsive UI)
- Key components:
  - Service List (infinite scroll)
  - Service Details Page
  - Calendar/Date Picker
  - Booking Summary Modal
  - User Dashboard
  - Provider Dashboard

### Backend

- **Supabase** (Postgres + Realtime + Auth)
- Database schema:
  - `users` → roles: `user` or `provider`
  - `services` → service details per provider
  - `availability` → service availability slots
  - `bookings` → user bookings with status tracking

---

## 📦 Getting Started

### Prerequisites

- Node.js (>= 16)
- Supabase project & keys

### Installation

   ```bash
1. Clone the repo:

   git clone  https://github.com/CasManny/bookeasy.git

   cd bookeasy

2. Install dependencies:
   npm install

3. Set up environment variables (.env):

   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run locally:
   npm run dev
   
   ```