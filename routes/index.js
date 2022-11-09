const router = require("express").Router();
const userRouter = require("./users");
const routineRouter = require("./routines");
const activitiesRouter = require("./activities");
const raRouter = require("./routine_activities");

router.get("/health", (req, res, next) => {
  res.send("All healthy and ready to go!");
});

router.use("/users", userRouter);
router.use("/routines", routineRouter);
router.use("/activities", activitiesRouter);
router.use("/routine_activities", raRouter);

module.exports = router;
