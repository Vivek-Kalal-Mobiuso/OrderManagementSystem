import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization")

        // 401 - Invalid Credential , 403 - Valid Credential but not authorized to access the resource
        if (!token) return res.status(403).send({ message: "Access Denied" })

        token = token.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        req.user = verified;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // Handle token expiration error
            return res.status(401).send({ message: "Session has expired! Please Login again" });
        }

        // For other errors, or if the token is not valid for some other reason, return Access Denied
        return res.status(403).send({ message: "Access Denied" });
    }
}

export default verifyToken