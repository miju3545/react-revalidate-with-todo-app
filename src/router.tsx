import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signup';
import TodoList from './pages/todoList';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
