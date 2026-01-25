import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { CongDoanModel } from "../../model/CongDoanModel";
import { CongDoanService } from "../../services/CongDoanService";
import CongDoanForm from "./component/CongDoanForm";

const CongDoanPage: React.FC = () => {
  const [listData, setListData] = useState<CongDoanModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<CongDoanModel | null>(null);

  useEffect(() => {
    getLstCongDoan();
  }, []);

  const getLstCongDoan = async () => {
    CongDoanService.getInstance()
      .getLstCongDoan({})
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

  const handleEdit = (model: CongDoanModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (ma_cd: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      CongDoanService.getInstance()
        .deleteCongDoan(ma_cd)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstCongDoan();
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
    setShowForm(false);
    if (refresh) {
      getLstCongDoan();
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">Danh sách Công Đoạn</h6>
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
                    <th scope="col">Mã CD</th>
                    <th scope="col">Tên Công Đoạn</th>
                    <th scope="col">Thứ Tự</th>
                    <th scope="col">Ngày Bắt Đầu</th>
                    <th scope="col">Số Ngày Hoàn Thành</th>
                    <th scope="col">Ngày Hoàn Thành Thực Tế</th>
                    <th scope="col">Kết Quả</th>
                    <th scope="col">Trạng Thái Tiến Độ</th>
                    <th scope="col">Mã DA</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.ma_cd}</td>
                      <td>{item.ten_cong_doan}</td>
                      <td>{item.thu_tu}</td>
                      <td>{item.ngay_bat_dau}</td>
                      <td>{item.so_ngay_hoan_thanh}</td>
                      <td>{item.ngay_hoan_thanh_thuc_te}</td>
                      <td>{item.ket_qua}</td>
                      <td>{item.trang_thai_tien_do}</td>
                      <td>{item.ma_da}</td>
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
                          onClick={() => handleDelete(item.ma_cd!)}
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
                {editingModel ? "Chỉnh sửa Công Đoạn" : "Thêm Công Đoạn"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CongDoanForm model={editingModel} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CongDoanPage;
