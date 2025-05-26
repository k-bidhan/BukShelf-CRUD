const { response } = require("express")
const { books } = require("../database/connection")

exports.fetchBooks = async (req,res)=>{
    try{
        const bookData = await books.findAll()
        console.log(bookData)
    
        res.json({
            response: "Books fectched successfully!",
            bookData
        })
    }catch (error) {
    res.status(500).json({
      response: "Failed to fetch book",
      error: error.message,
    });

}}

exports.addBook = async (req,res)=>{
    try{

        const {bookName, bookPrice, bookAuthor, bookGenre, bookCover} =  req.body
        await books.create({
            bookName,
            bookPrice,
            bookAuthor,
            bookGenre,
            bookCover
        })
        res.json({
            response: "Booka added successfully!"
        })
    }
    catch (error) {
    res.status(500).json({
      response: "Failed to fetch book",
      error: error.message,
    });}
}

exports.deleteBook =async (req,res)=>{
    try{

        const id = await req.params.id
       await books.destroy({
            where:{
                id
            }
        })
        res.json({
            response: "Book deleted successfully!"
        })
    }catch (error) {
    res.status(500).json({
      response: "Failed to fetch book",
      error: error.message,
    });}
}

exports.updateBook =async (req,res)=>{
    try{

        const id = req.params.id
        const {bookName, bookPrice, bookAuthor, bookGenre, bookCover} = req.body
        await books.update({
            bookName,
            bookPrice,
            bookAuthor,
            bookGenre,
            bookCover
        },{
            where:{
                id
            }
        })
    
        res.json({
            response: "Book updated successfully!"
        })
    }catch (error) {
    res.status(500).json({
      response: "Failed to fetch book",
      error: error.message,
    });}
}

exports.fetchSingleBook =async (req,res)=>{
    try{

        const id = await req.params.id
        const singleBook = await books.findByPk(id)
        res.json({
            response: "Book fetched successfully!",
            singleBook
        })
    }catch (error) {
    res.status(500).json({
      response: "Failed to fetch book",
      error: error.message,
    });}
}