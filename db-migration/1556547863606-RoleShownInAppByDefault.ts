import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleShownInAppByDefault1556547863606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "shownInApp" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "shownInApp" SET DEFAULT false`);
    }

}
