import { BaseEntity } from "../../../src/common/typeorm/base_entity";
import { Entity, Column, BeforeInsert } from "typeorm";

// TODO(felix): bring state and statusReason to be in this table as well
@Entity()
export class StatusBaseEntity extends BaseEntity {
  @Column({ name: "created_by_internal_user_id", type: "text", nullable: true, update: false })
  createdByInternalUserId?: string;

  @Column({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ type: "timestamptz", name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  validateEntryNotDeleted(): void {
    if (this.deletedAt) {
      throw new Error("cannot insert a deleted entry");
    }
  }

  static validateStateChange<T>(allowedToStates: Array<T>, toState: T, from?: T) {
    if (!allowedToStates.includes(toState)) {
      throw new Error(`invalid state transition from ${from} to ${toState}`);
    }
  }

  static isValidStateTransition<T>(allowedToStates: Array<T>, toState: T): boolean {
    return allowedToStates?.includes(toState);
  }

  static validStateTransition<T>(from: T, to: T, validStateTransitions: { [s: string]: T[] }): boolean {
    return this.isValidStateTransition<T>(validStateTransitions[from as unknown as string], to);
  }

  static validateStateTransition<T>(from: T, to: T, validStateTransitions: { [s: string]: T[] }) {
    this.validateStateChange<T>(validStateTransitions[from as unknown as string], to, from);
  }
}
