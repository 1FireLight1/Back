const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/", asyncHandler(requireToken), asyncHandler(createToDo));
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(patchToDo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteToDos));
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
}

async function getToDos(req, res, next) {
  //const user = await User.create();
  const todos = await ToDo.findAll({
    where: {
      userId: req.userId,
    },
  });

  res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      userId: req.userId,
      id: req.params.id,
    },
  });
  //const todo = await ToDo.findByPk(req.params.id);

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  res.status(200).json(todo);
}

async function createToDo(req, res, next) {
  // let body = req.body;
  // body.userId = req.userId; //spreadoperator
  const todo = await ToDo.create({ ...req.body, userId: req.userId });

  res.status(200).json(todo);
}

async function patchToDo(req, res, next) {
  let todo = await ToDo.update(req.body, {
    returning: true,
    where: {
      userId: req.userId,
      id: req.params.id,
    },
  });
  res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
  await ToDo.destroy({
    where: {
      userId: req.userId,
    },
  });
  res.status(200).json({ message: "Deletion complete!" });
}

async function deleteToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      userId: req.userId,
      id: req.params.id,
    },
  });
  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }
  await todo.destroy();

  res.status(200).json({ message: "Deletion complete!" });
}

initRoutes();

module.exports = router;
