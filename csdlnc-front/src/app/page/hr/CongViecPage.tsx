import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { CongViecModel } from "../../model/CongViecModel";
import CongViecForm from "./component/CongViecForm";
import { CongViecService } from "../../services/CongViecService";
import ThamGiaCongViecList from "./component/ThamGiaCongViecList";

const CongViecPage: React.FC = () => {
  const [listData, setListData] = useState<CongViecModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<CongViecModel | null>(null);
  const [selectedCv, setSelectedCv] = useState<CongViecModel>(
    new CongViecModel(),
  );
  const [showThamGiaModal, setShowThamGiaModal] = useState(false);

  useEffect(() => {
    getLstCongViec();
  }, []);

  const getLstCongViec = async () => {
    CongViecService.getInstance()
      .getLstCongViec({})
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

  const handleEdit = (model: CongViecModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (maCv: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      CongViecService.getInstance()
        .deleteCongViec(maCv)
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa công việc thành công");
            getLstCongViec();
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
      getLstCongViec();
    }
  };

  function handlePhanCong(cv: CongViecModel) {
    setSelectedCv(cv);
    setShowThamGiaModal(true);
  }

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-light rounded h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0">Danh sách Công Việc</h6>
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
                    <th scope="col">Mã CV</th>
                    <th scope="col">Tên Công Việc</th>
                    <th scope="col">Loại Công Việc</th>
                    <th scope="col">Mức Lương Năng Suất</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.maCongViec}</td>
                      <td>{item.tenCongViec}</td>
                      <td>{item?.loaiCongViec?.tenLoaiCongViec}</td>
                      <td>{item?.loaiCongViec?.mucLuongNangSuat}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handlePhanCong(item)}
                        >
                          Phân công
                        </button>
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
                          onClick={() => handleDelete(item.maCongViec!)}
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
                {editingModel ? "Chỉnh sửa Công Việc" : "Thêm Công Việc"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CongViecForm model={editingModel} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>

      {showThamGiaModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <ThamGiaCongViecList
                  cv={selectedCv}
                  onClose={() => setShowThamGiaModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && <div className="modal-backdrop fade show"></div>}
      {showThamGiaModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CongViecPage;
