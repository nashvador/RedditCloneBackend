import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    process.env.PGDATABASE!,
    process.env.PGUSER!,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres'
    });

const connectionToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("connected to the database");
      } catch (err) {
        console.log("failed to connect to the database");
        console.log(err);
        return process.exit(1);
      }
      return null;
}

export {sequelize, connectionToDatabase}