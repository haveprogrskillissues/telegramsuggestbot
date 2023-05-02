const config = require('./config')
const db = require('knex')(config.database);

exports.userData = class userData {
    constructor(userId = 0, message) {
        this.user_id = userId,
        this.first_name = message?.from?.first_name,
        this.last_name = message?.from?.last_name,
        this.is_admin = false
    }
}

exports.userDataArray = Object.keys(new userData())

exports.addUser = (userId, message) => {
        return db('users').insert(
            [new userData(userId, message)]
        )
},
exports.getUser = (userId) => {
        return db('users')
        .select(userDataArray)
        .where(userDataArray[0], userId)
}