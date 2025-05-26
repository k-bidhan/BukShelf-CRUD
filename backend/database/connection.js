const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("postgresql://postgres.lfyulbnenclxwmmyirtm:g7U7GC1epL3VTuW5@aws-0-us-east-2.pooler.supabase.com:6543/postgres")

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