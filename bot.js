const config = require('./config')

const database = require('./database')
const nodeCache = require('node-cache')
const cache = new nodeCache(config.cache)

const telegramApi = require('node-telegram-bot-api')
const bot = new telegramApi(process.env.TELEGRAM_API_TOKEN, config.bot)

bot.on('message', async (message) => {
    const userId = message.from.id
    const firstName = message.from.first_name
    const lastName = message.from.last_name
    const checkCache = cache.get(userId)
    const localUserData = new database.userData(userId, message)
    console.log(localUserData)

    if (checkCache === undefined) {
        database.getUser(userId)
        .then(data => {
            if (Object.keys(data).length > 0) 
                cache.set(userId, data[0])
            return data
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                database.addUser(userId, message).then()
                cache.set(userId, localUserData)
            }
        })
    } else {
        cache.ttl(userId)
    }
    console.log("\nCache info from message: ", cache.get(userId)) //DEBUG
})