export { };
const mongoose = require('mongoose');
const dbHandler = require('./utils/db-handler');
const recordsService = require('../src/resolvers/mutations/records');
const { RecordModel } = require('../src/models/Record');
const { UserModel } = require('../src/models/User');

const { signUpCommand, signInCommand, addShopCommand, addUserToShopCommand } = require('./utils/commands')

const user = { email: 'test@mail.com', password: '12345' }
let currentUser: any

beforeAll(async () => {
    await dbHandler.connect();
    const signedUser = await signUpCommand(user);
    await addShopCommand('TestShop', signedUser.user)
    await UserModel.findById(signedUser.user.id)
    currentUser = await UserModel.findById(signedUser.user.id)

});
afterAll(async () => await dbHandler.closeDatabase());

describe('Records', () => {
    it('Adds record preperly', async () => {
        const result = await recordsService.addRecord('', { data }, { currentUser });
        expect(result).toMatchObject(data)
    });

    it('Throws error when user does not belong to any shop', async () => {
        await expect(recordsService.addRecord('', { data }, { currentUser: userNoShop }))
            .rejects.toThrowError(mongoose.Error.ValidationError)
    });

    it('Throws error when user is invalid', async () => {
        await expect(recordsService.addRecord('', { data }, {}))
            .rejects.toThrow('Invalid user')
    });

    it('Edits record properly', async () => {
        const record = await RecordModel.findOne({ title: data.title })
        const result = await recordsService.editRecord('', { id: record.id, data: newData }, { currentUser });
        expect(result).toMatchObject(newData)
    });

    it('Throws error when ID is invalid', async () => {
        await expect(recordsService.editRecord('', { id: '5f0e40598af527996f888ff1', data }, { currentUser }))
            .rejects.toThrow('Record does not exist')
    });
});

const data = {
    artist: 'Singer',
    title: 'Song',
    status: 'sold',
    label: 'Records',
    condition: 'M',
    genre: 'Style',
    price: 99,
    year: 1999,
    notes: 'Nothing to say',
    img_uri: 'Cover URL'
}

const newData = {
    artist: 'NewSinger',
    title: 'NewSong',
    status: 'sold',
    label: 'NewRecords',
    condition: 'M',
    genre: 'NewStyle',
    price: 11,
    year: 2000,
    notes: 'Nothing to say',
    img_uri: 'new Cover URL'
}

const userNoShop = {
    id: '00000000',
    email: 'test@mail.com',
}