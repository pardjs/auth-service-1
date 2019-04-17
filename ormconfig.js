
module.exports = {
    entities: [process.env.NODE_ENV === 'production' ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    url: process.env.DB_URL || 'postgres://pardjs:example@127.0.0.1:5432/pardjs-users-service',
    synchronize: false,
    type: 'postgres',
    migrations: ["db-migration/*.ts"],
    migrationsTableName: "users_migration_table",
    cli: {
        migrationsDir: "db-migration"
    },
    logging: true
}