import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Role } from "./role";

export interface User
    extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>;
    userName?: string;
    email?: string;
    emailVerified?: boolean,
    walletAddress?: string;
    userData?: object;
    password?: string;
    kycStatus?: number;
    userType?: number;
    tier?: any;
    roleId?: ForeignKey<Role["id"]>;
    status?: number;
    profileImage?: string;
    signupCompleted?: boolean;
    isUsingTempPassword?: boolean;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    Role?: Role;
}