import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup />} />
          <Route path='/characters' />
          <Route path='/characters/:id' />
          <Route path='/location/:id' />
          <Route path='/episode/:id' />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
