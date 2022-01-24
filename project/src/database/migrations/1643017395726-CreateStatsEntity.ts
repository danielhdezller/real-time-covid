import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatsEntity1643017395726 implements MigrationInterface {
  name = 'CreateStatsEntity1643017395726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stats" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "raw_data" jsonb NOT NULL, "information" jsonb NOT NULL, "country" character varying(50), "stats" character varying(10), "startDateRange" date, "endDateRange" date, CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stats"`);
  }
}
