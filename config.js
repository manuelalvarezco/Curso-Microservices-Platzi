require('dotenv').config();

module.exports = {
    remoteDB: process.env.REMOTE_DB,
    api: {
        port: process.env.API_PORT
    },
    post: {
        port: process.env.POST_PORT,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    },
    mysqlService: {
        host: process.env.MYSQL_SVR_HOST,
        port: process.env.MYSQL_SVR_PORT
    },
    cacheService: {
        port: process.env.CACHE_SVR_PORT
    },
    redis: {
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_PORT,
        user : process.env.REDIS_USER,
        password : process.env.REDIS_PASSWORD,
    }
}