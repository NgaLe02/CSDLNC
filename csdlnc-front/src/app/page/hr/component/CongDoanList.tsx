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

  const getLstCongDoan = useCallback(async () => {
    try {
      const resp = await CongDoanService.getInstance().getLstCongDoan({
        maDa: da.maDuAn,
      });
      if (resp.status === HttpStatusCode.Ok) {
        setListData(resp.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách công đoạn:", error);
    }
  }, [da]);

  useEffect(() => {
    getLstCongDoan();
  }, [getLstCongDoan]);

  const handleAdd = () => {
    setType("C");
    setEditingModel(new CongDoanModel({ maDa: da.maDuAn }));
    setShowForm(true);
  };

  const handleEdit = (model: CongDoanModel) => {
    setType("U");
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = async (maCd: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công đoạn này?")) {
      try {
        // Note: Assuming delete method exists, adjust if needed
        const resp = await CongDoanService.getInstance().deleteCongDoan(maCd);
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
    <div className="col-sm-12 col-xl-12">
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
                <th>Mã CD</th>
                <th>Tên công đoạn</th>
                <th>Thứ tự</th>
                <th>Ngày bắt đầu</th>
                <th>Số ngày hoàn thành</th>
                <th>Ngày hoàn thành thực tế</th>
                <th>Kết quả</th>
                <th>Trạng thái tiến độ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item) => (
                <tr key={item.maCd}>
                  <td>{item.maCd}</td>
                  <td>{item.tenCongDoan}</td>
                  <td>{item.thuTu}</td>
                  <td>{item.ngayBatDau}</td>
                  <td>{item.soNgayHoanThanh}</td>
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
                    <button
                      type="button"
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDelete(item.maCd!)}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={() => handleThucHien(item)}
                    >
                      Người thực hiện
                    </button>
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
          maCd={selectedMaCd}
          maDa={da.maDuAn!}
          onClose={closeThucHienModal}
        />
      )}
    </div>
  );
};

export default CongDoanList;
