import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { BacLuongModel } from "../../model/BacLuongModel";
import { BacLuongService } from "../../services/BacLuongService";
import BacLuongForm from "./component/BacLuongForm";

const BacLuongPage: React.FC = () => {
  const [listData, setListData] = useState<BacLuongModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<BacLuongModel | null>(null);

  useEffect(() => {
    getLstBacLuong();
  }, []);

  const getLstBacLuong = async () => {
    BacLuongService.getInstance()
      .getLstBacLuong()
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListData(resp.data);
        }
      });
  };

  const handleAdd = () => {
    setEditingModel(null);
    setShowForm(true);
  };

  const handleEdit = (model: BacLuongModel) => {
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      BacLuongService.getInstance()
        .deleteBacLuong(id)
        .then(() => {
          toast.success("Xóa thành công");
          getLstBacLuong();
        });
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-light rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">Danh sách Bậc Lương</h6>
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm mới
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Mã Bậc Lương</th>
                <th>Tên Bậc Lương</th>
                <th>Mức Lương Cơ Bản</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item, index) => (
                <tr key={index}>
                  <td>{item.maBacLuong}</td>
                  <td>{item.tenBacLuong}</td>
                  <td>{item.mucLuongCoBan?.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.maBacLuong!)}
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

      {showForm && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel ? "Sửa Bậc Lương" : "Thêm Bậc Lương"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <BacLuongForm
                  model={editingModel}
                  isEdit={!!editingModel}
                  closeModal={(refresh: boolean) => {
                    setShowForm(false);
                    if (refresh) getLstBacLuong();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacLuongPage;
