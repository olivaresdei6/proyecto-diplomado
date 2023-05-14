export const envConfiguration = () => ({
    environment: process.env.NODE_ENV || 'development',
    databaseName: process.env.DATABASE_NAME,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    databasePort: parseInt(process.env.DATABASE_PORT),
    databaseHostProd: process.env.DATABASE_HOST,
    databaseHost: process.env.DATABASE_HOST,
    portServer: parseInt(process.env.PORT_SERVER, 10),
    portServerProd: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
    satage: process.env.STAGE,
    urlApi: process.env.URL_API,
    emailHost: process.env.EMAIL_HOST,
    emailPort: parseInt(process.env.EMAIL_PORT, 10) || 587,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FROM,
    urlFront: process.env.URL_FRONT,
    urlConfirmAccount: process.env.URL_CONFIRMATION,
    s3BucketName: process.env.S3_BUCKET_NAME,
    s3Region: process.env.S3_REGION,
    s3AccessKey: process.env.S3_ACCESS_KEY_ID,
    s3SecretKey: process.env.S3_SECRET_ACCESS_KEY,
    hostUrl: process.env.HOST_URL,



})
