module.exports = {
    database: {
        client: 'sqlite3',
        connection: {
            filename: './data.db',
            flags: ['OPEN_READWRITE']
        },
        useNullAsDefault: true,
    },
    cache: {
        stdTTL: 86400,
        checkperiod: 1,
    },
    bot: {
        polling: true
    }
}