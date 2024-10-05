import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('ERROR LOG ', new Date().toLocaleString());
  console.log('Request:', req.method, req.originalUrl);
  console.log('Params:', req.params);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  console.log('Error:', err.messageObject || err.message);
  console.log('--------------------------------------------------------------------------------------');

  const messageError = err.messageObject || err.message;
  const errorResponse = {
    status: err.status || 400,
    error: messageError
  };

  return res.status(errorResponse.status).json(errorResponse);
};

export default errorHandler;
