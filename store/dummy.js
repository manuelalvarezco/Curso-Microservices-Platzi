const db = {
    'users': [
        { id: 1, name: 'Manuel' }
    ]
}

const list = (table) =>{
    return db[table] || [];
}
const get = (table, id) =>{
    let col = list(table);
    return col.filter(item => item.id === id[0]) || null;
}
const upsert = (table, data) =>{
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);

    console.log(db);
}

const remove = (table, id) =>{
    return true;
}

const query = async (table, q) => {
    let col = await list(table);
    let keys = Object.keys(q);
    const key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}