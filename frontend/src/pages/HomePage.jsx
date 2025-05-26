import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo.png";
import axios from "axios";
import Navbar from "../components/Navbar";
const HomePage = () => {
  const [books, setBooks] = useState({});
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/books", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        setBooks(response.data.bookData);
        setFilteredBooks(response.data.bookData);
        console.log(response.data.bookData);
      } else {
        alert("API Error");
        console.error();
      }
    } catch(error) {
      console.error(error);
      alert("ERROR IN FUNCTION");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = books.filter((book) => {
      return book.bookName.toLowerCase().includes(query);
    });
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-full min-h-[120vh]">
      <Navbar />
      {/* Hero text  */}

      <div
        style={{ fontFamily: "serif" }}
        className=" w-full text-center font-extrabold text-[3rem] px-4 selection:bg-black selection:text-white"
      >
        Keep{" "}
        <span
          className="inline-block bg-gradient-to-r from-gray-800 via-white to-gray-800 bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "gradientShine 3s ease-in-out infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Track
        </span>{" "}
        of Your{" "}
        <span
          className="inline-block bg-gradient-to-r from-gray-800 via-white to-gray-800 bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "gradientShine 3s ease-in-out infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Books
        </span>{" "}
        in One Place
        <style>
          {`
      @keyframes gradientShine {
        0%, 100% {
          background-position: 200% center;
        }
        50% {
          background-position: 0% center;
        }
      }
    `}
        </style>
      </div>

      {/* Search Bar and add book  */}
      <div className="">
        <SearchBar
          onChange={handleSearch}
          placeholder={"Search your books..."}
          value={search}
        />
      </div>
      {/* Cards container  */}
      <div className="px-3 py-1 flex flex-wrap w-full h-fit justify-evenly">
        {loading ? (
          <span
            className="inline-block text-4xl mt-30 font-bold bg-gradient-to-r from-gray-800 via-white to-gray-800 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% 100%",
              animation: "gradientShine 3s ease-in-out infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LOADING YOUR BOOKS
          </span>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            return <Card key={book.id} id={book.id} book={book} />;
          })
        ) : (
          <h3 className="text-gray-700 text-lg mt-10 font-medium">
            No books found
          </h3>
        )}
      </div>
    </div>
  );
};

export default HomePage;
