import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TypeCarService } from "../../../services/TypeCarService";
import { TypeCarModel } from "../../../model/TypeCarModel";
import TypeCarForm from "../typeCar/component/TypeCarForm";
import { CarModel } from "../../../model/CarModel";
import { CarService } from "../../../services/CarService";
import { CarResponseModel } from "../../../model/response/CarResponseModel";
import { PassengerModel } from "../../../model/PassengerModel";
import { PassengerService } from "../../../services/PassengerService";
import PassengerForm from "./component/PassengerForm";

export default function Passenger() {
  const [listData, setListData] = useState<PassengerModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<PassengerModel>(
    new PassengerModel()
  );

  useEffect(() => {
    getLstPassenger();
  }, []);

  function getLstPassenger() {
    PassengerService.getInstance()
      .getLstPassenger({})
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
    setEditingModel(new PassengerModel());
    setShowForm(true);
  }

  function handleEdit(model: PassengerModel) {
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
    PassengerService.getInstance()
      .deletePassenger(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstPassenger();
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
    getLstPassenger();
  }
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách hành khách</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm hành khách
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
                  <th scope="col">Mã hành khách</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">CMND</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: PassengerModel, index: number) => (
                  <tr key={item.maHanhKhach}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.maHanhKhach}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.cmnd}</td>
                    <td>{item.soDienThoai}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maHanhKhach!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
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
                <PassengerForm
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
