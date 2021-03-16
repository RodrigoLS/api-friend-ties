import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";

@Entity("posts")
class Post {
    @PrimaryColumn("int")
    id: number;

    @Column("int")
    user_id: number;

    @Column()
    description: string;

    @Column()
    media: string;

    @Column()
    type: string;

    @Column()
    fileName: string;

    @Column("timestamp")
    createdAt: Date;
}

export default Post;