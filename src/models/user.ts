import { DataTypes, Sequelize } from 'sequelize';
import db from './index';
import { User } from '../types/model/user'
import Role from './role';

const User = db.define<User>(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: Sequelize.literal('gen_random_uuid()'),
		},
		userName: {
			type: new DataTypes.STRING(255),
			allowNull: true,
			validate: {
				len: [0, 255],
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isEmail: true,
			},
		},
        emailVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
        walletAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        userData: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        kycStatus: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: true,
		},
		userType: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        tier: {
			type: DataTypes.UUID,
			allowNull: true,
		},
        roleId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: Role,
				key: 'id'
			}
		},
		status: {
			type: DataTypes.INTEGER,
            defaultValue: 0,
			allowNull: false,
		},
		profileImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        signupCompleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
        isUsingTempPassword: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
		paranoid: false, // deletedAt
	}
);

User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })

export default User;