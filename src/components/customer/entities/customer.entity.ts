import { Exclude } from "class-transformer";
import { Gender } from "../../gender/entities/gender.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("customers")
export class Customer {
    @PrimaryColumn({ primary: true, generated: true })
    id: number;

    @Column({ type: 'varchar' })
    firstName:string;

    @Column({ type: 'varchar' })
    lastName:string;

    @Column({ type: 'varchar', default: null })
    avatar: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "int", nullable: true })
    genderId: number;

    @Column({ type: "int" })
    creatorId: number;

    @Column({ type: "boolean", default: false })
    isDeleted: boolean;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Gender)
    gender: Gender;

    @ManyToOne(() => User)
    creator: User;
}
