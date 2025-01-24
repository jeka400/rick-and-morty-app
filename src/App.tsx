import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Characters from './pages/Characters';
import SingleCharacter from './pages/SingleCharacter';
import SingleLocation from './pages/SingleLocation';
import SingleEpisode from './pages/SingleEpisode';
import Header from './components/Header';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <QueryClientProvider client={ queryClient }>
      <Router>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

const MainApp: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      { user && <Header /> }

      <Routes>
        { user ? (
          <>
            <Route path="/characters" element={ <Characters /> } />
            <Route path="/characters/:id" element={ <SingleCharacter /> } />
            <Route path="/location/:id" element={ <SingleLocation /> } />
            <Route path="/episode/:id" element={ <SingleEpisode /> } />
            <Route path="*" element={ <Navigate to="/characters" /> } />
          </>
        ) : (
          <>
            <Route path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="*" element={ <Navigate to="/login" /> } />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
