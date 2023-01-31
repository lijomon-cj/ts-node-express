import { ProtectedRequest } from "../types/global/request";
import JWT from "../core/JWT";
import { AccessTokenError, TokenExpiredError } from "../core/ApiError";
import { getAccessToken, validateTokenData } from "../services/auth/token";
import { AuthFailureResponse, AccessTokenErrorResponse } from "../core/ApiResponse";
import Keystore from "../models/keystore";
import User from "../models/user";

export default async (req: ProtectedRequest, res, next) => {
    try {
        req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
        const payload = await JWT.validate(req.accessToken);
        validateTokenData(payload);
        const user = await User.findOne({
            where: {
                id: payload.sub
            }
        });
        if (!user) return new AccessTokenErrorResponse().send(res)
        req.user = user;
        const keystore = await Keystore.findOne({
            where: {
                userId: req.user.id,
                primaryKey: payload.prm,
                status: 1
            }
        });
        if (!keystore) return new AuthFailureResponse().send(res)
        req.keystore = keystore;
        return next();
    } catch (e) {
        if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
        return new AccessTokenErrorResponse().send(res)
    }
}
