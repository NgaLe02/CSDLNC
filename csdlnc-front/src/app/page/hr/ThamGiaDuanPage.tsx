import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { ThamGiaDuanModel } from "../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../services/ThamGiaDuanService";
import ThamGiaDuanForm from "./component/ThamGiaDuanForm";

const ThamGiaDuanPage: React.FC = () => {
  const [listData, setListData] = useState<ThamGiaDuanModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<ThamGiaDuanModel | null>(
    null,
  );

  useEffect(() => {
    getLstThamGiaDuan();
  }, []);

  const getLstThamGiaDuan = async () => {
    ThamGiaDuanService.getInstance()
      .getLstThamGiaDuan({})
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

  const handleEdit = (model: ThamGiaDuanModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (maNv: string, maDa: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      ThamGiaDuanService.getInstance()
        .deleteThamGiaDuan(maNv, maDa)
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa tham gia dự án thành công");
            getLstThamGiaDuan();
          } else {
            toast.error("Có lỗi xảy ra khi xóa");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message || "Có lỗi xảy ra");
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    }
  };

  const closeModal = (refresh: boolean) => {
    setShowForm(false);
    if (refresh) {
      getLstThamGiaDuan();
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">Danh sách Tham Gia Dự Án</h6>
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
                    <th scope="col">Mã DA</th>
                    <th scope="col">Vai Trò</th>
                    <th scope="col">Tháng</th>
                    <th scope="col">Năm</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.maNv}</td>
                      <td>{item.maDa}</td>
                      <td>{item.vaiTro}</td>
                      <td>{item.thang}</td>
                      <td>{item.nam}</td>
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
                          onClick={() => handleDelete(item.maNv!, item.maDa!)}
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
                  ? "Chỉnh sửa Tham Gia Dự Án"
                  : "Thêm Tham Gia Dự Án"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ThamGiaDuanForm model={editingModel} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ThamGiaDuanPage;
