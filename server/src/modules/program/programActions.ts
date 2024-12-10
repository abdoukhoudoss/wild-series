import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  const parsedId = Number.parseInt(req.params.id);
  const program = programsFromDB.find((p) => p.id === parsedId);

  if (program) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

const create: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  const newId = programsFromDB.length + 1;
  const newProgram = {
    id: newId,
    title: req.body.title,
    synopsis: req.body.synopsis,
    poster: req.body.poster,
    country: req.body.country,
    year: req.body.year,
    category_id: req.body.category_id,
  };
  programsFromDB.push(newProgram);
  res.status(201).json(newProgram);
};

const update: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  const parsedId = Number.parseInt(req.params.id);
  const index = programsFromDB.findIndex((p) => p.id === parsedId);

  if (index !== -1) {
    programsFromDB[index] = { ...programsFromDB[index], ...req.body };
    res.json(programsFromDB[index]);
  } else {
    res.sendStatus(404);
  }
};

const destroy: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();
  const parsedId = Number.parseInt(req.params.id);
  const index = programsFromDB.findIndex((p) => p.id === parsedId);

  if (index !== -1) {
    programsFromDB.splice(index, 1);
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
