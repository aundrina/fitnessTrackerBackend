const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = require("express").Router();
const { getUserByUsername, createUser } = require("../db/adapters/users");
const { getPublicRoutinesByUser } = require("../db/adapters/routines");
const { JWT_SECRET } = process.env;
const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;

userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists, please try again",
      });
    } else if (password.length < 8) {
      console.log("password error");
      next({
        name: "PasswordError",
        message: "Password must be 8 characters or more, please try again",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await createUser({ username, password: hashedPassword });

      delete user.password;

      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      console.log(user);
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      next({
        name: "UserError",
        message: "Invalid credentials, please try again",
      });
    } else if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;
      console.log(user);
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;

  try {
    const publicRoutines = await getPublicRoutinesByUser(username);
    res.send({ publicRoutines });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
