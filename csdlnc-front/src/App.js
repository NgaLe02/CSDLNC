import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBarLeft from "./app/page/layout/SideBarLeft";
import System from "./app/page/system/System";
import Car from "./app/page/system/car/Car";
import TypeCar from "./app/page/system/typeCar/TypeCar";
import { ToastContainer } from "react-toastify";
import Passenger from "./app/page/system/passenger/Passenger";
import Employee from "./app/page/system/employee/Employee";
import Season from "./app/page/system/season/Season";
import RouteSalary from "./app/page/system/routhSalary/RouteSalary";
import RouteSystem from "./app/page/system/routes/RouteSystem";
import TicketPrice from "./app/page/system/ticketPrice/TicketPrice";

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
                <Route path="hanh-khach" element={<Passenger />} />
                <Route path="nhan-vien" element={<Employee />} />
                <Route path="mua" element={<Season />} />
                <Route path="luong-tuyen-duong" element={<RouteSalary />} />
                <Route path="tuyen-duong" element={<RouteSystem />} />
                <Route path="gia-ve" element={<TicketPrice />} />
              </Route>
            </Routes>
          </div>
        </div>
        {/* <!-- Content End --> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
