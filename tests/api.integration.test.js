
const request = require('supertest');
const app = require('../server');
const dbHelper = require('./dbHelper');
const Dish = require('../src/models/dishModel');

process.env.JWT_SECRET = 'kahit_anong_pass';

jest.setTimeout(60000); // Tinaasan natin dahil Atlas ang gamit

beforeAll(async () => await dbHelper.connect());
afterEach(async () => await dbHelper.clearDatabase());
afterAll(async () => await dbHelper.closeDatabase());

describe('Integration Test: Dish API', () => {

    // Helper to get admin token
    const getAdminToken = async () => {
        // 1. Register an admin user
        await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Admin User',
                email: 'admin@test.com',
                password: 'password123',
                role: 'admin'
            });

        // 2. Login to get token
        const loginRes = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'admin@test.com',
                password: 'password123'
            });

        // I-verify kung nakuha ang token, kung hindi, i-log ang error
        if (!loginRes.body.token) {
            console.error("Login Failed Body:", loginRes.body);
        }

        return loginRes.body.token;
    };

    it('POST /api/v1/dishes - should physically save a dish to the database', async () => {
        const token = await getAdminToken();

        const newDish = {
            name: 'Integration Burger',
            price: 250,
            category: 'Main'
        };

        const response = await request(app)
            .post('/api/v1/dishes')
            .set('Authorization', `Bearer ${token}`) 
            .send(newDish);

        // Debugging log kung sakaling 401 pa rin
        if (response.statusCode === 401) {
            console.log("POST failed with 401. Token used:", token);
            console.log("Error Message:", response.body);
        }

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Integration Burger');

        const savedDish = await Dish.findOne({ name: 'Integration Burger' });
        expect(savedDish).toBeTruthy();
        expect(savedDish.price).toBe(250);
    });

    it('GET /api/v1/dishes - should return an empty array if DB is empty', async () => {
        const response = await request(app).get('/api/v1/dishes');

        expect(response.statusCode).toBe(200);
        // Siguraduhin na array ang nirereturn ng API mo
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });

});