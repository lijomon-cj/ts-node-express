import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";

export interface Keystore extends Model<InferAttributes<Keystore>, InferCreationAttributes<Keystore>> {
    id: CreationOptional<number>;
    userId: ForeignKey<User["id"]>;
    primaryKey: string;
    secondaryKey: string;
    status?: number;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}