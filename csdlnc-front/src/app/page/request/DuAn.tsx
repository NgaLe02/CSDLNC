import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PaginationCommon from "../../common/PaginationCommon";
import dayjs from "dayjs";
import { RequestService } from "../../services/RequestService";
import CongDoanList from "./component/CongDoanLst";

export default function DuAn() {
  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
    thang: undefined,
    nam: undefined,
    tenDuAn: "",
  });
  const [listData, setListData] = useState<any[]>([]);
  const totalElement = useRef(0);

  useEffect(() => {
    getLstDuAn();
  }, [modelSearch.time]);

  function getLstDuAn() {
    RequestService.getInstance()
      .getLstDuAn(modelSearch)
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

  const [showForm, setShowForm] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>();

  const viewCongDoan = (item: any) => {
    setSelectedModel(item);
    setShowForm(true);
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light rounded p-4">
          <form className="row g-3">
            {/* Tìm theo họ tên / số điện thoại */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="keyword">
                Tên dự án
              </label>
              <input
                type="search"
                className="form-control"
                placeholder="Tên dự án"
                name="tenDuAn"
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
            <h6 className="mb-0">Danh mục dự án</h6>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Mã dự án</th>
                  <th scope="col">Tên dự án</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày hoàn thành</th>
                  <th scope="col">Kết quả</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.ma_du_an}</td>
                    <td>{item?.ten_du_an}</td>
                    <td>{item?.ngay_bat_dau} </td>
                    <td>{item?.ngay_ket_thuc_thuc_te} </td>
                    <td>{item?.ket_qua}</td>
                    <td>{item?.trang_thai}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => viewCongDoan(item)}
                      >
                        Công đoạn
                      </button>
                    </td>
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

      {showForm && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <CongDoanList
                  da={selectedModel}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && <div className="modal-backdrop fade show"></div>}
    </>
  );
}
