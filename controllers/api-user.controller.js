const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Token = require("../dataBase/models/Token.model");

const router = Router();

function initRoutes() {
  router.get(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(getUserInformation)
  );
  router.patch(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(updateUserInformation)
  );
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logoutUser));
}

async function getUserInformation(req, res, next) {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw new ErrorResponse("No user found", 404);
  }

  res.status(200).json(user);
}

async function updateUserInformation(req, res, next) {
  let user = await User.findByPk(req.params.id);

  if (!user) {
    throw new ErrorResponse("No user found", 404);
  }

  await user.update(req.body);
  user = await User.findByPk(req.params.id); //destroy

  res.status(200).json(user);
}

async function logoutUser(req, res, next) {
  let token = await Token.findOne({
    where: {
      value: req.headers.token,
    },
  });
  await token.destroy();
  res.status(200).json({ message: "Logout..." });
}

initRoutes();

module.exports = router;
