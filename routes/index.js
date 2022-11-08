const router = require("express").Router();
const userRouter = require("./users");
const routineRouter = require("./routines");

router.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

router.use("/users", userRouter);
router.use("/routines", routineRouter);

module.exports = router;
