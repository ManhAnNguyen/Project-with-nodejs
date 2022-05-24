const authPage = (permission) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You dont have permision");
    }
  };
};

const authCourse = (req, res, next) => {
  const number = parseInt(req.params.number);
  if (req.body.courses.includes(number)) {
    next();
  } else {
    return res
      .status(401)
      .json(`You dont have permision to see course ${number}`);
  }
};

module.exports = { authCourse, authPage };
