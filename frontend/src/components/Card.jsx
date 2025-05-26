import React from 'react';
import { Link, useParams } from 'react-router-dom';

const BookCard = ({ book }) => {
  const id = book.id
  
  return (
    <div className="max-w-xs min-w-[290px] bg-white rounded-lg shadow-xl transition-all ease duration-300 hover:scale-105 group overflow-hidden border border-gray-200 m-4">
      <div className="bg-gray-200 h-[300px] flex justify-center items-center rounded-t-lg overflow-hidden">
        <img
          src={book.bookCover || "https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?semt=ais_hybrid&w=740"}
          alt="Book Cover"
          className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-90"
        />
      </div>

      <div className="px-4 py-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 break-words">{book.bookName}</h3>
            <p className="text-sm text-gray-600 break-words">By {book.bookAuthor}</p>
          </div>
          <span className="text-lg font-mono text-gray-900 whitespace-nowrap">NPR {book.bookPrice}/-</span>
        </div>

        <div className="mt-2">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            #{book.bookGenre}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <Link to={`/single-page/${id}`}>
        <button className="w-full bg-black text-white text-sm py-2 rounded-md hover:bg-gray-800 transition">
          View More
        </button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
