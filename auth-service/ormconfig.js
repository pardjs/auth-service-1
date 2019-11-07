require('dotenv').config();

module.exports = {
    entities: [process.env.NODE_ENV === 'production' ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    url: process.env.DB_URL || 'postgres://postgres:@127.0.0.1/pardjs-auth-service',
    synchronize: false,
    type: 'postgres',
    migrations: ["db-migration/*.ts"],
    migrationsTableName: "users_migration_table",
    cli: {
        migrationsDir: "db-migration"
    },
    logging: true,
    logger: 'debug'
}