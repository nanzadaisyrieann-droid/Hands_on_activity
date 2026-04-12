//tests/authMiddleware.tests.js

const {protect} = require('../src/middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../src/models/userModel');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');
jest.mock('../src/models/userModel');

describe('Auth Middleware - protect', () =>{
    let req,res, next;

    beforeEach(() =>{
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn(); // Create a fake 'next' function
    });

    it('should call next() if token is valid', async() =>{
        // Arrange: Setup a valid token and mock the JWT verification and User lookup
        req.headers.authorization = 'Bearer valid_fake_token';
        jwt.verify.mockReturnValue({id: 'user123'});

        User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue({id: 'user123', name: 'Daisy'}) });

        // Act: Call the protect middleware
        await protect(req,res,next);

        //Assert
        expect(jwt.verify).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1); //It successfully movedto the next function!
});

it('should return 401 if no token is provided', async () =>{
    //Arrange: Leave req.headers empty

    //Act
    await protect(req,res,next);

    //Assert
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toStrictEqual({message: 'Not authorized, no token'});
    expect(next).not.toHaveBeenCalled(); // It blocked the user!
});
});