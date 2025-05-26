import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/Navbar'

const SinglePage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
    const {id} = useParams()
    const [book, setBook] = useState({})
      const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
  const token = localStorage.getItem('token');


    const fetchBook = async ()=>{
        try{
            const response = await axios.get(`${API_URL}/books/${id}`,{
           headers: {
        Authorization: token,
      }
        })
            console.log(id)
            if(response.status == 200){
                setBook(response.data.singleBook)
            }
        }catch(err){
            alert(`Error ${err}`)
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchBook()
        
    }, [])

    const handleDelete= async(e)=>{
       try{
            // e.preventDefault()
            setLoading(true)
            const response = await axios.delete(`${API_URL}/books/${id}`,{
           headers: {
        Authorization: token,
      }
        })
            if(response.status == 200 || response.status == 201){
                navigate('/')
            }
        }catch(err){
            alert(`Error ${err}`)
            console.log(err)
        }finally{
            setLoading(false)
        }
        
    }

  return (
        <div>
            <Navbar/>
     <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
      
      {/* Book cover */}
      <div className="w-full md:w-1/2 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={book.bookCover || "https://openbookcollective.org/static/img/cover-placeholder.jpg"}
          alt="Book Cover"
          className="object-contain w-full h-full max-h-[400px]"
        />
      </div>

      {/* Book info */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 justify-between">
        
        {/* Title */}
        <div className="bg-gray-200 rounded-md p-2 text-2xl md:text-3xl font-extrabold text-center">
          {book.bookName}
        </div>

        {/* Author, Genre, Price */}
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
          <div>
            <p className="text-xl font-semibold">By {book.bookAuthor}</p>
            <p className="text-md">#{book.bookGenre}</p>
          </div>
          <p className="text-3xl font-bold mt-2 md:mt-0">NPR {book.bookPrice}/-</p>
        </div>

        {/* Description */}
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-gray-800">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quae numquam corporis!</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
            <Link to={`/edit-page/${id}`}>
          <button
            className="flex w-28 justify-center px-3 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Edit Book
          </button>
            </Link>
          <button onClick={handleDelete}
            className="flex items-center px-3 justify-center w-28 text-center bg-black text-white py-2 rounded hover:bg-red-700 transition"
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
                "Delete Book"
              )}
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SinglePage