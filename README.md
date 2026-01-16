 Shopnasi - Premium Tech E-Commerce

Shopnasi is a modern, high-performance e-commerce application built for selling premium consumer electronics. It features a sleek, responsive design, a dynamic product catalog, and a seamless user experience.

![Shopnasi Banner](/client/public/categories/headphones.png) 
(Note: Replace with actual banner if available, using category image for now as placeholder)

 🚀 Features

-   Premium UI/UX: Custom-designed interface with glassmorphism effects, smooth transitions, and a "Dark/Premium" aesthetic.
-   Dynamic Product Catalog: Browse products with advanced filtering (by Category, Sub-category, Brand, Price Range).
-   Smart Search: Real-time search functionality finding products by name, SKU, or description.
-   Product Details: Rich product pages with high-res images, technical specifications, and related product recommendations.
-   Shopping Experience:
    -   Add to Cart & Wishlist functionality.
    -   Stock management simulation.
    -   Streamlined Checkout flow.
-   Order Management: Track past orders (User specific).
-   API Integration: Fully integrated internal API for products and orders using Next.js API Routes.

 🛠️ Tech Stack

-   Frontend: [Next.js](https://nextjs.org/) (React Framework)
-   Styling: Vanilla CSS (Global Styles + CSS Modules) for maximum customizability.
-   Database: SQLite (Local development / Demo persistence).
-   Backend: Next.js API Routes (Serverless functions).
-   State Management: React Context API (`StoreContext`).

 📂 Project Structure

The project recently underwent a migration to support serverless deployment (Vercel).

-   `/client`: (Main) Contains the Next.js application, including frontend pages and the API backend (`/pages/api`).
-   `/server`: (Legacy) The original Express.js backend. Retained for reference or standalone server use, but the active logic is now in `client`.

 ⚡ Getting Started

 Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shopnasi.git
    cd shopnasi
    ```

2.  Navigate to the client directory:
    The main application lives in the `client` folder.
    ```bash
    cd client
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open the app:
    Visit `http://localhost:3000` in your browser.

 🚀 Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Log in to Vercel and "Add New Project".
3.  Important: When asked for the Root Directory, select `client` (edit the root directory setting).
       Framework Preset: Next.js (Auto-detected)
4.  Click Deploy.

> Note on Database: This demo uses SQLite (`shopnasi.db`). On serverless platforms like Vercel, the local file system is ephemeral. This means changes to the database (new orders) will not persist between deployments or server restarts. For a production environment, simply swap the SQLite connection in `client/lib/db.js` with a cloud database provider like Vercel Postgres, Supabase, or MySQL.

 🛡️ License

This project is licensed under the MIT License.
