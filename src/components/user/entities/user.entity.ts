import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enum/role.enum";
import { compareStringViaHash, hashString } from "../utils/string.utils";

@Entity("users")
export class User {
    @PrimaryColumn({ primary: true, generated: true })
    id: number;

    @Column({ type: 'varchar' })
    firstName:string;

    @Column({ type: 'varchar' })
    lastName:string;

    @Column({ type: 'varchar', default: null })
    avatar: string;

    @Column({ type: "varchar", unique: true})
    email: string;

    @Column({ type: 'varchar', default: UserRole.ADMIN })
    role: UserRole;

    @Exclude()
    @Column({type: "varchar", nullable: true})
    password: string;
    
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
