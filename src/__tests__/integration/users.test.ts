import request from 'supertest';
import app from '../../app';
import createConnection from '../../database';
import generateJWT from '../../utils/generateAuthToken';

describe("Users", () => {
    const token = generateJWT(1);

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

    it("should be able to create a user", async () => {
        const response = await request(app)
        .post("/users")
        .send(users[0])
        
        expect(response.status).toBe(201);
    })

    it("should be able to fetch a list of users", async () => {
        const response = await request(app)
        .get("/users")
        .auth(token, { type: 'bearer' })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
    })

    it("should be able to search for a user by id", async () => {
        const responseCreate = await request(app)
        .post("/users")
        .send(users[1]);

        const id = responseCreate.body.user.id;
        
        const response = await request(app)
        .get(`/users/${id}`)
        .auth(token, { type: 'bearer' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    })

    it("should not be able to fetch a user with an invalid id", async () => {
        const response = await request(app)
        .get("/users/999")
        .auth(token, { type: 'bearer' });

        expect(response.status).toBe(404);
    })

    it("should be able to edit a user", async () => {
        const responseCreate = await request(app)
        .post("/users")
        .send(users[2]);

        const userId = responseCreate.body.user.id;
        
        const updateUser = {
            ...users[2],
            email: 'user00003@gmail.com',
            name: "User 00003",
            city: "Bahia",
            birth_date: "1994-10-20 00:01:00"
        }

        delete updateUser.password;

        const responseUpdate = await request(app)
        .put(`/users/${userId}`)
        .auth(token, { type: 'bearer' })
        .send(updateUser);

        expect(responseUpdate.status).toBe(200);
        expect(responseUpdate.body).toMatchObject(updateUser);
    })

    it("should not be able to edit a user with an invalid id", async () => {
        
        let updateUser = {
            ...users[2],
            email: 'user3333@gmail.com',
            name: "User 3333",
            city: "Ceará",
            birth_date: "1992-12-31 00:01:00"
        }

        delete updateUser.password;

        const response = await request(app)
        .put("/users/999")
        .auth(token, { type: 'bearer' })
        .send(updateUser);

        expect(response.status).toBe(404);
    })
})