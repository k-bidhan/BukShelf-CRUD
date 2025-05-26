import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";
import { use } from "react";

const AddBook = () => {
  const placeholderCover =
    "https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?semt=ais_hybrid&w=740";
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const token = localStorage.getItem('token');

  const [book, setBook] = useState({});

  const fetchBook = async (e) => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`,{
           headers: {
        Authorization: token,
      }
        });
      if (response.status == 200) {
        setBook(response.data.singleBook);
        // console.log(response.data.singleBook)
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const updateBook = async (e) => {
    try {
        e.preventDefault()
      setLoading(true);
      const response = await axios.patch(`http://localhost:3000/books/${id}`,book,{
           headers: {
        Authorization: token,
      }
        });
      if (response.status == 200 || response.status == 201) {
        setShowToast(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-8 flex justify-center h-fit lg:max-h-screen">
      {showToast && (
        <Toast
          message={"Book Edited Successfully!"}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="w-full max-w-2xl max-h-3xl bg-white/70 backdrop-blur-sm shadow-sm  border-gray-200 rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">
          Update Your Book
        </h1>

        <form onSubmit={updateBook} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Book Name
              </label>
              <input
                type="text"
                name="bookName"
                onChange={handleChange}
                maxLength={30}
                value={book.bookName}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="e.g., The Alchemist"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="bookAuthor"
                value={book.bookAuthor}
                maxLength={20}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="e.g., Paulo Coelho"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="bookGenre"
                value={book.bookGenre}
                maxLength={15}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="e.g., Fiction"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                onChange={handleChange}
                name="bookPrice"
                value={book.bookPrice}
                max={9999}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="e.g., 9.99"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Book Cover URL
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="bookCover"
              value={book.bookCover}
              maxLength={120}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="w-full flex justify-center mt-4">
            <div className="w-40 h-60 bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src={book.bookCover || placeholderCover}
                alt="Book Cover Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black flex items-center justify-center text-white text-sm font-semibold w-25 py-2 rounded hover:bg-gray-900 transition"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Update Book"
              )}
            </button>
            {loading ? (
              <button
                className="bg-gray-100 text-gray-500 cursor-not-allowed text-sm font-semibold px-7 py-2 rounded transition"
                disabled
              >
                Home
              </button>
            ) : (
              <Link to="/">
                <button className="bg-white text-black border border-gray-300 text-sm font-semibold px-7 py-2 rounded transition hover:bg-gray-100">
                  Home
                </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
