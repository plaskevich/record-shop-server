export { };
const dbHandler = require('./utils/db-handler');
const authService = require('../src/resolvers/mutations/auth');
const { UserModel } = require('../src/models/User');
const { signUpCommand, signInCommand } = require('./utils/commands')

beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());

describe('Auth', () => {
    it('Signs up properly', async () => {
        const result = await signUpCommand(newUser);
        expect(result).toHaveProperty('token')
        expect(result).toHaveProperty('user')
        const userId = result.user.id

        const createdUser = await UserModel.findById(userId);
        expect(createdUser.email).toBe(newUser.email);
        expect(createdUser.name).toBe(newUser.name);
    });

    it('Can sign up without name', async () => {
        const result = await signUpCommand(newUserWithoutName);
        expect(result).toHaveProperty('token')
        expect(result).toHaveProperty('user')
        const userId = result.user.id

        const createdUser = await UserModel.findById(userId);
        expect(createdUser.email).toBe(newUserWithoutName.email);
    });

    it('Throws error when email or password missing on sign up', async () => {
        await expect(authService.signUp('', { email: newUser.email }))
            .rejects
            .toThrow('Password missing');
        await expect(authService.signUp('', { password: newUser.password }))
            .rejects
            .toThrow('Email missing');
    });

    it('Signs in properly', async () => {
        const result = await signInCommand({ email: newUser.email, password: newUser.password });

        expect(result).toHaveProperty('token')
        expect(result).toHaveProperty('user')
    });

    it('Throws error when email or password missing on sign in', async () => {
        await expect(signInCommand({ email: newUser.email }))
            .rejects
            .toThrow('Password missing');
        await expect(signInCommand({ password: newUser.password }))
            .rejects
            .toThrow('Email missing');
    });

    it('Throws error when trying to sign in with incorrect user', async () => {
        await expect(signInCommand({ email: 'email', password: 'password' }))
            .rejects
            .toThrow('Incorrect credentials');
    });

    it('Throws error when trying to sign in with incorrect password', async () => {
        await expect(signInCommand({ email: newUser.email, password: 'password' }))
            .rejects
            .toThrow('Incorrect credentials');
    });
});

const newUser = {
    email: 'newuser@test.com',
    password: '12345',
    name: 'New User'
};
const newUserWithoutName = {
    email: 'noname@test.com',
    password: '12345',
};