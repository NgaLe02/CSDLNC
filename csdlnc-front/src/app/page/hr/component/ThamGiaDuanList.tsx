import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import ThamGiaDuanForm from "./ThamGiaDuanForm";
import { ThamGiaDuanModel } from "../../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";
import { DuanModel } from "../../../model/DuanModel";

interface ThamGiaDuanListProps {
  da: DuanModel;
  onClose: () => void;
  trangThai?: string;
}

const ThamGiaDuanList: React.FC<ThamGiaDuanListProps> = ({
  da,
  onClose,
  trangThai,
}) => {
  const [listData, setListData] = useState<ThamGiaDuanModel[]>([]);
  const [type, setType] = useState<"C" | "U">("C");
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<ThamGiaDuanModel | null>(
    null,
  );
  useEffect(() => {
    if (da.maDuAn) {
      getLstThamGiaDuan();
    }
  }, [da]);

  const getLstThamGiaDuan = async () => {
    ThamGiaDuanService.getInstance()
      .getLstThamGiaDuanOfDuAn({ maDa: da.maDuAn! })
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
    setEditingModel(new ThamGiaDuanModel({ maDa: da.maDuAn }));
    setType("C");
    setShowForm(true);
  };

  const handleEdit = (model: ThamGiaDuanModel) => {
    setEditingModel(model);
    setType("U");
    setShowForm(true);
  };

  const handleDelete = (
    maNv: string,
    maDa: string,
    thang: number,
    nam: number,
  ) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      ThamGiaDuanService.getInstance()
        .deleteThamGiaDuan({ maNv, maDa, thang, nam })
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa tham gia dự án thành công");
            getLstThamGiaDuan();
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
      getLstThamGiaDuan();
    }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Danh sách thành viên dự án {da.tenDuAn}</h5>
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
                <th>Vai trò</th>
                <th>Tháng</th>
                <th>Năm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item) => (
                <tr key={`${item.maNv}-${item.maDa}`}>
                  <td>{item.maNv}</td>
                  <td>{item?.nhanVien?.hoTen}</td>
                  <td>{item.vaiTro}</td>
                  <td>{item.thang}</td>
                  <td>{item.nam}</td>
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
                        handleDelete(
                          item.maNv!,
                          item.maDa!,
                          item.thang!,
                          item.nam!,
                        )
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
                    ? "Sửa nhân viên tham gia dự án " + da.tenDuAn
                    : "Thêm nhân viên tham gia dự án " + da.tenDuAn}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => closeModal()}
                ></button>
              </div>
              <div className="modal-body">
                <ThamGiaDuanForm
                  type={type}
                  model={editingModel}
                  closeModal={closeModal}
                  duAn={da}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThamGiaDuanList;
