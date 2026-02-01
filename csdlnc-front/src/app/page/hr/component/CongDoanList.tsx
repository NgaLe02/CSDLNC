import React, { useState, useEffect, useCallback } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import CongDoanForm from "./CongDoanForm";
import { CongDoanModel } from "../../../model/CongDoanModel";
import { CongDoanService } from "../../../services/CongDoanService";
import ThucHienCongDoanList from "./ThucHienCongDoanList";
import { DuanModel } from "../../../model/DuanModel";

interface CongDoanListProps {
  da: DuanModel;
  onClose: () => void;
}

const CongDoanList: React.FC<CongDoanListProps> = ({ da, onClose }) => {
  const [listData, setListData] = useState<CongDoanModel[]>([]);
  const [type, setType] = useState<"C" | "U">("C");
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<CongDoanModel | null>(null);
  const [showThucHienModal, setShowThucHienModal] = useState(false);
  const [selectedMaCd, setSelectedMaCd] = useState<string>("");

  const getLstCongDoan = () => {
    if (!da.maDuAn) return;
    CongDoanService.getInstance()
      .getLstCongDoanByMaDuAn(da.maDuAn)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListData(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLstCongDoan();
  }, [da]);

  const handleAdd = () => {
    setType("C");
    setEditingModel(new CongDoanModel({ maDuAn: da.maDuAn }));
    setShowForm(true);
  };

  const handleEdit = (model: CongDoanModel) => {
    setType("U");
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = async (maDuAn: string, sttCongDoan: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công đoạn này?")) {
      try {
        // Note: Assuming delete method exists, adjust if needed
        const resp = await CongDoanService.getInstance().deleteCongDoan({
          maDuAn,
          sttCongDoan,
        });
        if (resp.status === 204) {
          toast.success("Xóa công đoạn thành công");
          getLstCongDoan();
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa");
      }
    }
  };

  const handleThucHien = (item: any) => {
    setEditingModel(item);
    setSelectedMaCd(item.maCd);
    setShowThucHienModal(true);
  };

  const closeModal = (refresh: boolean = false) => {
    setShowForm(false);
    setEditingModel(null);
    if (refresh) {
      getLstCongDoan();
    }
  };

  const closeThucHienModal = (refresh: boolean = false) => {
    setShowThucHienModal(false);
    setSelectedMaCd("");
    if (refresh) {
      getLstCongDoan();
    }
  };

  return (
    <div className="col-sm-12 col-xl-12" style={{ maxHeight: "600px" }}>
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Danh sách công đoạn dự án {da.tenDuAn}</h5>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            Thêm công đoạn
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Tên công đoạn</th>
                <th>Thứ tự</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày hoàn thành dự kiến</th>
                <th>Ngày hoàn thành thực tế</th>
                <th>Kết quả</th>
                <th>Trạng thái tiến độ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item, index) => (
                <tr key={index}>
                  <td>{item.tenCongDoan}</td>
                  <td>{item.thuTu}</td>
                  <td>{item.ngayBatDau}</td>
                  <td>{item.ngayHoanThanhDuKien}</td>
                  <td>{item.ngayHoanThanhThucTe}</td>
                  <td>{item.ketQua}</td>
                  <td>{item.trangThaiTienDo}</td>
                  <td>
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button> */}
                    {item.trangThaiTienDo != "DaThucHien" &&
                      item.trangThaiTienDo != "DangThucHien" && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger me-2"
                          onClick={() =>
                            handleDelete(item.maDuAn!, item.sttCongDoan!)
                          }
                        >
                          Xóa
                        </button>
                      )}
                    {item.trangThaiTienDo != "DaThucHien" && (
                      <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={() => handleThucHien(item)}
                      >
                        Người thực hiện
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && editingModel && (
        <CongDoanForm
          congDoan={editingModel}
          type={type}
          onClose={closeModal}
        />
      )}

      {showThucHienModal && editingModel && (
        <ThucHienCongDoanList
          congDoan={editingModel}
          onClose={closeThucHienModal}
        />
      )}
    </div>
  );
};

export default CongDoanList;
