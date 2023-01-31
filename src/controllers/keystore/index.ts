import { User } from "model/user";
import Keystore from "../../models/keystore";

export const create = async (
    client: User,
    primaryKey: string,
    secondaryKey: string,
) => {
    return await Keystore.create({
        userId: client.id,
        primaryKey,
        secondaryKey,
    })
}
