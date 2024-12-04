import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authToken = req.get("Authorization");
  let decodedAuthToken;
  try {
    decodedAuthToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.emailFromAuthToken = decodedAuthToken.email;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid credentials" });
  }
  console.log("The decodedAuthToken is: ", decodedAuthToken);
};

export { verifyToken };