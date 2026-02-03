import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PaginationCommon from "../../common/PaginationCommon";
import dayjs from "dayjs";
import { RequestService } from "../../services/RequestService";

export default function LuongNhanVien() {
  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
    thang: dayjs().month() + 1,
    nam: dayjs().year(),
    keyword: "",
    sortField: "",
    sortOrder: "desc",
  });
  const [listData, setListData] = useState<any[]>([]);
  const totalElement = useRef(0);

  useEffect(() => {
    getSalary();
  }, [modelSearch.time]);

  function getSalary() {
    RequestService.getInstance()
      .getLuongNhanVien(modelSearch)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data.list;
          setListData(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  const handlePageChange = (page: number) => {
    setModelSearch({
      ...modelSearch,
      page: page,
      time: new Date().getTime(),
    });
  };

  const handleChangeSearch = (event: any) => {
    setModelSearch({
      ...modelSearch,
      [event.target.name]: event.target.value,
    });
  };

  const handleSort = (field: string) => {
    setModelSearch((prev: any) => ({
      ...prev,
      sortField: field,
      sortOrder:
        prev.sortField === field && prev.sortOrder === "asc" ? "desc" : "asc",
      time: new Date().getTime(),
    }));
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light rounded p-4">
          <form className="row g-3">
            {/* Tìm theo họ tên / số điện thoại */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="keyword">
                Nhân viên
              </label>
              <input
                type="search"
                className="form-control"
                placeholder="Nhập họ tên nhân viên, mã nhân viên"
                name="keyword"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setModelSearch((prev: any) => ({
                      ...prev,
                      time: new Date().getTime(),
                    }));
                  }
                }}
              />
            </div>

            {/* Thời gian (theo tháng) */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="month">
                Tháng
              </label>
              <input
                type="month"
                className="form-control"
                value={
                  modelSearch.thang && modelSearch.nam
                    ? `${modelSearch.nam}-${String(modelSearch.thang).padStart(2, "0")}`
                    : ""
                }
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-");
                  setModelSearch({
                    ...modelSearch,
                    thang: Number(month),
                    nam: Number(year),
                    time: new Date().getTime(),
                  });
                }}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <label className="form-label" htmlFor="role"></label>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => {
                  setModelSearch((prev: any) => ({
                    ...prev,
                    time: new Date().getTime(),
                  }));
                }}
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Lương tháng lái xe</h6>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Mã nhân viên</th>
                  <th scope="col">Nhân viên</th>
                  <th scope="col">Lương cơ bản (VNĐ)</th>
                  <th scope="col">Lương trách nhiệm (VNĐ)</th>
                  <th scope="col">Lương năng suất (VNĐ)</th>
                  <th scope="col">Lương phạt (VNĐ)</th>
                  <th
                    scope="col"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("so_phan_viec_loi")}
                  >
                    Số phần việc lỗi
                    {modelSearch.sortField === "so_phan_viec_loi" &&
                      (modelSearch.sortOrder === "asc" ? " ↑" : " ↓")}{" "}
                  </th>

                  <th
                    scope="col"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("tong_luong")}
                  >
                    Tổng lương (VNĐ)
                    {modelSearch.sortField === "tong_luong" &&
                      (modelSearch.sortOrder === "asc" ? " ↑" : " ↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.ma_nhan_vien}</td>
                    <td>{item?.ho_ten}</td>
                    <td>{item.luong_co_ban?.toLocaleString("vi-VN")} </td>
                    <td>{item.luong_trach_nhiem?.toLocaleString("vi-VN")} </td>
                    <td>{item.luong_nang_suat?.toLocaleString("vi-VN")} </td>
                    <td>{item.tien_phat?.toLocaleString("vi-VN")} </td>
                    <td>{item.so_phan_viec_loi}</td>
                    <td>{item.tong_luong?.toLocaleString("vi-VN")} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <PaginationCommon
              currentPage={modelSearch.page}
              count={totalElement.current}
              onPageChange={handlePageChange}
              rows={modelSearch.limit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
