import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TicketPriceModel } from "../../../model/TicketPriceModel";
import { TicketPriceResponseModel } from "../../../model/response/TicketPriceResponseModel";
import { TicketPriceService } from "../../../services/TicketPriceService";
import TicketPriceForm from "./component/TicketPriceForm";
import dayjs from "dayjs";
import PaginationCommon from "../../../common/PaginationCommon";

export default function TicketPrice() {
  const [listData, setListData] = useState<TicketPriceResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<TicketPriceModel>(
    new TicketPriceModel()
  );
  const totalElement = useRef(0);

  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
  });
  useEffect(() => {
    getLstTicketPrice();
  }, [modelSearch.time]);

  function getLstTicketPrice() {
    TicketPriceService.getInstance()
      .getLstTicketPrice(modelSearch)
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
    setEditingModel(new TicketPriceModel());
    setShowForm(true);
  }

  function handleEdit(model: TicketPriceModel) {
    setEditingModel(model);
    setShowForm(true);
  }

  function handleDelete(item: any) {
    TicketPriceService.getInstance()
      .deleteTicketPrice(item)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstTicketPrice();
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
    getLstTicketPrice();
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

            <div className="col-md-3">
              <label className="form-label" htmlFor="tenMua">
                Mùa lễ
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên mùa"
                name="tenMua"
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
                type="button"
                className="btn btn-primary w-100"
                onClick={() => {
                  setModelSearch((prev: any) => ({
                    ...prev,
                    page: 1,
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
            <h6 className="mb-0">Danh sách giá vé ({totalElement.current} bản ghi)</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm giá vé
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
                  <th scope="col">Mã giá vé</th>
                  <th scope="col">Tên mùa</th>
                  <th scope="col">Tên tuyến đường</th>
                  <th scope="col">Giá vé</th>
                  <th scope="col">Hiệu lực</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map(
                  (item: TicketPriceResponseModel, index: number) => (
                    <tr key={index}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td>{
                        totalElement.current -
                        (modelSearch.page - 1) * modelSearch.limit -
                        index
                      }</td>
                      <td>{item.maGiaVe}</td>
                      <td>{item.mua?.tenMua}</td>
                      <td>
                        {item.tuyenDuong?.diemKhoiHanh} -
                        {item.tuyenDuong?.diemDen}
                      </td>
                      <td>{item.giaVe?.toLocaleString("vi-VN")} </td>
                      <td>{dayjs(item.ngayBatDau).format('DD-MM-YYYY')} {item.ngayKetThuc ? ('~ ' + dayjs(item.ngayKetThuc).format('DD-MM-YYYY')) : ''}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info ms-2"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => handleDelete(item)}
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
                  {editingModel.maGiaVe ? "Sửa giá vé" : "Thêm giá vé"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TicketPriceForm
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
