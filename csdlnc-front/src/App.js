import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBarLeft from "./app/page/layout/SideBarLeft";
import PhongBanPage from "./app/page/hr/PhongBanPage";
import NhanVienPage from "./app/page/hr/NhanVienPage";
import DuanPage from "./app/page/hr/DuanPage";
import CongViecPage from "./app/page/hr/CongViecPage";
import { ToastContainer } from "react-toastify";
import LoaiDuAnPage from "./app/page/hr/LoaiDuAnPage";
import BacLuongPage from "./app/page/hr/BacLuongPage";
import LoaiCongViecPage from "./app/page/hr/LoaiCongViecPage";
import DuAn from "./app/page/request/DuAn";
import LuongNhanVien from "./app/page/request/LuongNhanVien";

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
              <Route path="/system">
                <Route path="bac-luong" element={<BacLuongPage />} />
                <Route path="phong-ban" element={<PhongBanPage />} />
                <Route path="nhan-vien" element={<NhanVienPage />} />
                <Route path="du-an" element={<DuanPage />} />
                <Route path="loai-du-an" element={<LoaiDuAnPage />} />
                <Route path="loai-cong-viec" element={<LoaiCongViecPage />} />

                <Route path="cong-viec" element={<CongViecPage />} />
              </Route>

              <Route path="/request">
                <Route path="re-01" element={<LuongNhanVien />} />
                <Route path="re-02" element={<DuAn />} />
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
