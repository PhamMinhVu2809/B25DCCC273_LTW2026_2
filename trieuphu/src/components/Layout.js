import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
export const Layout = () => <div className="app"><nav className="nav"><NavLink to="/" end>Trang chủ</NavLink><NavLink to="/questions">Ngân hàng câu hỏi</NavLink><NavLink to="/history">Lịch sử</NavLink></nav><Outlet /></div>;
