import { Request, Response } from "express";
import JWT from "../../core/JWT";
import { AccessTokenErrorResponse, AuthFailureResponse, InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Logger from "../../core/Logger";
import { geneerateRandomBytes } from "../../helpers/crypto";
import { createTokens } from '../../services/auth/token';
import { create } from '../keystore';
// models
import User from "../../models/user";
import Keystore from "../../models/keystore";

const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        const payload = await JWT.validate(refreshToken);
        if (!payload || !payload.sub) {
            return new AuthFailureResponse().send(res)
        }
        const user = await User.findOne({
            where: {
                id: payload.sub
            }
        });
        if (!user) return new AccessTokenErrorResponse().send(res);
        const keystore = await Keystore.findOne({
            where: {
                userId: payload.sub,
                secondaryKey: payload.prm,
                status: 1
            }
        });
        if (payload && payload.sub && Date.now() <= payload.exp * 1000 && keystore) {
            const accessTokenKey = geneerateRandomBytes('hex');
        const refreshTokenKey = geneerateRandomBytes('hex');
            const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
            await create(user, accessTokenKey, refreshTokenKey)
            new SuccessResponse('Login Success', {
                tokens: tokens,
            }).send(res);
        } else {
            await Keystore.destroy({
                where: {
                    userId: payload.sub,
                    secondaryKey: payload.prm,
                    status: 1
                }
            })
            return new AuthFailureResponse().send(res);
        }
    } catch (error) {
        Logger.error(error)
        return new InternalErrorResponse('Server error').send(res)
    }
};

export default refreshAccessToken;