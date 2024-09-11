import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerAccountTable1725425564543 implements MigrationInterface {
    name = 'CreateCustomerAccountTable1725425564543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_account" ("id" text NOT NULL, "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, "normalized_name" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_875fa8dea881cc80d36eb5e0c68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "customer_account_unique_normalized_name" ON "customer_account" ("normalized_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."customer_account_unique_normalized_name"`);
        await queryRunner.query(`DROP TABLE "customer_account"`);
    }

}
