import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CarService } from "../../../services/CarService";
import TypeCarForm from "./component/TypeCarForm";
import { TypeCarService } from "../../../services/TypeCarService";

export default function TypeCar() {
  const [listCar, setListCar] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<any>(null);

  useEffect(() => {
    getLstTypeCar();
  }, []);

  function getLstTypeCar() {
    TypeCarService.getInstance()
      .getLstTypeCar({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setListCar(data);
          } else {
            toast.error("Tìm kiếm không thành công");
          }
        } else {
          toast.error("Tìm kiếm không thành công");
        }
      })
      .catch(() => {
        toast.error("Tìm kiếm không thành công");
      });
  }

  function handleAdd() {
    setEditingModel(null);
    setShowForm(true);
  }

  function handleEdit(car: any) {
    setEditingModel(car);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    TypeCarService.getInstance()
      .deleteTypeCar(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success("Xoá thành công");
          } else {
            toast.error("Xoá thất bại");
          }
        } else {
          toast.error("Xoá thất bại");
        }
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra!');
      });
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách loại xe</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm loại xe
            </button>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col"></th>
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Mã loại xe</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Số ghế ngồi</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listCar.map((car, index) => (
                  <tr key={car.id}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{car.code}</td>
                    <td>{car.name}</td>
                    <td>{car.seatNumber}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(car)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(car)}
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
                <TypeCarForm TypeCar={editingModel} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && <div className="modal-backdrop fade show"></div>}
    </>
  );
}
