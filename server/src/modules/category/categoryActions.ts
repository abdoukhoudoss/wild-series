// Some data to make the trick
const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();
  res.json(categoriesFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const category = categories.find((c) => c.id === parsedId);
  if (category) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

const create: RequestHandler = (req, res) => {
  const newId = categories.length + 1;
  const newCategory = { id: newId, name: req.body.name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

const update: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const index = categories.findIndex((c) => c.id === parsedId);

  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    res.json(categories[index]);
  } else {
    res.sendStatus(404);
  }
};

const destroy: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const index = categories.findIndex((c) => c.id === parsedId);

  if (index !== -1) {
    categories.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

export default {
  browse,
  read,
  create,
  update,
  destroy,
};
