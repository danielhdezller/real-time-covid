import { AppEntity } from "@/shared/entities/app-entity";
import { Column, Entity } from "typeorm";
import { StatsTypes } from "../enums/stats.enum";

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
        length: 10,
        nullable: true
    })
    stats?: StatsTypes;

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