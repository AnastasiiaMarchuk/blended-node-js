const controllerWrapper = (controller) => {
  return async function (req, res, next) {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

// const asyncWrapper = (controller) => {
//     return (req, res, next) => {
//       controller(req, res).catch(next);
//     };
//   };

module.exports = controllerWrapper;
