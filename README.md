#  Event Management System Using Next .Js

## 🌟 Overview
The **Event Management System** is a full-stack web application built with **Next.js** and **TypeScript**, enabling users to create, discover, and manage events. The system includes **ticket booking** with **Stripe integration**, **QR code-based ticket validation**, **interactive maps** for event locations, and an **admin dashboard** for event organizers.

🔗 **Live Demo:** [Click Here](https://eventglobe.vercel.app/)  

## 🚀 Features
✅ **User Authentication** - Powered by **Clerk** for secure login & registration.  
🔎 **Event Listing & Search** - Find events by category & location.  
🎟 **Event Creation & Ticketing** - Organizers can create events, set ticket categories & prices.  
💳 **Stripe Integration** - Secure payment processing for ticket purchases.  
📸 **Image Upload** - Uses **Uploadcare** for event images.  
📍 **Interactive Maps** - **React Leaflet** for event location mapping.  
📊 **Analytics & Insights** - Event statistics powered by **Recharts**.  
🛠 **Admin Dashboard** - Manage events, users, and transactions.  
🔐 **QR Code Tickets** - Generated using **qrcode.react** for validation.  
✅ **Validation** - **Zod** ensures form data integrity.  
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
👥 **Users:** Sign up, browse events, and book tickets.  
🎤 **Organizers:** Create events, set ticket pricing, and validate attendees via QR codes.  
🛠 **Admins:** Monitor events and manage platform settings.

## 🌍 Deployment
The application is deployed and accessible online at:  
🔗 **Live Demo:** [Click Here](https://eventglobe.vercel.app/)  

For deployment, services like **Vercel**, **Railway**, or **Render** are recommended for hosting Next.js apps with Prisma and Neon DB.


## 📧 Contact
For inquiries, reach out to 📩 `aryalrajan078@gmail.com` or open an **issue** in the repository.

---
🚀 **Enjoy managing and attending events seamlessly with our platform!** 🎉

