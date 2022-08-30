const auth = require('../auth');

const TABLE = 'users';

module.exports = function(injectedStore, injectedCache){
    let store = injectedStore;
    let cache = injectedCache;

    if(!store){
        store = require('../../../store/dummy');
    }

    if(!cache){
        cache = require('../../../store/dummy');
    }

    const list = async () => {
        let users = await cache.list(TABLE);

        if (!users) {
            console.log('No estaba en caché. Buscado en DB')
            users = await store.list(TABLE);
            cache.upsert(TABLE, users);
        } else {
            console.log('Nos traemos datos de cache');
        }
        
        return users;
    }
    const get = async (id) => {
        return await store.get(TABLE, id )
    }
    
    const upsert = async (body) => {

        const user = {
            name: body.name,
            username: body.username
        }

        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLE, user);
    }

    const follow = (user_from, user_to)=> {
        return store.upsert('user_follow', {user_from, user_to} )
    }

    return {
        list,
        get,
        upsert,
        follow
    }
}