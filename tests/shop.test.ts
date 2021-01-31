export { };
const dbHandler = require('./utils/db-handler');
const shopService = require('../src/resolvers/mutations/shop');
const { ShopModel } = require('../src/models/Shop');
const { signUpCommand, addShopCommand, addUserToShopCommand } = require('./utils/commands')

const user = { email: 'test@mail.com', password: '12345' }
let currentUser = {}

beforeAll(async () => {
    await dbHandler.connect();
    const signedUser = await signUpCommand(user);
    currentUser = signedUser.user
});
afterAll(async () => await dbHandler.closeDatabase());

describe('Shop', () => {
    it('Creates shop properly', async () => {
        // const result = await addShopCommand(shop.name, currentUser);
        // expect(result).toBeTruthy
    });


});

const shop = {
    name: 'Test'
}