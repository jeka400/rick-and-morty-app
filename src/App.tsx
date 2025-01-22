import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Characters from './pages/Characters';
import SingleCharacter from './pages/SingleCharacter';
import SingleLocation from './pages/SingleLocation';
import SingleEpisode from './pages/SingleEpisode';

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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <Signup />} />
            <Route path='/characters' element={ <Characters /> }/>
            <Route path='/characters/:id' element={ <SingleCharacter /> } />
            <Route path='/location/:id' element={ <SingleLocation /> } />
            <Route path='/episode/:id' element={ <SingleEpisode /> } />
          </Routes>
        </Router>
        </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;