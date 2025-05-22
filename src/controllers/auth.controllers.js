import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ text: "Incorrect username" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ text: "Incorrect password" });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


