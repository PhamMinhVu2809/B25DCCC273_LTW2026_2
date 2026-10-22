import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <>
    <NavLink to="/" end className="brand">Ai là triệu phú</NavLink>
    <nav className="nav-links" aria-label="Điều hướng chính">
      <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Trang chủ</NavLink>
      <NavLink to="/questions" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Lịch sử</NavLink>
    </nav>
  </>
);

export default NavBar;
