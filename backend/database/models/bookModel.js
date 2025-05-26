const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const bookModel = (sequelize, DataTypes)=>{
    const Book = sequelize.define('book',{
        bookName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookPrice: {
            type: DataTypes.FLOAT
        },
        bookGenre:{
            type: DataTypes.STRING
        },
        bookAuthor:{
            type: DataTypes.STRING
        },
        bookCover:{
            type: DataTypes.STRING
        }

    })
    return Book
}

module.exports = bookModel