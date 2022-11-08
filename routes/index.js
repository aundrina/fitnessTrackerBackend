const router = require("express").Router();
const authRouter = require("./auth");

router.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

router.use("/auth", authRouter);

module.exports = router;
