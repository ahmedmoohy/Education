# EduPlatform - Educational Platform

A professional full-stack educational platform built with Next.js, Tailwind CSS, and JWT-based authentication. This project features separate user flows and dashboards for Students, Instructors, Admins, and Super Admins.

## 🗂️ Project Stack

* **Frontend Framework:** Next.js (latest)
* **Styling:** Tailwind CSS (Apple-like clean design)
* **Authentication:** JSON Web Tokens (JWT) with `httpOnly` cookies
* **Role-Based Access Control:** Next.js Middleware for protected routes

## ✨ Features

* **Public Home Page:** Links for student and instructor login/register.
* **Separate User Flows:**
    * **Student Dashboard:** View enrolled courses, download protected materials.
    * **Instructor Dashboard:** Upload notes, manage courses.
    * **Admin Dashboard:** Manage users, handle site content.
    * **Super Admin Dashboard:** Full control over the platform.
* **Authentication & Authorization:**
    * Basic login and registration forms.
    * JWT-based sessions stored in `httpOnly` cookies for security.
    * Route protection using Next.js Middleware.
    * API route protection based on user roles.
* **Reusable Components:** Simple Navbar and Footer.
* **Clean & Modular Code:** Designed for easy understanding and future expansion.
* **Modern UI:** Minimal and clean design inspired by Apple's aesthetic.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/eduplatform.git](https://github.com/your-username/eduplatform.git)
    cd eduplatform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create `.env.local` file:**
    Create a file named `.env.local` in the root of the project and add your JWT secret:
    ```
    JWT_SECRET=YOUR_VERY_STRONG_AND_RANDOM_SECRET_KEY_HERE_MIN_32_CHARS
    ```
    **Important:** Replace `YOUR_VERY_STRONG_AND_RANDOM_SECRET_KEY_HERE_MIN_32_CHARS` with a long, random string. This is crucial for security.

4.  **(Optional) Add SF Pro Display Fonts:**
    For the exact "Apple-like" font, you'd need to legally obtain "SF Pro Display" fonts and place `SF-Pro-Display-Regular.otf`, `SF-Pro-Display-Medium.otf`, `SF-Pro-Display-Bold.otf` inside the `public/fonts/` directory. If you don't have them, the project will gracefully fall back to system sans-serif fonts defined in `tailwind.config.js`.

### Running the Development Server

To run the project in development mode:

```bash
npm run dev
# or
yarn dev
