import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { ThucHienCongDoanModel } from "../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../services/ThucHienCongDoanService";
import ThucHienCongDoanForm from "./component/ThucHienCongDoanForm";

const ThucHienCongDoanPage: React.FC = () => {
  const [listData, setListData] = useState<ThucHienCongDoanModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] =
    useState<ThucHienCongDoanModel | null>(null);

  useEffect(() => {
    getLstThucHienCongDoan();
  }, []);

  const getLstThucHienCongDoan = async () => {
    ThucHienCongDoanService.getInstance()
      .getLstThucHienCongDoan({})
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListData(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAdd = () => {
    setEditingModel(null);
    setShowForm(true);
  };

  const handleEdit = (model: ThucHienCongDoanModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (maNv: string, maCd: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      ThucHienCongDoanService.getInstance()
        .deleteThucHienCongDoan(maNv, maCd)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstThucHienCongDoan();
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
  };

  const closeModal = (refresh: boolean) => {
    setShowForm(refresh);
    if (refresh) {
      getLstThucHienCongDoan();
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">Danh sách Thực Hiện Công Đoạn</h6>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdd}
              >
                Thêm mới
              </button>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Mã NV</th>
                    <th scope="col">Mã CD</th>
                    <th scope="col">Vai Trò</th>
                    <th scope="col">Kết Quả</th>
                    <th scope="col">Đúng Hạn</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.maNv}</td>
                      <td>{item.maCd}</td>
                      <td>{item.vaiTro}</td>
                      <td>{item.ketQua}</td>
                      <td>{item.dungHan ? "Có" : "Không"}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.maNv!, item.maCd!)}
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
      </div>

      {/* Modal */}
      <div
        className={`modal fade ${showForm ? "show" : ""}`}
        style={{ display: showForm ? "block" : "none" }}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingModel
                  ? "Chỉnh sửa Thực Hiện Công Đoạn"
                  : "Thêm Thực Hiện Công Đoạn"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ThucHienCongDoanForm
                model={editingModel}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ThucHienCongDoanPage;
