# Learnify Backend

Learnify is a learning management system backend designed to manage courses, assignments, and user interactions efficiently. This project utilizes Node.js and Express to build a robust server with MongoDB as the database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication using JWT (JSON Web Tokens).
- Course management (create, update, delete courses).
- Assignment management (create, update, delete assignments).
- Email notifications for assignment reminders.
- File uploads via Cloudinary for assignment submissions.
- Scheduler for sending email reminders using cron jobs.
- Swagger documentation for easy API exploration.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/learnify-backend.git
   cd learnify-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and populate it with the environment variables listed in the [Environment Variables](#environment-variables) section.

## Usage

1. **Start the application**:

   You can start the server using the following command:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

2. **Access the API documentation**:

   The API documentation is available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) when the server is running.

## Environment Variables

Create a `.env` file in the root directory of your project and include the following variables:

```plaintext
MONGO_URI=MONGO_URI
JWT_SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAIL_PASSWORD=your_mail_password
MAIL_USER=your_mail_email
```

Make sure to replace placeholders with your actual configuration values.

## API Documentation

For detailed API endpoints and usage instructions, refer to the online documentation:

[API Documentation](https://learnify-y5o7.onrender.com/api-docs)

## Scripts

- **start**: Starts the application with Nodemon for automatic restarts during development.

  ```bash
  npm start
  ```

## Dependencies

The project uses the following dependencies:

- **bcryptjs**: Password hashing.
- **cloudinary**: Image and file uploads.
- **cookie-parser**: Cookie parsing middleware.
- **cors**: Cross-Origin Resource Sharing middleware.
- **dotenv**: Environment variable management.
- **express**: Web framework for Node.js.
- **express-async-errors**: Middleware to handle async errors.
- **express-fileupload**: Middleware for file uploads.
- **jsonwebtoken**: JSON Web Token implementation.
- **mongoose**: MongoDB object modeling.
- **node-cron**: Scheduling tasks.
- **nodemailer**: Email sending.
- **swagger-jsdoc**: API documentation generation.
- **swagger-ui-express**: Swagger UI for API documentation.

### Dev Dependencies

- **nodemon**: Development tool for automatically restarting the server.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
