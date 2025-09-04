import { HttpStatusCode } from "axios";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TripModel } from "../../../model/TripModel";
import { TripService } from "../../../services/TripService";
import { TripResponseModel } from "../../../model/response/TripResponseModel";
import TripForm from "./component/TripForm";
import dayjs from "dayjs";
import PaginationCommon from "../../../common/PaginationCommon";

export default function Trip() {
  const [listData, setListData] = useState<TripResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<TripModel>(new TripModel());
  const totalElement = useRef(0);
  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
  });

  useEffect(() => {
    getLstTrip();
  }, [modelSearch.time]);

  function getLstTrip() {
    TripService.getInstance()
      .getLstTrip(modelSearch)
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
    setEditingModel(new TripModel());
    setShowForm(true);
  }

  function handleEdit(trip: TripResponseModel) {
    // setEditingModel({
    //   maxe: Trip.maxe,
    //   bienSo: Trip.bienSo,
    //   tinhTrang: Trip.tinhTrang,
    //   maLoaiXe: Trip.loaiXe?.maLoaiXe
    // });
    setEditingModel(trip);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    TripService.getInstance()
      .deleteTrip(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstTrip();
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra");
        }
      });
  }

  function closeModal(status: boolean) {
    setShowForm(false);
    getLstTrip();
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
            {/* Ngày khởi hành */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="khoiHanhTuNgay">
                Ngày khởi hành
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  className="form-control"
                  name="khoiHanhTuNgay"
                  onChange={(e) => handleChangeSearch(e)}
                />
                <span className="mx-2">~</span>
                <input
                  type="date"
                  className="form-control"
                  name="khoiHanhDenNgay"
                  onChange={(e) => handleChangeSearch(e)}
                />
              </div>
            </div>

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
                    }));
                  }
                }}
              />
            </div>

            {/* Tình trạng chuyến */}
            <div className="col-md-2">
              <label className="form-label" htmlFor="khoiHanhTuNgay">
                Tình trạng chuyến
              </label>
              <select
                className="form-select"
                name="tinhTrangChuyen"
                onChange={(e) => handleChangeSearch(e)}
                value={modelSearch.tinhTrangChuyen}
              >
                <option value="">-- Tình trạng --</option>
                <option value="Chưa khởi hành">Chưa khởi hành</option>
                <option value="Đang chạy">Đang chạy</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Hủy">Hủy</option>
              </select>
            </div>

            {/* Nút tìm kiếm */}
            <div className="col-md-2 d-flex">
              <button
                type="button" // dùng type="button" để tránh reload form
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
            <h6 className="mb-0">Danh sách chuyến xe</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm chuyến xe
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
                  <th scope="col">Mã chuyến xe</th>
                  <th scope="col">Xe</th>
                  <th scope="col">Tuyến đường</th>
                  <th scope="col">Ngày giờ khởi hành</th>
                  <th scope="col">Ngày giờ đến</th>
                  <th scope="col">Khoảng cách (km)</th>
                  <th scope="col">Thù lao phụ xe</th>
                  <th scope="col">Thù lao lái xe</th>
                  <th scope="col">Chi phí vận hành</th>
                  <th scope="col">Giá vé</th>
                  <th scope="col">Tình trạng chuyến</th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: TripResponseModel, index: number) => (
                  <tr key={index}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>
                      {totalElement.current -
                        (modelSearch.page - 1) * modelSearch.limit -
                        index}
                    </td>
                    <td>{item.maChuyen}</td>
                    <td>{item.xe?.maXe}</td>
                    <td>
                      {item.tuyenDuong?.diemKhoiHanh} -{" "}
                      {item.tuyenDuong?.diemDen}
                    </td>
                    <td>
                      {dayjs(item.ngayGioKhoiHanh).format("DD-MM-YYYY HH:mm")}
                    </td>
                    <td>{dayjs(item.ngayGioDen).format("DD-MM-YYYY HH:mm")}</td>
                    <td>{item.tuyenDuong?.khoangCach}</td>
                    <td>
                      {item.tuyenDuong?.luongTuyenDuong?.luongCoBan?.toLocaleString(
                        "vi-VN"
                      )}
                    </td>
                    <td>
                      {(
                        (item.tuyenDuong?.luongTuyenDuong?.luongCoBan || 0) *
                        (item.tiLeThuLao || 0)
                      ).toLocaleString("vi-VN")}
                    </td>
                    <td>{item.chiPhiVanHanh?.toLocaleString("vi-VN")}</td>
                    <td>{item.giaVe?.giaVe?.toLocaleString("vi-VN")}</td>
                    <td>{item.tinhTrangChuyen}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maChuyen!)}
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
                  {editingModel.maChuyen ? "Sửa chuyến xe" : "Thêm chuyến xe"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TripForm
                  model={editingModel}
                  closeModal={(status: boolean) => {
                    closeModal(status);
                  }}
                  type={editingModel.maChuyen ? "E" : "C"}
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
