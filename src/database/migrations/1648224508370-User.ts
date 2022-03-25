import {MigrationInterface, QueryRunner} from "typeorm";

export class User1648224508370 implements MigrationInterface {
    name = 'User1648224508370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`genderId\` varchar(255) NULL, \`phoneNumber\` varchar(255) NULL, \`role\` varchar(255) NOT NULL DEFAULT 'customer', \`confirmationToken\` varchar(255) NULL, \`password\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
