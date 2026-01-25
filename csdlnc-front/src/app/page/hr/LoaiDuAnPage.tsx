import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { LoaiDuAnModel } from "../../model/LoaiDuAnModel";
import { LoaiDuAnService } from "../../services/LoaiDuAnService";
import LoaiDuAnForm from "./component/LoaiDuAnForm";

const LoaiDuAnPage: React.FC = () => {
  const [listData, setListData] = useState<LoaiDuAnModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<LoaiDuAnModel>(
    new LoaiDuAnModel(),
  );

  useEffect(() => {
    getLstLoaiDuAn();
  }, []);

  const getLstLoaiDuAn = async () => {
    LoaiDuAnService.getInstance()
      .getLstLoaiDuAn({})
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
    setEditingModel(new LoaiDuAnModel());
    setShowForm(true);
  };

  const handleEdit = (model: LoaiDuAnModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (maLoaiDuAn: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      LoaiDuAnService.getInstance()
        .deleteLoaiDuAn(maLoaiDuAn)
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa loại dự án thành công");
            getLstLoaiDuAn();
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
      getLstLoaiDuAn();
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-light rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">Danh sách Loại Dự Án</h6>
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            Thêm mới
          </button>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                <th scope="col">Mã Loại</th>
                <th scope="col">Tên Loại</th>
                <th scope="col">Số NV Tối Đa</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item, index) => (
                <tr key={index}>
                  <td>{item.maLoaiDuAn}</td>
                  <td>{item.tenLoaiDuAn}</td>
                  <td>{item.soNvToiDa}</td>
                  <td>{item.moTa}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info ms-2"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => handleDelete(item.maLoaiDuAn!)}
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
                {editingModel ? "Chỉnh sửa Loại Dự Án" : "Thêm Loại Dự Án"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <LoaiDuAnForm model={editingModel} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
      {showForm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default LoaiDuAnPage;
