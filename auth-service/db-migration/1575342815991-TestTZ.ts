import {MigrationInterface, QueryRunner} from "typeorm";

export class TestTZ1575342815991 implements MigrationInterface {
    name = 'TestTZ1575342815991'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "LoginSession" ADD "timezoneTest" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "LoginSession" DROP COLUMN "timezoneTest"`, undefined);
    }

}
