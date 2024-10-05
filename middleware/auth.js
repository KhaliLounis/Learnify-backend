const jwt = require("jsonwebtoken");
const verifyAuth = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer")) {
    res.status(401).json({ message: "Authentication invalid" });
  }
  const token = bearer.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication invalid" });
  }
};
module.exports = verifyAuth;
