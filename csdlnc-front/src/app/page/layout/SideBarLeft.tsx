import { Link, useNavigate } from "react-router-dom";

function SideBarLeft() {
  const navigate = useNavigate();

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      {/* <!-- Spinner Start --> */}
      {/* <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* <!-- Spinner End --> */}

      {/* <!-- Sidebar Start --> */}
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <a href="index.html" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-hashtag me-2"></i>NHÓM 1
            </h3>
          </a>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src="img/ptit.png"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Nhóm 1</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <a href="index.html" className="nav-item nav-link">
              <i className="fa fa-tachometer-alt me-2"></i>Dashboard
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle "
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-laptop me-2"></i>Hệ thống
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a
                  href="#"
                  className="dropdown-item "
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/xe");
                  }}
                >
                  Xe
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/loai-xe");
                  }}
                >
                  Loại xe
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/hanh-khach");
                  }}
                >
                  Hành khách
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/nhan-vien");
                  }}
                >
                  Nhân viên
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/mua");
                  }}
                >
                  Mùa
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/luong-tuyen-duong");
                  }}
                >
                  Lương tuyến đường
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/tuyen-duong");
                  }}
                >
                  Tuyến đường
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/gia-ve");
                  }}
                >
                  Giá vé
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/system/chuyen-xe");
                  }}
                >
                  Chuyến xe
                </a>
              </div>
            </div>
            <a href="widget.html" className="nav-item nav-link">
              <i className="fa fa-th me-2"></i>Widgets
            </a>
            <a href="form.html" className="nav-item nav-link">
              <i className="fa fa-keyboard me-2"></i>Forms
            </a>
            <a href="table.html" className="nav-item nav-link">
              <i className="fa fa-table me-2"></i>Tables
            </a>
            <a href="chart.html" className="nav-item nav-link">
              <i className="fa fa-chart-bar me-2"></i>Charts
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle active"
                data-bs-toggle="dropdown"
              >
                <i className="far fa-file-alt me-2"></i>Pages
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="signin.html" className="dropdown-item">
                  Sign In
                </a>
                <a href="signup.html" className="dropdown-item">
                  Sign Up
                </a>
                <a href="404.html" className="dropdown-item">
                  404 Error
                </a>
                <a href="blank.html" className="dropdown-item active">
                  Blank Page
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* <!-- Sidebar End --> */}
    </div>
  );
}

export default SideBarLeft;
