import React, { useState, useEffect, useCallback } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { CongDoanModel } from "../../../model/CongDoanModel";
import { CongDoanService } from "../../../services/CongDoanService";
import { DuanModel } from "../../../model/DuanModel";
import { RequestService } from "../../../services/RequestService";

interface CongDoanListProps {
  da: any;
  onClose: () => void;
}

const CongDoanList: React.FC<CongDoanListProps> = ({ da, onClose }) => {
  const [listData, setListData] = useState<any[]>([]);
  const [type, setType] = useState<"C" | "U">("C");
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<CongDoanModel | null>(null);
  const [showThucHienModal, setShowThucHienModal] = useState(false);
  const [selectedMaCd, setSelectedMaCd] = useState<string>("");

  const getLstCongDoan = () => {
    if (!da.ma_du_an) return;
    RequestService.getInstance()
      .getCongDoanDuAn(da.ma_du_an)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data.list;
          setListData(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  };

  useEffect(() => {
    getLstCongDoan();
  }, [da]);

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
                  <td>{item?.ten_cong_doan}</td>
                  <td>{item?.thu_tu}</td>
                  <td>{item?.ngay_bat_dau}</td>
                  <td>{item?.ngay_hoan_thanh_du_kien}</td>
                  <td>{item?.ngay_hoan_thanh_thuc_te}</td>
                  <td>{item?.ket_qua}</td>
                  <td>{item?.trang_thai_tien_do}</td>
                  <td>
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button> */}

                    {/* {item.trangThaiTienDo != "DaThucHien" && (
                      <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={() => handleThucHien(item)}
                      >
                        Người thực hiện
                      </button>
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* {showThucHienModal && editingModel && (
        <ThucHienCongDoanList
          congDoan={editingModel}
          onClose={closeThucHienModal}
        />
      )} */}
    </div>
  );
};

export default CongDoanList;
