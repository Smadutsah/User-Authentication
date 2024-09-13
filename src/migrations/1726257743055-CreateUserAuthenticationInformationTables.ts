import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAuthenticationInformationTables1726257743055 implements MigrationInterface {
    name = 'CreateUserAuthenticationInformationTables1726257743055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_authentication_information_verification_unique_idempotency"`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" ADD "logical_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" ADD "verified_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_authentication_information_verification_unique_logical_id" ON "user_authentication_information_verification" ("logical_id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_authentication_information_verification_unique_idempotency_key" ON "user_authentication_information_verification" ("idempotency_key") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_authentication_information_verification_unique_idempotency_key"`);
        await queryRunner.query(`DROP INDEX "public"."user_authentication_information_verification_unique_logical_id"`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" DROP COLUMN "verified_at"`);
        await queryRunner.query(`ALTER TABLE "user_authentication_information_verification" DROP COLUMN "logical_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_authentication_information_verification_unique_idempotency" ON "user_authentication_information_verification" ("idempotency_key") `);
    }

}
