import {MigrationInterface, QueryRunner} from "typeorm";

export class EmailMobileUsernameNullable1554993123950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "mobile" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "mobile" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL`);
    }

}
