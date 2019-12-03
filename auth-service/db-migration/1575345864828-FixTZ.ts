import {MigrationInterface, QueryRunner} from "typeorm";

export class FixTZ1575345864828 implements MigrationInterface {
    name = 'FixTZ1575345864828'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "timezoneTest"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "timezoneTest" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
    }

}
