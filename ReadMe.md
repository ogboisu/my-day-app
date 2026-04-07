🗓️ MyDay App

A full-stack productivity application that helps users **organize their daily tasks, stay focused, and boost productivity**.
Built with a modern tech stack using **Node.js, Express, MongoDB, and a frontend client**.

Features

* User Authentication (Register & Login)
* Create, Read, Update, Delete (CRUD) Tasks
* Organize daily activities efficiently
* Filter and manage tasks
* RESTful API architecture
* Persistent data storage with MongoDB

 Tech Stack

1. Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcrypt (for password hashing)

2. Frontend

* React / HTML-CSS-JavaScript *(depending on your setup)*

3. Tools

* MongoDB Compass
* Postman (API testing)
* Nodemon

Project Structure

myday-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md

Installation & Setup

1. Clone the repository

git clone https://github.com/your-username/myday-app.git
cd myday-app

2. Setup Backend

cd backend
npm install

Create a `.env` file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mydayapp
JWT_SECRET=your_secret_key

Start the backend server:

npm run dev

3. Setup Frontend

cd frontend
npm install
npm start

OR (if using Vite):

npm run dev

API Endpoints

Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

Task Routes

* `GET /api/tasks` → Get all tasks
* `POST /api/tasks` → Create task
* `PUT /api/tasks/:id` → Update task
* `DELETE /api/tasks/:id` → Delete task

Database

* MongoDB (Local or Atlas)
* View data using **MongoDB Compass**
* Default DB name: `mydayapp`

Future Improvements

* Mobile version (React Native)
* Notifications & reminders
* Task analytics dashboard
* Dark mode UI
* Deployment (Render, Vercel, MongoDB Atlas)

🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

📜 License

This project is open-source and available under the **MIT License**.

Author

**Emmanuel Isu**

* Full-Stack Developer
* Passionate about building productivity tools

Acknowledgements

MongoDB Documentation
Express.js Community
Open-source contributors

💡 Inspiration
Built to help individuals take control of their day, eliminate distractions, and stay productive.

> “Plan your day, own your life.” 🚀
