import express from "express";
const app = express();
import {connectionToDatabase } from "./util/db";
import {PORT } from "./util/config";



const start = async () => {
    await connectionToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
  start();