import { MyCalendar } from "./pages/Calendar/calendar"; //calendar component
import { Home } from "./pages/Home"; //HomePage component
import { Navbar } from "./pages/navbar"; //navbar component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./pages/ProtectedRoute";

import { Login } from "./pages/account/login"; //login component
import { Admin } from "./pages/account/admin"; //admin component

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();
  return (
    <div className="">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            {/* home*/}
            <Route path="/" element={<Home />} />
            {/*login */}
            <Route path="/connecter" element={<Login />} />
            {/*calendar and use protected route for only users of employer route */}
            <Route
              path="/Calendrier"
              element={
                <ProtectedRoute
                  element={<MyCalendar />}
                  allowedRoles={["employer", "admin"]}
                />
              }
            />
            {/*admin and use protected route for only user with admin role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute element={<Admin />} allowedRoles={["admin"]} />
              }
            />

            <Route path="*" element={<h1>page not available</h1>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
