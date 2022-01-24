import { ApiProperty, } from "@nestjs/swagger";
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

/**
 * This type represent the Entity Identifier, this identifier is a uuid currently,
 * but in the future could be  a idString or something different.
 */
export type EntityId = number;

@Entity()
export abstract class AppEntity extends BaseEntity {
    @ApiProperty({
        description : "The entity id",
        example     : 1,
    })
    @PrimaryGeneratedColumn()
    id : EntityId;

    @Column({
        name: "created_at",
    })
    createdAt : Date;

    @Column({
        name: "updated_at",
    })
    updatedAt : Date;

    @Column({
        name     : "deleted_at",
        nullable : true,
    })
    deletedAt : Date;

    @BeforeInsert()
    setCreationDates() : void {
        const date = new Date();

        if (!this.createdAt) {
            this.createdAt = date;
        }
        if (!this.updatedAt) {
            this.updatedAt = date;
        }
    }

    @BeforeUpdate()
    setUpdateDates() : void {
        this.updatedAt = new Date();
    }

    softDelete() : void {
        this.deletedAt = new Date();
    }
}
