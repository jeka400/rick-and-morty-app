import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Characters from './pages/Characters';
import SingleCharacter from './pages/SingleCharacter';
import SingleLocation from './pages/SingleLocation';
import SingleEpisode from './pages/SingleEpisode';
import Header from './components/Header';

interface IPrivateRouteProps  {
  children: React.ReactNode
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Link to="/login" />
}

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
      <QueryClientProvider client={ queryClient }>
        <Router>
          
          <PrivateRoute>
            <Header />
          </PrivateRoute>

          <Routes>

            <Route path='/login' element={ <Login /> } />

            <Route path='/signup' element={ <Signup />} />

            <Route path='/characters' element={
              <PrivateRoute>
                <Characters />
              </PrivateRoute> 
            }/>

            <Route path='/characters/:id' element={ 
              <PrivateRoute>
                <SingleCharacter /> 
              </PrivateRoute> 
            } />

            <Route path='/location/:id' element={ 
              <PrivateRoute>
                <SingleLocation /> 
              </PrivateRoute> 
            } />

            <Route path='/episode/:id' element={ 
              <PrivateRoute>
                <SingleEpisode /> 
              </PrivateRoute>
            } />

          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;