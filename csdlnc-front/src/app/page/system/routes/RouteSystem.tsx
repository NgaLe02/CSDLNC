import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { RouteResponseModel } from "../../../model/response/RouteResponseModel";
import { RouteModel } from "../../../model/RouteModel";
import { RouteService } from "../../../services/RouteService";
import RouteForm from "./component/RouteForm";
import PaginationCommon from "../../../common/PaginationCommon";

export default function RouteSystem() {
  const [listData, setListData] = useState<RouteResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<RouteModel>(
    new RouteModel()
  );
  const totalElement = useRef(0);
  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
  });
  useEffect(() => {
    getLstRoute();
  }, [modelSearch.time]);

  function getLstRoute() {
    RouteService.getInstance()
      .getLstRoute(modelSearch)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
            totalElement.current = response.data.responseData.count;
            setListData(data);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function handleAdd() {
    setEditingModel(new RouteModel());
    setShowForm(true);
  }

  function handleEdit(model: RouteModel) {
    setEditingModel(model);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    RouteService.getInstance()
      .deleteRoute(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstRoute();
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function closeModal(status: boolean) {
    setShowForm(false);
    getLstRoute();
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

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light rounded p-4">
          <form className="row g-3">
            {/* Điểm khởi hành */}
            <div className="col-md-3">
              <label className="form-label" htmlFor="diemKhoiHanh">
                Điểm khởi hành
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Điểm khởi hành"
                name="diemKhoiHanh"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setModelSearch((prev: any) => ({
                      ...prev,
                      time: new Date().getTime(),
                      page: 1
                    }));
                  }
                }}
              />
            </div>

            {/* Điểm đến */}
            <div className="col-md-3">
              <label className="form-label" htmlFor="diemDen">
                Điểm đến
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Điểm đến"
                name="diemDen"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setModelSearch((prev: any) => ({
                      ...prev,
                      time: new Date().getTime(),
                      page: 1
                    }));
                  }
                }}
              />
            </div>

            {/* Nút tìm kiếm */}
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="button" // dùng type="button" để tránh reload form
                className="btn btn-primary w-100"
                onClick={() => {
                  setModelSearch((prev: any) => ({
                    ...prev,
                    time: new Date().getTime(),
                    page: 1
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
            <h6 className="mb-0">Danh sách tuyến đường ({totalElement.current} tuyến đường)</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm tuyến đường
            </button>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col" style={{ width: "5%" }}></th>
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Mã tuyến đường</th>
                  <th scope="col">Điểm khởi hành</th>
                  <th scope="col">Điểm đến</th>
                  <th scope="col">Độ phức tạp</th>
                  <th scope="col">Hệ số đường khó</th>
                  <th scope="col">Lương phụ xe</th>
                  {/* <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th> */}
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: RouteResponseModel, index: number) => (
                  <tr key={index}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{totalElement.current -
                      (modelSearch.page - 1) * modelSearch.limit -
                      index}</td>
                    <td>{item.maTuyen}</td>
                    <td>{item.diemKhoiHanh}</td>
                    <td>{item.diemDen}</td>
                    <td>{item.doPhucTap}</td>
                    <td>{item.heSoDuongKho}</td>
                    <td>
                      {item.luongTuyenDuong?.luongCoBan?.toLocaleString(
                        "vi-VN"
                      )}{" "}
                    </td>

                    {/* <td>{dayjs(item.ngayBatDau).format("YYYY-MM-DD")}</td> */}
                    {/* <td>{item.ngayKetThuc ? dayjs(item.ngayKetThuc).format("YYYY-MM-DD") : ''}</td> */}
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maTuyen!)}
                      >
                        Xóa
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
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel.maTuyen
                    ? "Sửa tuyến đường"
                    : "Thêm tuyến đường"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <RouteForm
                  model={editingModel}
                  closeModal={(status: boolean) => {
                    closeModal(status);
                  }}
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
