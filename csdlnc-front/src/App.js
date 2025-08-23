import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBarLeft from "./app/page/layout/SideBarLeft";
import System from "./app/page/system/System";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBarLeft />

        {/* <!-- Content Start --> */}
        <div className="content">
          <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0"></nav>

          {/* <!-- Blank Start --> */}
          <div className="container-fluid pt-4 px-4">
            <Routes>
              <Route path="/system" element={<System />} />
              {/* bạn có thể thêm Route cho Revenue ở đây */}
            </Routes>
          </div>
        </div>
        {/* <!-- Content End --> */}
      </div>
    </Router>
  );
}

export default App;
