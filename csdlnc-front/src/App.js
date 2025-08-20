import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./app/page/layout/Header";
import System from "./app/page/system/System";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/system" element={<System />} />
          {/* bạn có thể thêm Route cho Revenue ở đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
