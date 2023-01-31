// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};

export const corsUrl = process.env.CORS_URL;

export const jwtInfo = {
  accesTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || 'a874ebb9f86bb3079f679ece5bab3bef0264dcdc8d3350e8afe0e48d5b1f30b6d1474e9c66b85c20b8703990467b067a02b7cbe22ef4c3adcbd3c8e3fb17273c',
  refreshtokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY || '26d75b64369dd91d6f0f7f0205378d03d6e6cfb18f92f986fc5404f47a594e5b6b7b92d4f9312157ca0e14b14942405351fc6586db883e7cdf433a614dcc7723', 
}

export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const logDirectory = process.env.LOG_DIR;

export const redis = {
  host: process.env.REDIS_HOST || '',
  port: parseInt(process.env.REDIS_PORT || '0'),
  password: process.env.REDIS_PASSWORD || '',
};

export const caching = {
  contentCacheDuration: parseInt(
    process.env.CONTENT_CACHE_DURATION_MILLIS || '600000',
  ),
};
