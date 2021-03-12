import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1615567181713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'birth_date',
                    type: 'timestamp'
                },
                {
                    name: 'profile_photo',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'background_photo',
                    type: 'varchar',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('users');
    }

}
