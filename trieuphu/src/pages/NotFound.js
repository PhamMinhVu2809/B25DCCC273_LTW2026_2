import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="panel">
    <h1>404 - Không tìm thấy trang</h1>
    <p>Địa chỉ bạn truy cập không tồn tại.</p>
    <Link to="/">Về trang chủ</Link>
  </section>
);

export default NotFound;
