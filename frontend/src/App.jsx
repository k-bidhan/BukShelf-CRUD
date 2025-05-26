import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBook from './pages/AddBook';
import SinglePage from './pages/SinglePage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* protected routes */}
        <Route path='/' element={
          <PrivateRoute>
            <HomePage/>
          </PrivateRoute>
        }/>
        <Route path='/add-page' element={
          <PrivateRoute>
            <AddBook/>
          </PrivateRoute>
        }/>
        <Route path='/single-page/:id' element={
          <PrivateRoute>
            <SinglePage/>
          </PrivateRoute>
        }/>
        <Route path='/edit-page/:id' element={
          <PrivateRoute>
            <EditPage/>
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
