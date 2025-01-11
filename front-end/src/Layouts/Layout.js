import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import "./App.css";
export default function Layout() {
  return (
    <>
      <main className="Outlet">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}
