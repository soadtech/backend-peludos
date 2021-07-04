import client from '../loaders/redis'

export default class UsersModel {
    static instance
    static getInstance () {
        if (!UsersModel.instance) {
            UsersModel.instance = new UsersModel()
        }
        return UsersModel.instance
    }
    findByEmail = async (email) => {
        const reply = await client.get(`user_${email}`);
        return reply
    }
}
