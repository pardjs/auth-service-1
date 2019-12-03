import {MigrationInterface, QueryRunner} from "typeorm";

export class Timestamp1575275080411 implements MigrationInterface {
    name = 'Timestamp1575275080411'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "AuthPoint" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "Role" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "User" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

}
