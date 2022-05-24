const User = require("../model/user");

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: "ERROR" });
  }
};
exports.createNewUser = async (req, res) => {
  try {
    const { name, age } = req.body;

    const user = new User(name, age);
    await user.create();
    res.status(200).json({ message: "Create new user successfully" });
  } catch (e) {
    res.status(400).json({ err: "ERROR" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.deleteUser(id);
    res.status(200).json({ message: "Delete user successfully" });
  } catch (e) {
    res.status(400).json({ err: "ERROR" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await User.getUserById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: "ERROR" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, age, id } = req.body;
    console.log(req.body);
    const user = new User(name, age);
    await user.updateUser(id);
    res.status(200).json({ message: "Update user success" });
  } catch (e) {
    res.status(400).json({ err: "ERROR" });
  }
};
