import crypto from 'crypto'

export const geneerateRandomBytes = (type: BufferEncoding) => {
    return crypto.randomBytes(64).toString(type);
}