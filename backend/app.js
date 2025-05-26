require('dotenv').config({ override: true });
// console.log("USERNAME from env:", process.env.USERNAME);
// console.log("PASSWORD from env:", process.env.PASSWORD);
// console.log("SECRET_TOKEN from env:", process.env.SECRET_TOKEN);


const express = require("express");
const cors = require('cors');
const bookRoute = require("./routes/bookRoute");

const app = express();

app.use(cors({
    origin : "https://buk-shelf-crud.vercel.app"
}));
app.use(express.json());

// env
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

console.log("Loaded environment variables:");
console.log("USERNAME:", USERNAME);
console.log("PASSWORD:", PASSWORD);
console.log("SECRET_TOKEN:", SECRET_TOKEN);

// Login routes
app.post('/login', (req, res) => {
    console.log("Login attempt received:");
    console.log("Request body:", req.body);

    const { username, password } = req.body;

    if (username == USERNAME && password == PASSWORD) {
        console.log("Login success for user:", username);
        return res.json({ success: true, token: SECRET_TOKEN });
    } else {
        console.log("Login failed. Invalid credentials:", { username, password });
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// routes protection here
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token === SECRET_TOKEN) {
        next();
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};


app.use('/books', authMiddleware, bookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
