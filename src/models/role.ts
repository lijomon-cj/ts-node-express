import { DataTypes, Sequelize } from 'sequelize';
import db from './index';
import { Role } from '../types/model/role'

const Role = db.define<Role>(
	"Role",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: Sequelize.literal('gen_random_uuid()'),
		},
		name: {
			type: new DataTypes.STRING(255),
			allowNull: true,
			validate: {
				len: [0, 255],
			},
		},
		status: {
			type: DataTypes.INTEGER,
            defaultValue: 0,
			allowNull: true,
		},
		priority: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
		paranoid: false, // deletedAt
	}
);

export default Role;