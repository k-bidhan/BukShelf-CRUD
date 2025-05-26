const { fetchBooks, updateBook, addBook, deleteBook, fetchSingleBook } = require("../controllers/bookController");

const router = require('express').Router()

router.route('/').get(fetchBooks).post(addBook)
router.route('/:id').patch(updateBook).delete(deleteBook).get(fetchSingleBook)

module.exports = router