import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Domain, Home, Offer, Message } from './pages';
import { checkAuth } from './services/authService';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
          {/* <Route path='/login' element={!isAuthenticated ?  : <Navigate to={'/'}/> } /> */}
          <Route path='/' element={isAuthenticated ? <Home/> : <Login />}>
            <Route index element={<Domain />} />
            <Route path='offers' element={<Offer />}/>
            <Route path='messages' element={<Message />}/>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
