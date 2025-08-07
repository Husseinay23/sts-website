import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import CartDrawer from './CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {!isAdminPage && <Header />}
      <main className={!isAdminPage ? 'pt-20' : ''}>{children}</main>
      {!isAdminPage && <CartDrawer />}
    </div>
  );
};

export default Layout;