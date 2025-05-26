const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

sequelize.authenticate()
.then(()=>{
    console.log('Authenticated!')
})
.catch((err)=>{
    console.log('Error', err)
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.books = require('../database/models/bookModel')(sequelize, DataTypes)

sequelize.sync({force: false}).then(()=>{
    console.log('Migrated successfully!')
})

module.exports = db