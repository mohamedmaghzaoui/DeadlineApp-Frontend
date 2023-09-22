import { MyCalendar } from "./pages/Calendar/calendar";
import { Home } from "./pages/Home";
import { Navbar } from "./pages/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./pages/ProtectedRoute";

import { Login } from "./pages/account/login";
import { Admin } from "./pages/account/admin";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/connecter" element={<Login />} />

            <Route
              path="/Calendrier"
              element={
                <ProtectedRoute
                  element={<MyCalendar />}
                  allowedRoles={["employer", "admin"]}
                />
              }
            />
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
