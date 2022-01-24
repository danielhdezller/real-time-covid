import { AppEntity } from "@/shared/entities/app-entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: "stats", 
})
export class Stats extends AppEntity {
    @Column('jsonb', {
        name: 'raw_data'
    })
    rawData: object;

    @Column('jsonb')
    information: object;

    @Column({
        length: 50,
        nullable: true
    })
    country?: string;

    @Column({
        type: 'date',
        nullable: true
    })
    startDateRange?: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    endDateRange?: Date;
}