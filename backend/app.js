require('dotenv').config({ override: true });


const express = require("express");
const cors = require('cors');
const bookRoute = require("./routes/bookRoute");

const app = express();

app.use(cors({
    origin : "https://buk-shelf-crud.vercel.app"
}));
app.use(express.json());

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const SECRET_TOKEN = process.env.SECRET_TOKEN;


// Login routes
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username == USERNAME && password == PASSWORD) {
        // console.log("Login success :", username);
        return res.json({ success: true, token: SECRET_TOKEN });
    } else {
        
        return res.status(401).json({ success: false, message: "Invalid Username or Password" });
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
  console.log(`Server started at port ${PORT}`);
});
