const { User } = require("../db/models/");
const { jwtSign } = require("../helpers/jwt");
const { bcryptHash, bcryptCompare } = require("../helpers/bcrypt");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helpers/customError");

// Register
const signUp = async (req, res, next) => {
  try {
    console.log(req.body.user);
    const { username, email, password, biography, profileimg } = req.body.user;
    if (!username) throw new FieldRequiredError(`A username`);
    if (!email) throw new FieldRequiredError(`An email`);
    if (!password) throw new FieldRequiredError(`A password`);

    const userExists = await User.findOne({
      where: { email: req.body.user.email },
    });
    if (userExists) throw new AlreadyTakenError("Email", "try logging in");

    const newUser = await User.create({
      email: email,
      username: username,
      biography: biography,
      profileimg: profileimg,
      password: await bcryptHash(password),
    });

    newUser.dataValues.token = await jwtSign(newUser);

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login
const signIn = async (req, res, next) => {
  try {
    const { user } = req.body;

    const existentUser = await User.findOne({ where: { email: user.email } });
    if (!existentUser) throw new NotFoundError("Email", "sign in first");

    const pwd = await bcryptCompare(user.password, existentUser.password);
    if (!pwd) throw new ValidationError("Wrong email/password combination");

    existentUser.dataValues.token = await jwtSign(user);

    res.json({ user: existentUser });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const username = user.username;
    const userimg = user.profileimg;
    return res.json({ username, userimg });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signUp, signIn, getOne };
