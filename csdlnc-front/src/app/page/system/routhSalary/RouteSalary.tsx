import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { RouteSalaryService } from "../../../services/RouteSalaryService";
import RouteSalaryForm from "./component/RouteSalaryForm";
import { RouteSalaryModel } from "../../../model/RouteSalaryModel";

export default function RouteSalary() {
  const [listData, setListData] = useState<RouteSalaryModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<RouteSalaryModel>(
    new RouteSalaryModel()
  );

  useEffect(() => {
    getLstSeason();
  }, []);

  function getLstSeason() {
    RouteSalaryService.getInstance()
      .getLstRouteSalary({})
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
    setEditingModel(new RouteSalaryModel());
    setShowForm(true);
  }

  function handleEdit(model: RouteSalaryModel) {
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
    RouteSalaryService.getInstance()
      .deleteRouteSalary(id)
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
            <h6 className="mb-0">
              Danh sách lương tuyến đường (cần có tối thiểu 1 bản ghi)
            </h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm
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
                  <th scope="col">Độ phức tạp</th>
                  <th scope="col">Khoảng cách từ</th>
                  <th scope="col">Khoảng cách đến</th>
                  <th scope="col">Lương cơ bản</th>

                  {/* <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th> */}
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: RouteSalaryModel, index: number) => (
                  <tr key={item.maLuongTuyen}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.doPhucTap}</td>
                    <td>{item.khoangCachTu}</td>
                    <td>{item.khoangCachDen}</td>
                    <td>{item.luongCoBan?.toLocaleString("vi-VN")} </td>
                    {/* <td>{dayjs(item.ngayBatDau).format("YYYY-MM-DD")}</td> */}
                    {/* <td>{item.ngayKetThuc ? dayjs(item.ngayKetThuc).format("YYYY-MM-DD") : ''}</td> */}
                    <td>
                      {/* <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button> */}
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maLuongTuyen!)}
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
                  {editingModel.maLuongTuyen
                    ? "Sửa lương tuyến đường"
                    : "Thêm lương tuyến đường"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <RouteSalaryForm
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
