import { Entity, Column, BeforeInsert, BeforeUpdate, Index, EntityManager } from 'typeorm';
import { AppDataSource } from '../../data_source';
import { BaseEntity } from '../../common/typeorm/base_entity';
import { uuidWithPrefix } from '../../common/utils/uuid';
import { POSTGRESQL_ERROR } from '../../common/constants/postgresql';
import { Length, validateOrReject } from 'class-validator';

/**
 * We keep track of the customer account, which is an entity under which any action can be taken.
 */
@Entity({ name: 'customer_account' })
@Index('customer_account_unique_normalized_name', ['normalizedName'], { unique: true })
export class CustomerAccount extends BaseEntity {
  @Column({ name: 'name', type: 'text', update: false, nullable: false })
  name: string;

  @Length(3) // should be at least 3 characters
  @Column({ name: 'normalized_name', type: 'text', update: false, nullable: false })
  normalizedName: string;

  // entry needed to allow for the updating of names but not super necessary
  @Column({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @BeforeInsert()
  generateUuid(): void {
    this.id = uuidWithPrefix(true, 'cuacc');
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this, { validationError: { target: false } });
  }

  equal(name: string): boolean {
    return this.name == name;
  }

  static async create(name: string, transactionalEntityManager?: EntityManager): Promise<CustomerAccount> {
    const customerAccount = new CustomerAccount();
    customerAccount.name = name.trim();
    customerAccount.normalizedName = name.trim().toLowerCase();

    const manager = transactionalEntityManager ?? AppDataSource.manager;
    const insertResult = await manager
      .createQueryBuilder()
      .insert()
      .into(CustomerAccount)
      .values(customerAccount)
      .orIgnore()
      .returning('*')
      .execute();

    if ((insertResult.raw as Array<CustomerAccount>).length == 0) {
      let collidingEntry = await AppDataSource.getRepository(CustomerAccount).findOne({
        where: { normalizedName: customerAccount.normalizedName }
      });

      if (collidingEntry?.equal(name)) {
        return collidingEntry;
      } else {
        throw {
          code: POSTGRESQL_ERROR.UNIQUE_VIOLATION,
          constraint: 'customer_account_unique_name',
          message: 'duplicate key value violates unique constraint "customer_account_unique_name"'
        };
      }
    }

    return customerAccount;
  }
}
