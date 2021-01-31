const authService = require('../../src/resolvers/mutations/auth');
const shopService = require('../../src/resolvers/mutations/shop');

export async function signUpCommand(user: { email: string, password: string, name: string }) {
    return await authService.signUp('', user);
}

export async function signInCommand(user: { email: string, password: string }) {
    return await authService.signIn('', user);
}

export async function addShopCommand(name: string, currentUser: any) {
    return await shopService.addShop('', { name }, { currentUser })
}

export async function addUserToShopCommand(email: string, role: string, currentUser: any) {
    return await shopService.addUserToShop('', { email, role }, { currentUser })
}