import { query } from 'express';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class createuseravatarfield1604534173145
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'userAvatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'useAvatar');
  }
}
