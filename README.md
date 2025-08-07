# STS Website (Smart Technology Shop)

The STS Website is a modern e-commerce platform designed for a smart technology business. It offers a clean, responsive UI and a seamless experience for both customers and admins.

> 🛠️ Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 📝 About the Project

This website was built for a friend who recently opened a tech store and wanted to grow their online presence. The current version is front-end focused, with Supabase integration planned for the backend. Admins will soon be able to add products and receive order data dynamically.

---

## 🌟 Features

- 🛍 Browse products by **category**, **brand**, or **all**
- 🔍 Real-time **search bar** with filtering
- 🛒 **Shopping cart** system with drawer UI
- 💳 **Checkout** page with order summary modal
- 🔐 **Admin login** and dashboard page (front-end only for now)
- 🌓 **Light/Dark mode** toggle
- 🌍 **Multilingual support** via `LanguageContext`

---

## 🧰 Tech Stack

| Frontend        | Backend (planned)  | Styling        | State Management     |
|-----------------|--------------------|----------------|-----------------------|
| React + Vite    | Supabase (DB/Auth) | Tailwind CSS   | React Context API     |
| TypeScript      |                    | PostCSS        | Custom hooks          |

---

## 📦 Installation

### 1. Clone the Repository

git clone https://github.com/Husseinay23/sts-website.git
cd sts-website

### 2. Install Dependencies

npm install
### 3. Run the Project
bash
Copy
Edit
npm run dev
**Make sure you have Node.js installed.**


## 🧩 Project Structure 

src/
├──── components/ # UI components
├──── contexts/ # Auth, Cart, Language, Theme contexts
├──── pages/ # Main pages (Home, Admin, Product, etc.)
├──── lib/ # Supabase client
├──── App.tsx # Main App component
└──── main.tsx # Entry point


## 🔜 Coming Soon
✅ Dynamic product management via Supabase

✅ Order tracking dashboard for admins

✅ Persistent user sessions & auth logic


## ✨ Author
 **Hussein Ayoub**
📬 husseinay032@gmail.com
