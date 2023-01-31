import dotenv from 'dotenv'
import { Options } from 'sequelize';
dotenv.config();

interface ConfigDB {
    development: Options,
    test: Options,
    production: Options,
}

const databaseConfiguration: ConfigDB = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            connectTimeout: 60000,
        },  
        // seederStorage: 'sequelize',
        // seederStorageTableName: 'sequelizeseeds',
        logging: false,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            connectTimeout: 60000,
        },  
        // seederStorage: 'sequelize',
        // seederStorageTableName: 'sequelizeseeds',
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            connectTimeout: 60000,
        },  
        // seederStorage: 'sequelize',
        // seederStorageTableName: 'sequelizeseeds',
        logging: false,
    }
};

export default databaseConfiguration;