import { Entity, Column, BeforeInsert, BeforeUpdate, Index, EntityManager } from 'typeorm';
import { AppDataSource } from '../../data_source';
import { BaseEntity } from '../../common/typeorm/base_entity';
import { uuidWithPrefix } from '../../common/utils/uuid';
import { validateOrReject } from 'class-validator';
import { POSTGRESQL_ERROR } from '../../common/constants/postgresql';

/**
 * Represents an entity for user authentication information verification, such as email or phone verification.
 */
@Entity({ name: 'user_authentication_information_verification' })
@Index('user_authentication_information_verification_unique_idempotency_key', ['idempotencyKey'], { unique: true })
export class UserAuthenticationInformationVerification extends BaseEntity {
  @Column({ name: 'idempotency_key', type: 'text', unique: true, nullable: false })
  idempotencyKey: string;

  @Column({ name: 'value', type: 'text', nullable: false })
  value: string;

  @Column({ name: 'type', type: 'text', nullable: false })
  type: 'email' | 'phone';

  @Column({ name: 'verification_code', type: 'text', nullable: false })
  verificationCode: string;

  @Column({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @BeforeInsert()
  generateUuid(): void {
    this.id = uuidWithPrefix(true, 'uavrf'); // Prefix updated to match new entity
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this, { validationError: { target: false } });
  }

  static async create(
    idempotencyKey: string,
    value: string,
    type: 'email' | 'phone',
    verificationCode: string,
    transactionalEntityManager?: EntityManager
  ): Promise<UserAuthenticationInformationVerification> {
    const verificationInfo = new UserAuthenticationInformationVerification();
    verificationInfo.idempotencyKey = idempotencyKey.trim();
    verificationInfo.value = value.trim();
    verificationInfo.type = type;
    verificationInfo.verificationCode = verificationCode.trim();

    const manager = transactionalEntityManager ?? AppDataSource.manager;
    const insertResult = await manager
      .createQueryBuilder()
      .insert()
      .into(UserAuthenticationInformationVerification)
      .values(verificationInfo)
      .orIgnore()
      .returning('*')
      .execute();

    if ((insertResult.raw as Array<UserAuthenticationInformationVerification>).length === 0) {
      const collidingEntry = await AppDataSource.getRepository(UserAuthenticationInformationVerification).findOne({
        where: { idempotencyKey: verificationInfo.idempotencyKey }
      });

      if (collidingEntry) {
        return collidingEntry;
      } else {
        throw {
          code: POSTGRESQL_ERROR.UNIQUE_VIOLATION,
          constraint: 'user_authentication_information_verification_unique_idempotency_key',
          message: 'duplicate key value violates unique constraint "user_authentication_information_verification_unique_idempotency_key"'
        };
      }
    }

    return verificationInfo;
  }
}
