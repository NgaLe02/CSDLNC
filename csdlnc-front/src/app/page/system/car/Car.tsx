import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TypeCarService } from "../../../services/TypeCarService";
import { TypeCarModel } from "../../../model/TypeCarModel";
import TypeCarForm from "../typeCar/component/TypeCarForm";
import { CarModel } from "../../../model/CarModel";
import { CarService } from "../../../services/CarService";
import { CarResponseModel } from "../../../model/response/CarResponseModel";
import CarForm from "./component/CarForm";

export default function Car() {
  const [listData, setListData] = useState<CarResponseModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<CarModel>(new CarModel());

  useEffect(() => {
    getLstCar();
  }, []);

  function getLstCar() {
    CarService.getInstance()
      .getLstCar({})
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
    setEditingModel(new CarModel());
    setShowForm(true);
  }

  function handleEdit(car: CarResponseModel) {
    // setEditingModel({
    //   maxe: car.maxe,
    //   bienSo: car.bienSo,
    //   tinhTrang: car.tinhTrang,
    //   maLoaiXe: car.loaiXe?.maLoaiXe
    // });
    setEditingModel(car)
    setShowForm(true);
  }

  function handleDelete(id: string) {
    CarService.getInstance()
      .deleteCar(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstCar();
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
    setShowForm(false)
    getLstCar()
  }
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách xe</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm xe
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
                  <th scope="col">Mã xe</th>
                  <th scope="col">Biển số xe</th>
                  <th scope="col">Tình trạng</th>
                  <th scope="col">Loại xe</th>
                  <th scope="col">Số ghế ngồi</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: CarResponseModel, index: number) => (
                  <tr key={item.maxe}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.bienSo}</td>
                    <td>{item.tinhTrang}</td>
                    <td>{item.loaiXe?.tenLoaiXe}</td>
                    <td>{item.loaiXe?.soGhe}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maxe!)}
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
                <CarForm model={editingModel}
                  closeModal={(status: boolean) => { closeModal(status) }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && <div className="modal-backdrop fade show"></div>}
    </>
  );
}