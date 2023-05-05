import mysql from "mysql";
import config from '../project_configuration.js';

export const db = mysql.createPool({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.name
});