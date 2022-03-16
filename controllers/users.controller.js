import { v4 as uuid } from "uuid";
import fs, { promises as fsPromises } from "fs";
import path from "path";

// getting __dirname value - we cannot get in the usual way cause we are using ES6 modules
const __dirname = path
  .join(path.dirname(decodeURI(new URL(import.meta.url).pathname)))
  .replace(/^\\([A-Z]:\\)/, "$1");

let users = "";

const rawData = fs.readFileSync(path.join(__dirname, "..", "users.json"));
users = JSON.parse(rawData);
console.log(users);

const getUsers = (req, resp) => {
  resp.status(200).json(users);
};

const getUserById = (req, resp) => {
  const matchedUser = users.find((user) => user.id === req.params.id);

  if (!matchedUser) {
    resp.status(400).json({ message: "User not found" });
    return;
  }

  resp.status(200).json(matchedUser);
};

const addUser = (req, resp) => {
  const newUser = req.body;

  newUser.id = uuid();

  users.push(newUser);

  resp.status(201).json({ message: `${newUser.firstName} added to the users` });
};

const updateUser = (req, resp) => {
  const matchedUser = users.find((user) => user.id === req.params.id);

  if (!matchedUser) {
    resp.status(400).json({ message: "User not found" });
    return;
  }

  Object.keys(req.body).forEach((key) => {
    matchedUser[key] = req.body[key];
  });

  resp.status(200).json(matchedUser);
};

const deleteUser = (req, resp) => {
  const matchedUser = users.find((user) => user.id === req.params.id);

  if (!matchedUser) {
    resp.status(400).json({ message: "User not found" });
    return;
  }

  users = users.filter((user) => user.id !== req.params.id);

  resp.status(200).json({ message: "User deleted" });
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
