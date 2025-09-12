# multi-tenant-SaaS-Notes-Application-TEST-MODEL-

A multi-tenant SaaS application that allows multiple companies to securely manage their users and notes, while enforcing role-based access and subscription limits.

## Key Features & Benefits

- **Multi-tenancy:** Supports multiple independent tenants (companies) within a single application instance.
- **User Management:** Securely manage users for each tenant.
- **Note Management:** Allows users to create, edit, and delete notes.
- **Role-Based Access Control (RBAC):** Enforces access control based on user roles (e.g., admin, user).
- **Subscription Limits:** Implements limits on features and usage based on subscription plans.
- **Secure Authentication:** Utilizes JWT for secure authentication and authorization.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (Version X or higher)  [https://nodejs.org/](https://nodejs.org/)
- **npm** (Node Package Manager) or **yarn**
- **MongoDB:** A MongoDB database instance.
- **Git:** For version control.

## Technologies

### Languages

- JavaScript
- TypeScript

### Tools & Technologies

- GitHub Actions
- Node.js
- bcrypt
- jsonwebtoken
- mongoose

## Installation & Setup Instructions

Follow these steps to get the application up and running:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yuvank123/multi-tenant-SaaS-Notes-Application-TEST-MODEL-.git
    cd multi-tenant-SaaS-Notes-Application-TEST-MODEL-
    ```

2.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

4.  **Configure Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=5000
    ```

    Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<your_jwt_secret_key>` with a secure secret key for JWT.

5.  **Run the application:**

    ```bash
    npm start  # or yarn start
    ```

    The server will start on the port specified in the `.env` file (default: 5000).

## Project Structure

```
└── backend/
    ├── .env
    └── config/
        ├── db.js
    └── controllers/
        ├── authController.js
        ├── noteController.js
        ├── tenantController.js
    └── middleware/
        ├── auth.js
        ├── roles.js
    └── models/
        ├── Note.js
        ├── Tenant.js
        ├── User.js
    └── node_modules/
        └── .bin/
            ├── bcrypt
            ├── bcrypt.cmd
            ├── bcrypt.ps1
```

## Important Files

### backend/config/db.js

```js
//db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI );

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
```

### backend/controllers/authController.js

```js
// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tenant from '../models/Tenant.js';
import generateToken from "../utils/generateToken.js";

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);
    
    if (!email || !password) {
        console.log('❌ Missing credentials');
        return res.status(400).json({ error: "missing_credentials...
```

### backend/controllers/noteController.js

```js
//controllers/noteController.js
import Note from '../models/Note.js';
import Tenant from '../models/Tenant.js';

const FREE_LIMIT = 3;

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: 'missing_title' });

    const tenantId = req.user.tenantId;
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });

    if (tenant.plan === 'free')...
```

### backend/controllers/tenantController.js

```js
//controllers/tenantController.js
import Tenant from '../models/Tenant.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export const upgradeTenant = async (req, res) => {
    const { slug } = req.params;
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });


    // ensure admin belongs to this tenant
    if (tenant._id.toString() !== req.user.tenantId) return res.status(403).json({ error: 'forbi...
```

### backend/middleware/auth.js

```js
//auth.js
import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'missing_token' });
    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'missing_token' });


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ ...
```

## Usage Examples & API Documentation

*(Example API routes and usage)*

### Authentication

-   **POST /api/auth/login:** Logs in a user and returns a JWT token.

    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```

    Response:

    ```json
    {
        "token": "your_jwt_token"
    }
    ```

### Notes

-   **POST /api/notes:** Creates a new note. (Requires authentication)

    ```json
    {
        "title": "My Note",
        "content": "This is the content of my note."
    }
    ```

    Response:

    ```json
    {
        "message": "Note created successfully"
    }
    ```

## Configuration Options

-   **MONGO_URI:** MongoDB connection string.
-   **JWT_SECRET:** Secret key used to sign JWT tokens.
-   **PORT:** The port the server listens on.
-   **FREE_LIMIT:** The limit of notes for a free plan (Default: 3).

## Contributing Guidelines

We welcome contributions to this project! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License Information

This project is not currently licensed. All rights are reserved.

## Acknowledgments

*   bcryptjs - for password hashing.
*   jsonwebtoken - for JWT token generation and verification.
*   mongoose - for MongoDB object modeling.