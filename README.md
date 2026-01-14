Inventory Management System

A Node.js and PostgreSQL application for managing hardware components and categories. This system allows for full inventory tracking, including technical specifications and image management.
Features

    Category Management: Organize items into distinct groups.

    Product Tracking: Manage stock levels, pricing, and detailed technical specs.

    File Uploads: Local image storage for product visuals using Multer.

    Admin Security: Password-protected deletion for items and categories.

    JSONB Integration: Technical specifications stored as flexible JSON objects.
________________________________________________________________________________________________

Technology Stack

    Backend: Node.js, Express.js

    Database: PostgreSQL

    View Engine: EJS (Embedded JavaScript)

    Middleware: Multer (File Handling), Body-Parser

    Styling: CSS3 (Custom Dark Theme)
________________________________________________________________________________________________

Folder Structure

    /controllers - Request handling logic.

    /db - PostgreSQL connection pool and SQL queries.

    /public - Static assets including CSS and uploaded product images.

    /views - EJS templates for the UI.

    app.js - Server configuration and routing.
________________________________________________________________________________________________

Setup Instructions

    Install Dependencies Run npm install to install all necessary packages.

    Environment Configuration Create a .env file in the root directory. You will need to define variables for:

        Your server port

        Your PostgreSQL connection string (Host, User, Password, Database)

        An administrative password for delete actions

    Database Schema Ensure your PostgreSQL database has the following:

        A categories table with id and name.

        An items table with id, name, price, quantity, image_url, category_id, and specs (Type: JSONB).

    Run the Application Run npm start or nodemon app.js to begin the server.
________________________________________________________________________________________________

Administrative Actions

To prevent accidental data loss, the system prompts for a password when attempting to delete a product or category. This password is verified server-side against the value stored in your environment configuration.