import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.redirect("/login");
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.redirect("/login");
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;
