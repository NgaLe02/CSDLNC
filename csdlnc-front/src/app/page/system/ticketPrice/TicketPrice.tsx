import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TicketPriceModel } from "../../../model/TicketPriceModel";
import { TicketPriceResponseModel } from "../../../model/response/TicketPriceResponseModel";
import { TicketPriceService } from "../../../services/TicketPriceService";
import TicketPriceForm from "./component/TicketPriceForm";

export default function TicketPrice() {
  const [listData, setListData] = useState<TicketPriceResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<TicketPriceModel>(
    new TicketPriceModel()
  );

  useEffect(() => {
    getLstSeason();
  }, []);

  function getLstSeason() {
    TicketPriceService.getInstance()
      .getLstTicketPrice({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
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
    // setEditingModel({
    //   maxe: car.maxe,
    //   bienSo: car.bienSo,
    //   tinhTrang: car.tinhTrang,
    //   maLoaiXe: car.loaiXe?.maLoaiXe
    // });
    setEditingModel(model);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    TicketPriceService.getInstance()
      .deleteTicketPrice(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstSeason();
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
    getLstSeason();
  }
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách mùa</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm mùa
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map(
                  (item: TicketPriceResponseModel, index: number) => (
                    <tr key={item.maMua}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.maGiaVe}</td>
                      <td>{item.mua?.tenMua}</td>
                      <td>
                        {item.tuyenDuong?.diemKhoiHanh} + "-" +{" "}
                        {item.tuyenDuong?.diemDen}
                      </td>
                      <td>{item.giaVe}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info ms-2"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => handleDelete(item.maMua!)}
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
        </div>
      </div>

      {showForm && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel ? "Sửa loại xe" : "Thêm loại xe"}
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
