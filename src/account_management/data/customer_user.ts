import { Entity, Column, BeforeInsert, BeforeUpdate, Index, EntityManager, ManyToOne, JoinColumn  } from 'typeorm';
  import { AppDataSource } from '../../data_source';
  import { BaseEntity } from '../../common/typeorm/base_entity';
  import { uuidWithPrefix } from '../../common/utils/uuid';
  import { length, validateOrReject } from 'class-validator';
  import { POSTGRESQL_ERROR } from '../../common/constants/postgresql';
  import { CustomerAccount } from './customer_account'; // Assuming the CustomerAccount entity is in the same directory

  /**
   * Represents a customer user entity, associated with a customer account.
   */
  @Entity({ name: 'customer_user' })
  @Index('customer_user_unique_idempotency_key', ['idempotencyKey'], { unique: true })
  export class CustomerUser extends BaseEntity {
    @Column({ name: 'first_name', type: 'text', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', type: 'text', nullable: false })
    lastName: string;

    @Column({ name: 'role', type: 'text', nullable: false })
    role: string;

    @Column({ name: 'idempotency_key', type: 'text', unique: true, nullable: false })
    idempotencyKey: string;

    @ManyToOne(() => CustomerAccount, { nullable: false })
    @JoinColumn({ name: 'customer_account_id' })
    customerAccount: CustomerAccount;

    @Column({
      type: 'timestamptz',
      name: 'updated_at',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @BeforeInsert()
    generateUuid(): void {
      this.id = uuidWithPrefix(true, 'cuusr');
    }

    @BeforeInsert()
    @BeforeUpdate()
    async validate(): Promise<void> {
      await validateOrReject(this, { validationError: { target: false } });
    }

    static async create( firstName: string, lastName: string, role: string, idempotencyKey: string, customerAccount: CustomerAccount,
      transactionalEntityManager?: EntityManager
    ): Promise<CustomerUser> {
      const customerUser = new CustomerUser();
      customerUser.firstName = firstName.trim();
      customerUser.lastName = lastName.trim();
      customerUser.role = role.trim();
      customerUser.idempotencyKey = idempotencyKey.trim();
      customerUser.customerAccount = customerAccount;

      const manager = transactionalEntityManager ?? AppDataSource.manager;
      const insertResult = await manager
        .createQueryBuilder()
        .insert()
        .into(CustomerUser)
        .values(customerUser)
        .orIgnore()
        .returning('*')
        .execute();

      if ((insertResult.raw as Array<CustomerUser>).length === 0) {
        const collidingEntry = await AppDataSource.getRepository(CustomerUser).findOne({
          where: { idempotencyKey: customerUser.idempotencyKey }
        });

        if (collidingEntry) {
          return collidingEntry;
        } else {
          throw {
            code: POSTGRESQL_ERROR.UNIQUE_VIOLATION,
            constraint: 'customer_user_unique_idempotency_key',
            message: 'duplicate key value violates unique constraint "customer_user_unique_idempotency_key"'
          };
        }
      }

      return customerUser;
    }
  }

	