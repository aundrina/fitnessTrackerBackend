const router = require("express").Router();
const userRouter = require("./users");
const routineRouter = require("./routines");
const activitiesRouter = require("./activities");

router.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

router.use("/users", userRouter);
router.use("/routines", routineRouter);
router.use("/activities", activitiesRouter);

module.exports = router;
