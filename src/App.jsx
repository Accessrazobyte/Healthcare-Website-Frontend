import { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './Components/MainRoute/MainRoute';
import { AuthProvider } from './Components/MainRoute/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </AuthProvider>
  </>
  );
}

export default App;
