import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrybt from 'bcrypt';

@Entity('users')
class User {
    @PrimaryColumn("int")
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column('timestamp')
    birth_date: Date;

    @Column()
    profile_photo: string;

    @Column()
    background_photo: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrybt.hashSync(this.password, 8);
    }
}

export default User;