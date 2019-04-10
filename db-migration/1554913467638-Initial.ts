import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1554913467638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "User" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "isMobileVerified" boolean NOT NULL DEFAULT false, "isDisabled" boolean NOT NULL DEFAULT false, "password" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx-user-username-unique" ON "User" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx-user-email-unique" ON "User" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx-user-mobile-unique" ON "User" ("mobile") `);
        await queryRunner.query(`CREATE TABLE "Role" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx-role-name-unique" ON "Role" ("name") `);
        await queryRunner.query(`CREATE TABLE "AuthPoint" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "display_name" character varying NOT NULL, CONSTRAINT "PK_331d0843b1be6f4be2caa8d6f87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx-auth_point-name-unique" ON "AuthPoint" ("name") `);
        await queryRunner.query(`CREATE TABLE "LoginSession" ("updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_5588e8509ab033f6612d61cc236" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User_Role_Link" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_14117e6142f096ba0ad289f9eaa" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_081262c2a39676aa9da7f1d433" ON "User_Role_Link" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b0f15c6cea9e7379f9adafec0" ON "User_Role_Link" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "AuthPoint_Role_Link" ("roleId" integer NOT NULL, "authPointId" integer NOT NULL, CONSTRAINT "PK_3ac506e93d7ab3fb199c4896c76" PRIMARY KEY ("roleId", "authPointId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d51d70c7d71f6c624e17a9589a" ON "AuthPoint_Role_Link" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e49581d76fe0b03ac067d9ec4b" ON "AuthPoint_Role_Link" ("authPointId") `);
        await queryRunner.query(`ALTER TABLE "User_Role_Link" ADD CONSTRAINT "FK_081262c2a39676aa9da7f1d4335" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User_Role_Link" ADD CONSTRAINT "FK_2b0f15c6cea9e7379f9adafec0c" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuthPoint_Role_Link" ADD CONSTRAINT "FK_d51d70c7d71f6c624e17a9589a7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AuthPoint_Role_Link" ADD CONSTRAINT "FK_e49581d76fe0b03ac067d9ec4b0" FOREIGN KEY ("authPointId") REFERENCES "AuthPoint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "AuthPoint_Role_Link" DROP CONSTRAINT "FK_e49581d76fe0b03ac067d9ec4b0"`);
        await queryRunner.query(`ALTER TABLE "AuthPoint_Role_Link" DROP CONSTRAINT "FK_d51d70c7d71f6c624e17a9589a7"`);
        await queryRunner.query(`ALTER TABLE "User_Role_Link" DROP CONSTRAINT "FK_2b0f15c6cea9e7379f9adafec0c"`);
        await queryRunner.query(`ALTER TABLE "User_Role_Link" DROP CONSTRAINT "FK_081262c2a39676aa9da7f1d4335"`);
        await queryRunner.query(`DROP INDEX "IDX_e49581d76fe0b03ac067d9ec4b"`);
        await queryRunner.query(`DROP INDEX "IDX_d51d70c7d71f6c624e17a9589a"`);
        await queryRunner.query(`DROP TABLE "AuthPoint_Role_Link"`);
        await queryRunner.query(`DROP INDEX "IDX_2b0f15c6cea9e7379f9adafec0"`);
        await queryRunner.query(`DROP INDEX "IDX_081262c2a39676aa9da7f1d433"`);
        await queryRunner.query(`DROP TABLE "User_Role_Link"`);
        await queryRunner.query(`DROP TABLE "LoginSession"`);
        await queryRunner.query(`DROP INDEX "idx-auth_point-name-unique"`);
        await queryRunner.query(`DROP TABLE "AuthPoint"`);
        await queryRunner.query(`DROP INDEX "idx-role-name-unique"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP INDEX "idx-user-mobile-unique"`);
        await queryRunner.query(`DROP INDEX "idx-user-email-unique"`);
        await queryRunner.query(`DROP INDEX "idx-user-username-unique"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
