import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Characters from '../pages/Characters';
import SingleCharacter from '../pages/SingleCharacter';
import SingleLocation from '../pages/SingleLocation';
import SingleEpisode from '../pages/SingleEpisode';
import MainLayout from '../layouts/MainLayout';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {user && (
        <Route element={<MainLayout />}>
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<SingleCharacter />} />
          <Route path="/location/:id" element={<SingleLocation />} />
          <Route path="/episode/:id" element={<SingleEpisode />} />
          <Route path="*" element={<Navigate to="/characters" />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
