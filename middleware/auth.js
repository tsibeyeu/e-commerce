import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // Some frontends send token in 'token' header, others in 'authorization'
  const token = req.headers.token || req.headers.authorization;

  // FIX: Check if token is missing OR is the string "null"/"undefined"
  if (!token || token === "null" || token === "undefined") {
    return res.json({
      success: false,
      message: "Not Authorized. Please Login Again",
    });
  }

  try {
    // If your frontend uses 'Bearer <token>', uncomment the line below:
    // const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request so controllers can use it
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);

    // Return a clean error instead of letting the server loop the crash
    res.json({ success: false, message: "Session expired or invalid token." });
  }
};

export default authUser;
