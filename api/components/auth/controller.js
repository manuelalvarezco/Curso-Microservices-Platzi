const auth = require('../../../auth')
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');
const TABLE = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;

    const login = async (username, password) => {
        const data = await store.query(TABLE, {username})

        if(!bcrypt.compareSync(password, data.password)){
            throw error('Not allowed!', 401)
        }

        return auth.sign({...data});

    }



    const upsert = async (data) => {
        const authData = {}

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hashSync(data.password, 10);
        }

        return await store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    };
};