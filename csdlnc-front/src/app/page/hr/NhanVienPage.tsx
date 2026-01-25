import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { NhanVienModel } from "../../model/NhanVienModel";
import { NhanVienService } from "../../services/NhanVienService";
import NhanVienForm from "./component/NhanVienForm";

const NhanVienPage: React.FC = () => {
  const [listData, setListData] = useState<NhanVienModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<NhanVienModel>(
    new NhanVienModel(),
  );

  useEffect(() => {
    getLstNhanVien();
  }, []);

  function getLstNhanVien() {
    NhanVienService.getInstance()
      .getLstNhanVien({})
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
    setEditingModel(new NhanVienModel());
    setShowForm(true);
  }

  function handleEdit(nhanVien: NhanVienModel) {
    setEditingModel(nhanVien);
    setShowForm(true);
  }

  function handleDelete(maNv: string) {
    NhanVienService.getInstance()
      .deleteNhanVien(maNv)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstNhanVien();
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
    setShowForm(status);
    getLstNhanVien();
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách Nhân viên</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm nhân viên
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
                  <th scope="col">Mã NV</th>
                  <th scope="col">Họ Tên</th>
                  <th scope="col">Ngày Sinh</th>
                  <th scope="col">Giới Tính</th>
                  <th scope="col">Chức Vụ</th>
                  <th scope="col">Bậc Lương</th>
                  <th scope="col">Lương Cơ Bản</th>
                  <th scope="col">Mã Phòng</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: NhanVienModel, index: number) => (
                  <tr key={item.maNv}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.maNv}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.ngaySinh}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.chucVu}</td>
                    <td>{item.bacLuong}</td>
                    <td>{item.luongCoBan}</td>
                    <td>{item.maPhong}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maNv!)}
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
                  {editingModel.maNv ? "Sửa nhân viên" : "Thêm nhân viên"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <NhanVienForm
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
};

export default NhanVienPage;
