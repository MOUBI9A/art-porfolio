# 🎬 DirectorOS Setup Guide

Welcome to **DirectorOS**. Follow these steps to connect your Supabase project and get your cinematic portfolio live.

---

## 1. Supabase Project Setup

1. **Create a Project**: Go to [Supabase](https://supabase.com) and create a new project.
2. **Database Schema**:
   - Go to the **SQL Editor** in your Supabase dashboard.
   - Click **New Query**.
   - Copy the contents of [`supabase/schema.sql`](file:///Users/hamzaelmoueddane/Desktop/portfolio/supabase/schema.sql) and paste it into the editor.
   - Click **Run**.
3. **Storage Bucket**:
   - The SQL script should have created a `media` bucket.
   - Go to **Storage** in the dashboard.
   - Ensure a bucket named `media` exists and its **Public** toggle is **ON**.

---

## 2. Authentication

1. Go to **Authentication** → **Users**.
2. Click **Add User** → **Create new user**.
3. Enter your email and a strong password. This will be your login for the `/dashboard`.
4. Ensure **Email Confirmation** is either disabled (for instant setup) or you confirm the email sent by Supabase.

---

## 3. Local Configuration

1. Locate the [`.env.local`](file:///Users/hamzaelmoueddane/Desktop/portfolio/.env.local) file in your project root.
2. Replace the placeholder values with your real Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Found in **Settings** → **API** → **Project URL**.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in **Settings** → **API** → **anon public service_role**.

---

## 4. Run the Application

Open your terminal in the project directory and run:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see your site and `http://localhost:3000/dashboard` to start adding projects.

---

## 🚀 Pro Tips

- **Hero Video**: You can use any YouTube, Vimeo, or Google Drive link in the **Settings** section of your dashboard.
- **Project ordering**: Use the drag-and-drop handles in the **Projects** list to change the order on the public site instantly.
- **Slug Generation**: When creating a project, the URL (slug) is generated automatically from your title, but you can edit it manually before saving.
