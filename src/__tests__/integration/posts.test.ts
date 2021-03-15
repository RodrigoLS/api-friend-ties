import request from 'supertest';
import app from '../../app';
import createConnection from '../../database';

describe("Posts", () => {
    let token: string = null;

    const users = [
        {
            email: "user01@gmail.com",
            password: "123456",
            name: "User 01",
            city: "São Paulo",
            birth_date: "1998-11-28 00:01:00"
        }
    ]

    const posts = [
        {
            user_id: null,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            media: ''
        }
    ]

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();

        await request(app)
        .post("/users")
        .send(users[0])

        const response = await request(app)
        .post("/auth")
        .send({
            email: users[0].email,
            password: users[0].password
        })

        token = response.body.token;
    })


    it("should be able to create a post", async () => {
        const response = await request(app)
        .post("/posts")
        .send({

        })
    })


})