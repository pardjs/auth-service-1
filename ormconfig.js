
module.exports = {
    entities: [process.env.NODE_ENV === 'production' ? 'src/**/*.entity.ts' : 'src/**/*.entity.ts'],
    url: 'postgres://pardjs:example@127.0.0.1:5432/pardjs-users-service',
    synchronize: false,
    type: 'postgres',
    migrations: ["db-migration/*.ts"],
    cli: {
        migrationsDir: "db-migration"
    },
    logging: true
}