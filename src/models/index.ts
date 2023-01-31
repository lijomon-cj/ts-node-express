import { Sequelize }   from 'sequelize';
import { Options } from 'sequelize/types';
import databaseConfiguration from '../database/config';

const env: string = process.env.NODE_ENV || 'development';

const config: Options = databaseConfiguration[env as keyof typeof databaseConfiguration];

const db: Sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password,
    config,
);

export default db;