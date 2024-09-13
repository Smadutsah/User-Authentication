import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAuthenticationTables1726237756712 implements MigrationInterface {
    name = 'CreateUserAuthenticationTables1726237756712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_authentication_information_verification" ("id" text NOT NULL, "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "idempotency_key" text NOT NULL, "value" text NOT NULL, "type" text NOT NULL, "verification_code" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_25667528ee00ac9eecf1467b175" UNIQUE ("idempotency_key"), CONSTRAINT "PK_9ead79b5b8a342e013b71338fd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_authentication_information_verification_unique_idempotency_key" ON "user_authentication_information_verification" ("idempotency_key") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_authentication_information_verification_unique_idempotency_key"`);
        await queryRunner.query(`DROP TABLE "user_authentication_information_verification"`);
    }

}
