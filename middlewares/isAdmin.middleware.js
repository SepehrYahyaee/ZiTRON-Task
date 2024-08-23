export async function isAdmin(req, res, next) {
    try {
        if (req.user.role === "USER") {
            res.status(403).send("Not an Admin!");
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}