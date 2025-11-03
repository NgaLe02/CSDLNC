import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TicketModel } from "../../../model/TicketModel";
import { TicketResponseModel } from "../../../model/response/TicketResponseModel";
import { TicketService } from "../../../services/TicketService";
import TicketForm from "./component/TicketForm";
import dayjs from "dayjs";
import PaginationCommon from "../../../common/PaginationCommon";

export default function Ticket() {
  const [modelSearch, setModelSearch] = useState<any>(
    {
      limit: 10,
      page: 1,
      time: new Date().getTime()
    });
  const [listData, setListData] = useState<TicketResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<TicketModel>(new TicketModel());
  const totalElement = useRef(0);

  useEffect(() => {
    getLstTicket();
  }, [modelSearch.time]);

  function getLstTicket() {
    TicketService.getInstance()
      .getLstTicket(modelSearch)
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
    setEditingModel(new TicketModel());
    setShowForm(true);
  }

  function handleEdit(model: TicketModel) {
    setEditingModel(model);
    setShowForm(true);
  }

  function handleDelete(item: TicketResponseModel) {
    const payload = {
      maChuyen: item.maChuyen!,
      maTuyen: item.maTuyen!,
      maXe: item.maXe!,
      maVe: item.maVe!
    }
    TicketService.getInstance()
      .deleteTicket(payload)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstTicket();
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
    getLstTicket();
  }

  const handlePageChange = (page: number) => {
    setModelSearch({
      ...modelSearch,
      page: page,
      time: new Date().getTime()
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
            {/* Tìm theo họ tên / số điện thoại */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="muaTuNgay">Hành khách</label>
              <input
                type="search"
                className="form-control"
                placeholder="Nhập họ tên hoặc số điện thoại"
                name="keyword"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
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

            {/* Mã vé */}
            <div className="col-md-2">
              <label className="form-label" htmlFor="muaTuNgay">Mã vé</label>
              <input
                type="text"
                className="form-control"
                placeholder="Mã vé"
                name="maVeFull"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
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

            {/* Ngày mua */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="muaTuNgay">Ngày mua</label>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  className="form-control"
                  name="muaTuNgay"
                  onChange={(e) => handleChangeSearch(e)}
                />
                <span className="mx-2">~</span>
                <input
                  type="date"
                  className="form-control"
                  name="muaDenNgay"
                  onChange={(e) => handleChangeSearch(e)}
                />
              </div>
            </div>

            {/* Ngày khởi hành */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="khoiHanhTuNgay">Ngày khởi hành</label>
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
              <label className="form-label" htmlFor="diemKhoiHanh">Điểm khởi hành</label>
              <input
                type="text"
                className="form-control"
                placeholder="Điểm khởi hành"
                name="diemKhoiHanh"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
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
              <label className="form-label" htmlFor="diemDen">Điểm đến</label>
              <input
                type="text"
                className="form-control"
                placeholder="Điểm đến"
                name="diemDen"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
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

            {/* Tình trạng chuyến */}
            <div className="col-md-2">
              <label className="form-label" htmlFor="khoiHanhTuNgay">Tình trạng chuyến</label>
              <select className="form-select" name="tinhTrangChuyen"
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
            <h6 className="mb-0">Danh sách vé ({totalElement.current} vé)</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm vé
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
                  <th scope="col">Mã vé</th>
                  <th scope="col">Tên tuyến đường</th>
                  <th scope="col">Ngày mua</th>
                  <th scope="col">Giá vé (VNĐ)</th>
                  <th scope="col">Ghế ngồi</th>
                  <th scope="col">Hành khách</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map(
                  (item: TicketResponseModel, index: number) => (
                    <tr key={index}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td>{totalElement.current - (modelSearch.page - 1) * modelSearch.limit - index}</td>
                      <td>{item.maVeFull}</td>
                      <td>
                        {item.tuyenDuong?.diemKhoiHanh} -
                        {item.tuyenDuong?.diemDen}
                      </td>
                      <td>{dayjs(item.ngayMua).format('DD-MM-YYYY')}</td>
                      <td>{item.chuyenXe?.giaVe?.giaVe?.toLocaleString('vi-vn')} </td>
                      <td>{item.gheNgoi}</td>
                      <td>{item.hanhKhach?.hoTen}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-info ms-2"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => handleDelete(item!)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  )
                )}
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
                  {editingModel.maVe ? "Sửa vé" : "Thêm vé"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TicketForm
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
