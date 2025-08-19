import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import System from "./app/page/system/System";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Thanh tab */}
        <nav className="App-header">
          <Link className="App-link" to="/system">
            System
          </Link>{" "}
          |{" "}
          <Link className="App-link" to="/revenue">
            Revenue
          </Link>
        </nav>

        {/* Nội dung hiển thị theo route */}
        <Routes>
          <Route path="/system" element={<System />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
