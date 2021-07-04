import client from '../loaders/redis';

export default class UsersModel {
    static instance
    static getInstance () {
        if (!UsersModel.instance) {
            UsersModel.instance = new UsersModel()
        }
        return UsersModel.instance
    }
    findKeyByEmail = async (email) => {
        const reply = await client.keys(`user_*_${email}`);
        return reply
    }
    findByKey = async (key) => {
        const reply = await client.get(key);
        return reply
    }
    createUser = async (email, uuid, data) => {
        const reply = await client.set(`user_${uuid}_${email}`, JSON.stringify(data));
        return reply
    }
}
