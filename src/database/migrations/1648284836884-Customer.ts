import {MigrationInterface, QueryRunner} from "typeorm";

export class Customer1648284836884 implements MigrationInterface {
    name = 'Customer1648284836884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`genderId\` int NULL, \`creatorId\` int NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8536b8b85c06969f84f0c098b0\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`genders\` ADD \`normalizedName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`genders\` ADD UNIQUE INDEX \`IDX_ad18425b1eb111c098a515a9ee\` (\`normalizedName\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE \`genders\` DROP INDEX \`IDX_ad18425b1eb111c098a515a9ee\``);
        await queryRunner.query(`ALTER TABLE \`genders\` DROP COLUMN \`normalizedName\``);
        await queryRunner.query(`DROP INDEX \`IDX_8536b8b85c06969f84f0c098b0\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
