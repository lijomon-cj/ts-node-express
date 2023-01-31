import { DataTypes, Sequelize } from 'sequelize';
import db from './index';
import { Keystore } from '../types/model/keystore'
import User from './user';

const Keystore = db.define<Keystore>(
    "Keystore",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        primaryKey: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        secondaryKey: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        paranoid: false, // deletedAt
    }
);

Keystore.belongsTo(User, { as: 'keys', foreignKey: 'userId' })

export default Keystore;