# Meetly

Making chat application using socket.io

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## About

Chatly is a simple and efficient messaging platform built with [Socket.io](https://socket.io/) for signaling and real-time communication. It allows users to create or join rooms for seamless messaging.

## Features

- Real-time messaging
- Simple and intuitive UI

## Tech Stack

- **HTML** (Core templates)
- **Tailwind** (Styling)
- **JavaScript** (Frontend and Backend)
- **Node.js**
- **Express.js**
- **MongoDB**
- **Socket.io**

## Installation

Follow the steps below to install and run Meetly on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/sandeshkhadka10/Chat-Application.git
   cd Chat-Application
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create the credentials key**

   ```bash
   MONGO_URL=your_mongodb_url
   TOKEN_KEY=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   SESSION_SECRET=your_session_secret
   ```

3. **Start the server i.e backend and frontend**


# Start Backend
   cd backend
   nodemon index.js

# Start Frontend
  cd frontend
  npm run dev


4. **Open the application**

   Visit [http://localhost:5173](http://localhost:5173) in your web browser.

## Usage

1. Open the application in your browser.
2. Create a new room or join an existing one.
3. Share the room link with friends to start messaging.

## License

This project is licensed under the [MIT License](LICENSE).

---