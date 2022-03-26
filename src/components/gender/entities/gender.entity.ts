import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("genders")
export class Gender {
    @PrimaryColumn({ primary: true, generated: true })
    id: number;

    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar', unique: true })
    normalizedName: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
