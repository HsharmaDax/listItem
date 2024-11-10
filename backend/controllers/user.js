require('dotenv').config();
const db = require('../models/index');
const { User } = db;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyPassword = async (password, userPassword) => {
    if (password === userPassword) {
        return true;
    } else {
        return false;
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Enter all required details" })
    }
    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already registered ' })
        }
        const addedUser = await User.create({ name, email, password })
        if (addedUser) {
            return res.status(200).json({ message: 'User added successfully' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Missing required details" })
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const confirmPassword = await verifyPassword(password, user.password)
        if (confirmPassword) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
            return res.status(200).json({
                message: 'Login Success',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token: token
            })
        } else {
            return res.status(401).json({ message: 'Incorrect email or password' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { login, register }