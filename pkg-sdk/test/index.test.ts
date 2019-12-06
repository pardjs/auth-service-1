import { AuthClient } from "../src"

describe('test sdk', () => {
    let authClient: AuthClient
    beforeAll(() => {
        authClient = new AuthClient({baseUrl: 'http://localhost:5000/'})
    })
    it('should login-by-ip success', async () => {
        const res = await authClient.loginByIp();
        expect(res.token).not.toBe('')
        expect(res.expiresIn).not.toBeLessThan(10)
        expect(typeof res.userId).toBe('number')
    })

    it('should register access point success', async () => {
        expect.assertions(1)
        await authClient.registerAuthPoints([{name: 'TEST', displayName: 'for test'}])
        expect(1).toBe(1)
    })
})