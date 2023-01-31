import { Request, Response } from "express";
import { SuccessResponse, InternalErrorResponse } from "../../core/ApiResponse";
import Logger from "../../core/Logger";
// Import models
import User from "../../models/user";

const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            // where: {
            //     walletAddress: req.body.walletAddress
            // },
        });
        new SuccessResponse('Login Success', {
            user,
        }).send(res);
    } catch (error) {
        Logger.error(error)
        return new InternalErrorResponse('Server error').send(res)
    }
}

export default profile;