export const logger = (store) => (next) => (action) => {
    console.log(action);
    return next(action);
};
