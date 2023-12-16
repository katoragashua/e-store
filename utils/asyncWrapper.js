const asyncWrapper = async (fn) => {
  try {
    await fn();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = asyncWrapper;
