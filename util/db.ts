import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from 'umzug'


const sequelize = new Sequelize(
    process.env.PGDATABASE!,
    process.env.PGUSER!,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres', 
    },
    );



    const runMigrations = async () => {
      const migrator = new Umzug({
        migrations: {
          glob: 'migrations/*.ts',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
      })
      
      const migrations = await migrator.up()
      console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
      })
    }
       
const connectionToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations()
        console.log("connected to the database");
      } catch (err) {
        console.log("failed to connect to the database");
        console.log(err);
        return process.exit(1);
      }
      return null;
}

export {sequelize, connectionToDatabase}