import { Request, Response } from "express";
import { SuccessResponse, InternalErrorResponse } from "../../core/ApiResponse";
import Logger from "../../core/Logger";
import { createTokens } from "../../services/auth/token";
import { create } from '../keystore/index'
import { geneerateRandomBytes } from '../../helpers/crypto';
// models
import User from "../../models/user";

const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: {
                walletAddress: req.body.walletAddress
            },
        });
        if (user == null) {
            await User.create({
                walletAddress: req.body.walletAddress,
                userType: 1,
            })
            return new InternalErrorResponse('Server error').send(res)
        }
        const accessTokenKey = geneerateRandomBytes('hex');
        const refreshTokenKey = geneerateRandomBytes('hex');
        const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
        await create(user, accessTokenKey, refreshTokenKey)
        new SuccessResponse('Login Success', {
            user,
            tokens: tokens,
        }).send(res);
    } catch (error) {
        Logger.error(error)
        return new InternalErrorResponse('Server error').send(res)
    }
}

export default login;