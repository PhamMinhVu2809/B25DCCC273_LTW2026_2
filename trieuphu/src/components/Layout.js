import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <>
    <header className="site-header">
      <div className="header-inner">
        <NavBar />
      </div>
    </header>
    <main className="page-shell"><Outlet /></main>
    <footer className="footer-note">TH02 · Lập trình Web · Ai là triệu phú</footer>
  </>
);

export default Layout;
