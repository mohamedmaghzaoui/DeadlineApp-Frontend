import { MyCalendar } from "./pages/Calendar/calendar";
import { Home } from "./pages/Home";
import { Navbar } from "./pages/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/account/login";
import { SignIn } from "./pages/account/sign";
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
            <Route path="/Calendrier" element={<MyCalendar />} />
            <Route path="/connecter" element={<Login />} />
            <Route path="/s'inscrire" element={<SignIn />} />
            <Route path="*" element={<h1>page not available</h1>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
