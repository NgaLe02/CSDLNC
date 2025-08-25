import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBarLeft from "./app/page/layout/SideBarLeft";
import System from "./app/page/system/System";
import Car from "./app/page/system/car/Car";
import TypeCar from "./app/page/system/typeCar/TypeCar";

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
              <Route path="/system" element={<System />}>
                <Route path="xe" element={<Car />} />
                <Route path="loai-xe" element={<TypeCar />} />
              </Route>
            </Routes>


          </div>
        </div>
        {/* <!-- Content End --> */}
      </div>
    </Router>
  );
}

export default App;
