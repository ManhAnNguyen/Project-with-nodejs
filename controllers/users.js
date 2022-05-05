import { v4 as uuidv4 } from "uuid";

let users = [];

export const getAllUsers = (req, res) => {
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  const userId = uuidv4();
  users.push({ ...user, id: uuidv4() });
  res.send(`User with the username ${user.firstname} added to the database`);
};

export const getDetailUser = (req, res) => {
  const foundUser = users.find((user) => user.id === req.params.id);
  if (!foundUser) {
    res.send("Not Found");
    return;
  }
  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    res.send("Not Found");
    return;
  }
  users = users.filter((user) => user.id !== id);
  res.send("Delete user success");
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    res.send("Not Found");
    return;
  }
  const { firstname, lastname, age } = req.body;

  if (firstname) {
    foundUser.firstname = firstname;
  }
  if (lastname) {
    foundUser.lastname = lastname;
  }
  if (age) {
    foundUser.age = age;
  }
  res.send("update success");
  //   users = users.map();
};
