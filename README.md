#  Event Management System Using Next .Js
<p align="center">
  <img src="https://github.com/user-attachments/assets/0c024a8a-e66d-41b8-8dc2-ab034ce21b58" height="300"  />
</p>


## 🌟 Overview
The **Event Management System** is a full-stack web application built with **Next.js** and **TypeScript**, enabling users to create, discover, and manage events. The system includes **ticket booking** with **Stripe integration**, **QR code-based ticket validation**, **interactive maps** for event locations, and an **admin dashboard** for event organizers and  dark/light theme toggle.

🔗 **Live Demo:** [Click Here](https://eventglobe.vercel.app/)  

## 🚀 Features
✅ **User Authentication** - Powered by **Clerk** for secure login & registration.  
🔎 **Event Listing & Search** - Find events by category & location.  
🎟 **Event Creation & Ticketing** - Organizers can create events, set ticket categories & prices.  
💳 **Stripe Integration** - Secure payment processing for paid ticket purchases.  
🎟️ **Free Event Registration** - Simple registration flow for free events without payment.  
📸 **Image Upload** - Uses **Uploadcare** for event images.  
📍 **Interactive Maps** - **React Leaflet** for event location mapping.  
📊 **Analytics & Insights** - Event statistics powered by **Recharts**.  
🛠 **Admin Dashboard** - Manage events, users, and transactions.  
🔐 **QR Code Tickets** - Generated using **qrcode.react** for ticket validation at entry.  
🌗 **Dark/Light Theme Toggle** - Implemented using **next-themes**.  
🔔 **Toast Notifications** - Powered by **Sonner** for real-time feedback.  
✅ **Validation** - **Zod** ensures form data integrity and validation.  
🎨 **Beautiful UI** - Styled with **Tailwind CSS**, **shadcn**, **Lucide Icons** & **React Icons**.

## 🛠 Tech Stack
| Tech | Description |
|------|------------|
| **Next.js** | React framework for SSR & SSG |
| **TypeScript** | Strongly typed JavaScript |
| **Tailwind CSS** | Modern utility-first CSS framework |
| **ShadCN** | Elegant UI components |
| **React Leaflet** | Interactive maps for event locations |
| **Recharts** | Data visualization & analytics |
| **Stripe** | Payment processing integration |
| **Clerk** | Authentication & user management |
| **Prisma** | ORM for database management |
| **Neon DB** | PostgreSQL cloud database |
| **Uploadcare** | Image upload & storage |
| **qrcode.react** | QR code generation for ticket validation |
| **Zod** | Schema validation for forms |
| **next-themes** | Dark/Light mode toggle |
| **Sonner** | Toast notifications |



## 🏗 Installation

### 📌 Prerequisites
- 📌 **Node.js** (>= 16.x)
- 📌 **PostgreSQL (Neon DB recommended)**
- 📌 **Stripe Account** for payment processing
- 📌 **Clerk Account** for authentication
- 📌 **Uploadcare Account** for image uploads

### 🔧 Steps to Run Locally
```sh
# Clone the repository
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system

# Install dependencies
npm install  # or yarn install

# Set up environment variables
cp .env.example .env
# Add your credentials for Clerk, Stripe, Neon DB, Uploadcare, etc.

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev  # or yarn dev
```

## 🔑 Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=your-neon-db-url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
UPLOADCARE_PUBLIC_KEY=your-uploadcare-public-key
NEXT_PUBLIC_MAP_API_KEY=your-map-api-key
NEXT_PUBLIC_DEPLOYED_URL=https://your-deployed-url.com
```
## 🎭 Usage

### 👥 Users:
- Sign up and log in securely via **Clerk**.
- Browse upcoming events based on category, location, or keywords.
- Book tickets for **paid events** via **Stripe** payment integration.
- Register directly for **free events** (no payment needed).
- View booking details including **QR code tickets** for event entry.

### 🎤 Organizers:
- Create and manage your own events.
- Set multiple **ticket categories** (e.g., Early Bird, VIP, Regular) and define pricing.
- Upload event images using **Uploadcare**.
- Set event locations using an **interactive map** (**React Leaflet**).
- Validate attendee entries by scanning **QR codes** at the event.
- View ticket sales, registrations, and event performance analytics via **Recharts**.

### 🛠 Admins:
- Access the **Admin Dashboard** to monitor:
  - Events created
  - User registrations
  - Ticket transactions
- Manage and moderate event listings if required.
- Access complete analytics and system insights.


## 🌍 Deployment
The application is deployed and accessible online at:  
🔗 **Live Demo:** [Click Here](https://eventglobe.vercel.app/)  




## 📧 Contact
For inquiries, reach out to 📩 `aryalrajan078@gmail.com` or open an **issue** in the repository.

---
🚀 **Enjoy managing and attending events seamlessly with our platform!** 🎉

