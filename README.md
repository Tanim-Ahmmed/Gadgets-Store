# 🛒 Gadget Store (Next.js App Router)

A modern, responsive **Gadget Store web application** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

This project demonstrates a polished frontend architecture with authentication, protected routes, and local data management.

---

## 🚀 Live Demo
> Add your Vercel link here

---

## 📌 Project Overview

This application allows users to:
- Browse gadgets
- Search and filter products
- View product details
- Manage wishlist and cart (no login required)

The focus is on **clean UI, responsiveness, and frontend engineering**.

---

## ✨ Features

### 🔓 Public Features
- Landing page with 7 sections
- Items page with search & filtering
- Item details page
- Responsive layout (mobile/tablet/desktop)

---

### 🔐 Authentication (Firebase)
- Email & Password login/register
- User state with Context API
- Redirect after login
- Protected routes

---

### 🛍️ Item Management (Protected)
- Add new item
- Manage items (view/delete)
- Uses localStorage + JSON data

---

### ❤️ Wishlist (Guest)
- Add/remove items
- Stored in localStorage

---

### 🛒 Cart (Guest)
- Add to cart
- Increase/decrease quantity
- Remove items
- Stored in localStorage

---

### 📂 Saved Page (`/saved`)
- Combined Wishlist + Cart page
- Manage items easily
- Navigate to item details

---

### 🎨 UI/UX
- Dark theme (#080616)
- Lato font
- Clean spacing & layout
- Hover & focus effects
- Smooth animations (Framer Motion, GSAP)
- Smooth scroll (Lenis)
- Skeleton loading states

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Firebase Authentication**
- **React Context API**
- **localStorage + JSON**
- **Framer Motion**
- **GSAP**
- **Lenis**

---


---

## 🔄 Routes

| Route | Description |
|------|------------|
| `/` | Landing page |
| `/items` | All gadgets |
| `/items/[id]` | Item details |
| `/items/add` | Add item (protected) |
| `/items/manage` | Manage items (protected) |
| `/saved` | Wishlist + Cart |
| `/about` | About |
| `/login` | Login |
| `/register` | Register |

---

## ⚙️ Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Tanim-Ahmmed/Gadgets-Store
cd gadget-store
### 2️⃣ Install Dependencies
pnpm install
# or
npm install
# or
yarn install

### 3️⃣ Setup Environment Variables
touch .env.local

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

### 4️⃣ Run Development Server
pnpm dev
# or
npm run dev

### 5️⃣ Build & Start Production

pnpm build
pnpm start