import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerUserTable1726160364047 implements MigrationInterface {
    name = 'CreateCustomerUserTable1726160364047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_account" ("id" text NOT NULL, "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, "normalized_name" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_875fa8dea881cc80d36eb5e0c68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "customer_account_unique_normalized_name" ON "customer_account" ("normalized_name") `);
        await queryRunner.query(`CREATE TABLE "customer_user" ("id" text NOT NULL, "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "first_name" text NOT NULL, "last_name" text NOT NULL, "role" text NOT NULL, "idempotency_key" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_account_id" text NOT NULL, CONSTRAINT "UQ_940f98d831e1d6fa5b1ffa57c54" UNIQUE ("idempotency_key"), CONSTRAINT "PK_5d1f609371a285123294fddcf3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "customer_user_unique_idempotency_key" ON "customer_user" ("idempotency_key") `);
        await queryRunner.query(`ALTER TABLE "customer_user" ADD CONSTRAINT "FK_1f4fa2410940fdfce64be63f766" FOREIGN KEY ("customer_account_id") REFERENCES "customer_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_user" DROP CONSTRAINT "FK_1f4fa2410940fdfce64be63f766"`);
        await queryRunner.query(`DROP INDEX "public"."customer_user_unique_idempotency_key"`);
        await queryRunner.query(`DROP TABLE "customer_user"`);
        await queryRunner.query(`DROP INDEX "public"."customer_account_unique_normalized_name"`);
        await queryRunner.query(`DROP TABLE "customer_account"`);
    }

}
