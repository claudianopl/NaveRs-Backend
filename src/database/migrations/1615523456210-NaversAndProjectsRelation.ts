import { MigrationInterface, QueryRunner } from 'typeorm';

export default class NaversAndProjectsRelation1615523456210
  implements MigrationInterface {
  name = 'NaversAndProjectsRelation1615523456210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "navers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "job_role" character varying NOT NULL, "birthdate" date NOT NULL, "admission_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b746f976ea9a66d08340b1ba1ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "navers_projects_projects" ("naversId" uuid NOT NULL, "projectsId" uuid NOT NULL, CONSTRAINT "PK_507af73803cb57949a855340b7e" PRIMARY KEY ("naversId", "projectsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa9f9cea0f092596642c9a1f14" ON "navers_projects_projects" ("naversId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_931aa5604f48968bb893c513e3" ON "navers_projects_projects" ("projectsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" ADD CONSTRAINT "FK_fa9f9cea0f092596642c9a1f149" FOREIGN KEY ("naversId") REFERENCES "navers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" ADD CONSTRAINT "FK_931aa5604f48968bb893c513e3e" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" DROP CONSTRAINT "FK_931aa5604f48968bb893c513e3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "navers_projects_projects" DROP CONSTRAINT "FK_fa9f9cea0f092596642c9a1f149"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_931aa5604f48968bb893c513e3"`);
    await queryRunner.query(`DROP INDEX "IDX_fa9f9cea0f092596642c9a1f14"`);
    await queryRunner.query(`DROP TABLE "navers_projects_projects"`);
    await queryRunner.query(`DROP TABLE "navers"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
