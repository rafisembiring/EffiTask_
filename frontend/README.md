# Project Management App

A collaborative project management tool built with **Next.js** and **Firebase**, featuring:

- 🔐 Google Login
- 📁 File Upload (Firebase Storage)
- 📅 Project Deadline with Google Calendar sync
- ✅ Project Status (Completed / In Progress)
- 🧑‍🤝‍🧑 Sharing with other users
- ✏️ Edit name, deadline, description
- 🌙 Dark mode and responsive design
- 🔔 Toast notifications

## 🔧 Tech Stack

- Next.js
- Firebase (Auth, Firestore, Storage)
- TailwindCSS
- React Hot Toast
- Google Calendar API

## 🚀 Getting Started

### 1. Clone repo
```bash
git clone https://github.com/your-repo/project-management-app
cd project-management-app/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Firebase
Create a project in Firebase Console. Enable Firestore, Auth (Google), Storage. Then create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
```

### 4. Run the app
```bash
npm run dev
```

### 5. Deploy
Use [Vercel](https://vercel.com/) to deploy.

## 📁 Folder Structure

- `frontend/`: Next.js frontend
  - `pages/`: App pages
  - `lib/`: Firebase helpers and integrations
- `backend/`: Firebase Firestore rules

## 🔐 Firestore Rules
Defined in `backend/firestore.rules`.

## ✅ Features

All major project management features including calendar integration, upload, collaboration, and real-time status update.
