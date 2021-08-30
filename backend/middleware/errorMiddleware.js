

export const handleNotFound = ( req, res, next ) => {
   const pathError = new Error(`Page Not Found - ${req.originalUrl}`)
   res.status(404);
   next(pathError);
};


//mw to add custom error handler for all other requests and send a corresponding error message
export const errorHandler = (err, req, res, next) => {
   /* const status = err.name && err.name === "ValidationError" ? 400: 500;
   res.status(status).send({ message: err.message }); */

   const status = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(status);
   res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack
   });
};