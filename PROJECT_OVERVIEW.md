# InsightHub Project Documentation

Welcome to **InsightHub**! This documentation is designed to help you understand the project structure, what each page does, and how the key components work. If you are new to the project, start here to get a clear picture of the application.

## 1. Project Overview

**InsightHub** is an AI-enhanced analytics dashboard designed for data-forward teams. It allows users to:
-   Visualize data through interactive charts and widgets.
-   Upload raw data files (CSV/Excel).
-   Generate AI-powered insights from their data.
-   Manage reports and user profiles.

**Tech Stack:**
-   **Framework:** Next.js (App Router)
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Charts:** Recharts
-   **Database:** PostgreSQL + Prisma
-   **Authentication:** NextAuth.js

---

## 2. Project Structure

The project follows the standard Next.js App Router structure:

-   `src/app`: Contains all the routes (pages) of the application.
    -   `(auth)`: Route group for authentication pages (Login, Register).
    -   `(dashboard)`: Route group for the main application pages (Dashboard, Insights, etc.).
-   `src/components`: Contains reusable UI components and feature-specific components.
    -   `dashboard`, `insights`, `reports`, `upload`: Components specific to these features.
    -   `ui`: Generic, reusable UI elements (Buttons, Cards, Inputs).
-   `src/lib`: Utility functions and configurations (Prisma client, Auth config).

---

## 3. Page Guide

Here is a detailed breakdown of each page in the application:

### Authentication Pages (`src/app/(auth)`)

#### 1. Login Page (`/auth/login`)
-   **Purpose:** Allows existing users to sign in to the application.
-   **Key Features:**
    -   Secure login form.
    -   Visual highlights of the platform's value (RBAC, Drag-and-drop, AI insights).
-   **Component:** `src/app/(auth)/auth/login/page.js`

#### 2. Register Page (`/auth/register`)
-   **Purpose:** Allows new users to create an account.
-   **Key Features:**
    -   Registration form.
    -   Overview of the tech stack (Server Actions, Framer Motion, etc.).
-   **Component:** `src/app/(auth)/auth/register/page.js`

### Dashboard Pages (`src/app/(dashboard)`)

These pages share a common layout that includes the **Sidebar** navigation.

#### 3. Dashboard (`/dashboard`)
-   **Purpose:** The main landing page after login. It provides a high-level overview of analytics.
-   **Key Features:**
    -   **Customizable Widgets:** Drag-and-drop widgets for metrics like "Active Users", "Traffic", etc.
    -   **Analytics Charts:** Line, Bar, and Pie charts visualizing data trends.
    -   **Activity Feed:** A real-time log of user actions.
    -   **Recent Uploads:** A summary of recently uploaded files.
-   **Component:** `src/app/(dashboard)/dashboard/page.js` (renders `DashboardClient`)

#### 4. AI Insights (`/insights`)
-   **Purpose:** Generates and displays AI-driven insights from user datasets.
-   **Key Features:**
    -   Shows a history of generated insights.
    -   Allows users to generate new insights (functionality likely in `InsightsClient`).
-   **Component:** `src/app/(dashboard)/insights/page.js`

#### 5. Data Upload (`/upload`)
-   **Purpose:** The central hub for ingesting data into the platform.
-   **Key Features:**
    -   Lists previous uploads.
    -   Interface for uploading new CSV or Excel files.
-   **Component:** `src/app/(dashboard)/upload/page.js`

#### 6. Reports (`/reports`)
-   **Purpose:** Displays detailed reports.
-   **Key Features:**
    -   Multi-format reports with export capabilities.
    -   Pagination for browsing large sets of report data.
-   **Component:** `src/app/(dashboard)/reports/page.js`

#### 7. Profile (`/profile`)
-   **Purpose:** User account management.
-   **Key Features:**
    -   **Profile Details:** View and edit name/email.
    -   **Security:** Update password and manage MFA settings.
-   **Component:** `src/app/(dashboard)/profile/page.js`

#### 8. Settings (`/settings`)
-   **Purpose:** General application settings.
-   **Key Features:**
    -   Configuration options for the workspace (currently a placeholder).
-   **Component:** `src/app/(dashboard)/settings/page.js`

---

## 4. Key Components

Understanding these components will help you navigate the code:

-   **Sidebar (`src/components/dashboard/sidebar.js`)**:
    -   The main navigation menu on the left.
    -   It is collapsible and responsive (hides on mobile, toggles on desktop).
    -   Contains links to all major pages defined in `navItems`.

-   **DashboardClient (`src/components/dashboard/dashboard-client.js`)**:
    -   A "Client Component" that handles the interactive parts of the dashboard.
    -   Manages the state of widgets (adding, removing, reordering).
    -   Renders the charts and activity feed.

-   **UI Components (`src/components/ui`)**:
    -   A collection of reusable, atomic components like `Button`, `Card`, `Input`, `Badge`.
    -   These are used throughout the app to ensure design consistency.

---

## 5. How to Navigate as a Developer

1.  **To change the menu:** Edit `src/components/dashboard/sidebar.js`.
2.  **To add a new widget:** Look at `DashboardClient` in `src/components/dashboard/dashboard-client.js`.
3.  **To modify charts:** Check `src/components/dashboard/charts.js` (imported in DashboardClient).
4.  **To style components:** Most styling is done via Tailwind CSS classes directly in the JSX.

---

This guide should cover the basics to get you started. Happy coding!
