import {MigrationInterface, QueryRunner} from 'typeorm';

export class ExtraFieldToControllVisibilty1556544647251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" ADD "shownInApp" boolean DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "User" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "isDefault" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Role" ADD "shownInApp" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "shownInApp"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP COLUMN "isDefault"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "shownInApp"`);
    }

}
