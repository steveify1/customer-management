import { Exclude, Expose } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enum/role.enum";
import { compareStringViaHash, hashString } from "../utils/string.utils";



export enum Status {
    PENDING = 'PENDING',
    UNVERIFIED = 'UNVERIFIED',
    VERIFIED = 'VERIFIED'
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    firstName:string;

    @Column({ type: 'varchar' })
    lastName:string;

    @Column({ type: 'varchar', default: null })
    avatar: string;

    @Column({ type: "varchar", unique: true})
    email: string;

    @Column({ type: "uuid", nullable: true })
    genderId: string;

    @Column({type: "varchar", nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar', default: UserRole.CUSTOMER })
    role: UserRole;

    @Exclude()
    @Column({ type: "varchar", nullable: true})
    confirmationToken: string;

    @Exclude()
    @Column({type: "varchar", nullable: true})
    password: string;

    @Exclude()
    @Column('boolean', {default: false})
    active: boolean;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if(this.password ) {
            this.password = await hashString(this.password);
        } 
    }

    async comparePassword(password: string): Promise<boolean> {
        return await compareStringViaHash(this.password, password)
    }

}