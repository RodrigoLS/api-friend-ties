import request from 'supertest';
import app from '../../app';
import createConnection from '../../database';

describe("Authentication", () => {

    const users = [
        {
            email: "user01@gmail.com",
            password: "123456",
            name: "User 01",
            city: "São Paulo",
            birth_date: "1998-11-28 00:01:00"
        },
        {
            email: "user02@gmail.com",
            password: "123456",
            name: "User 02",
            city: "Rio de Janeiro",
            birth_date: "1976-09-27 00:01:00"
        },
        {
            email: "user03@gmail.com",
            password: "123456",
            name: "User 03",
            city: "Minas Gerais",
            birth_date: "2000-01-09 00:01:00"
        }
    ]

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("should be able to authenticate", async () => {
        await request(app)
        .post("/users")
        .send(users[0])

        const response = await request(app)
        .post("/auth")
        .send({
            email: users[0].email,
            password: users[0].password
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('user');
    })

    it("should not be able to authenticate with invalid email", async () => {
        request(app)
        .post("/users")
        .send(users[1])


        const response = await request(app)
        .post("/auth")
        .send({
            email: 'incorrect_email@gmail.com',
            password: users[1].password
        })

        expect(response.status).toBe(401);
    })

    it("should not be able to authenticate with invalid password", async () => {
        request(app)
        .post("/users")
        .send(users[2])


        const response = await request(app)
        .post("/auth")
        .send({
            email: users[2].email,
            password: 'incorrect_password'
        })

        expect(response.status).toBe(401);
    })
})