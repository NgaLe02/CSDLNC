import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import ThamGiaDuanForm from "./ThamGiaDuanForm";
import { ThamGiaDuanModel } from "../../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";
import { DuanModel } from "../../../model/DuanModel";
import { ThucHienCongViecModel } from "../../../model/ThucHienCongViecModel";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongViecService } from "../../../services/ThucHienCongViecService";
import { CongViecModel } from "../../../model/CongViecModel";
import { CongViecService } from "../../../services/CongViecService";
import ThamGiaCongViecForm from "./ThamGiaCongViecForm";
import { NhanVienModel } from "../../../model/NhanVienModel";

interface ThamGiaCongViecListProps {
  cv: CongViecModel;
  onClose: () => void;
  trangThai?: string;
}

const ThamGiaCongViecList: React.FC<ThamGiaCongViecListProps> = ({
  cv,
  onClose,
  trangThai,
}) => {
  const [listNv, setListNv] = useState<NhanVienModel[]>([]);
  const [type, setType] = useState<"C" | "U">("C");
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] =
    useState<ThucHienCongViecModel | null>(null);

  useEffect(() => {
    if (cv.maCongViec) {
      getLstThamGiaCv();
    }
  }, [cv.maCongViec]);

  const getLstThamGiaCv = async () => {
    CongViecService.getInstance()
      .getNhanVienThamGiaCongViec(cv.maCongViec!)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListNv(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAdd = () => {
    setEditingModel(new ThucHienCongViecModel({ maCv: cv.maCongViec }));
    setType("C");
    setShowForm(true);
  };

  const handleEdit = (model: ThamGiaDuanModel) => {
    setEditingModel(model);
    setType("U");
    setShowForm(true);
  };

  const handleDelete = (maNv: string, maCv: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      ThucHienCongViecService.getInstance()
        .deleteThucHienCongViec(maNv, maCv)
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa nhân viên thành công");
            getLstThamGiaCv();
          } else {
            toast.error("Có lỗi xảy ra khi xóa");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Có lỗi xảy ra");
        });
    }
  };

  const closeModal = (refresh: boolean = false) => {
    setShowForm(false);
    setEditingModel(null);
    if (refresh) {
      getLstThamGiaCv();
    }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Danh sách thành viên tham gia công việc {cv.tenCongViec}</h5>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
        <div className="d-flex justify-content-end mb-3">
          {trangThai !== "DungHan" && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              Thêm thành viên
            </button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Tên NV</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listNv.map((item) => (
                <tr key={`${item.maNhanVien}`}>
                  <td>{item.maNhanVien}</td>
                  <td>{item?.hoTen}</td>
                  <td>
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(item.maNhanVien!, cv.maCongViec!)
                      }
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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel?.maNv
                    ? "Sửa nhân viên thực hiện công việc " + cv.tenCongViec
                    : "Thêm nhân viên thực hiện công việc " + cv.tenCongViec}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => closeModal()}
                ></button>
              </div>
              <div className="modal-body">
                <ThamGiaCongViecForm
                  type={type}
                  model={editingModel}
                  closeModal={closeModal}
                  congViec={cv}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThamGiaCongViecList;
