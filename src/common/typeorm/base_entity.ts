import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class BaseEntity {
  @PrimaryColumn({ name: "id", type: "text", update: false })
  id: string;

  @Column({
    type: "timestamptz",
    name: "inserted_at",
    default: () => "CURRENT_TIMESTAMP",
    update: false,
  })
  insertedAt: Date;
}
