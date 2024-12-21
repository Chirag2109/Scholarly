import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;