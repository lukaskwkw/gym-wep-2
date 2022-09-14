import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, NoMatch } from '../App';

export const ShellBody = () => {
  return <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />

    <Route path="*" element={<NoMatch />} />
  </Routes>;
}
