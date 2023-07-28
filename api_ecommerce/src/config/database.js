import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const E = process.env;

// const db = new Sequelize("db","name","pw",{
//     host: "localhost",
//     dialect: "mysql"
// });

const db = new Sequelize(E.DB,E.DB_USERNAME,E.DB_PASSWORD,{
    host: E.DB_HOST,
    dialect: E.DB_DIALECT
});

export default db