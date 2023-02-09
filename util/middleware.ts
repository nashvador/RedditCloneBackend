import {Request, Response, NextFunction, ErrorRequestHandler} from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/userModel"
import {info, error} from "./logger"

const requestLogger = (
    request: Request,
    _response: Response,
    next: NextFunction
  ) => {
    info("Method:", request.method);
    info("Path:  ", request.path);
    info("Body:  ", request.body);
    info("---");
    next();
  };


  const unknownEndpoint = (_request: Request, response: Response
    ) => {
 response.status(404).send({ error: "unknown endpoint" });
  };
  
  const errorHandler: ErrorRequestHandler = (
    error,
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    error(error.message);
  
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        error: "invalid token",
      });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "token expired",
      });
    }
  
    next(error);
  };

  export {requestLogger, errorHandler, unknownEndpoint}