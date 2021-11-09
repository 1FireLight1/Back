const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Token = require("../dataBase/models/Token.model");

const router = Router();

function initRoutes() {
  router.get(
    "/me",
    asyncHandler(requireToken),
    asyncHandler(getUserInformation)
  );
  router.patch(
    "/me",
    asyncHandler(requireToken),
    asyncHandler(updateUserInformation)
  );
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logoutUser));
}

async function getUserInformation(req, res, next) {
  const user = await User.findByPk(req.userId);

  res.status(200).json(user);
}

async function updateUserInformation(req, res, next) {

  let user = await User.update(req.body, {
    returning: true,
    where: { id: req.userId },
  });
  //user = await User.findByPk(req.userId); //destroy

  res.status(200).json(user);
}

async function logoutUser(req, res, next) {
  //console.log(req.csrfToken());
  // let token = await Token.findOne({
  //   where: {
  //     value: req.header("token"),
  //   },
  // });
  await Token.destroy({
    where: {
      value: req.header("tokenAccess"),
    },
  });
  res.status(200).json({ message: "Logout..." });
}

initRoutes();

module.exports = router;
