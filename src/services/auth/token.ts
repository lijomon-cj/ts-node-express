import Tokens from "global/request";
import { User } from "model/user";
import { tokenInfo } from "../../config";
import { AuthFailureError, InternalError } from "../../core/ApiError";
import JWT, { JwtPayload } from "../../core/JWT";

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer '))
    throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience
  )
    throw new AuthFailureError('Invalid Access Token');
  return true;
};

export const createTokens = async (
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<Tokens> => {
    const accessToken = await JWT.encode(
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user.id.toString(),
        accessTokenKey,
        tokenInfo.accessTokenValidity,
      ),
    );
  
    if (!accessToken) throw new InternalError();
  
    const refreshToken = await JWT.encode(
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user.id.toString(),
        refreshTokenKey,
        tokenInfo.refreshTokenValidity,
      ),
    );
  
    if (!refreshToken) throw new InternalError();
  
    return {
      access: accessToken,
      refresh: refreshToken,
    } as Tokens;
  };