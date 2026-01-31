import React, { useState, useEffect, useCallback } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import ThucHienCongDoanForm from "./ThucHienCongDoanForm";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../../services/ThucHienCongDoanService";
import { CongDoanModel } from "../../../model/CongDoanModel";

interface ThucHienCongDoanListProps {
  congDoan: CongDoanModel;
  onClose: () => void;
}

const ThucHienCongDoanList: React.FC<ThucHienCongDoanListProps> = ({
  congDoan,
  onClose,
}) => {
  const [listData, setListData] = useState<ThucHienCongDoanModel[]>([]);
  const [type, setType] = useState<"C" | "U">("C");
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] =
    useState<ThucHienCongDoanModel | null>(null);

  useEffect(() => {
    if (congDoan.maDuAn && congDoan.sttCongDoan) {
      getLstThucHienCongDoan();
    }
  }, [congDoan.maDuAn, congDoan.sttCongDoan]);

  const getLstThucHienCongDoan = () => {
    ThucHienCongDoanService.getInstance()
      .getLstThucHienCongDoan({
        maDuAn: congDoan.maDuAn!,
        sttCongDoan: congDoan.sttCongDoan!,
      })
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
    setType("C");
    setEditingModel(new ThucHienCongDoanModel({ maDuAn: congDoan.maDuAn }));
    setShowForm(true);
  };

  const handleEdit = (model: ThucHienCongDoanModel) => {
    setType("U");
    setEditingModel(model);
    setShowForm(true);
  };

  const handleDelete = async (maNv: string, sttCd: string, maDuAn: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        const resp =
          await ThucHienCongDoanService.getInstance().deleteThucHienCongDoan(
            maNv,
            sttCd,
            maDuAn,
          );
        if (resp.status === 204) {
          toast.success("Xóa thành công");
          getLstThucHienCongDoan();
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa");
      }
    }
  };

  const closeModal = (refresh: boolean = false) => {
    setShowForm(false);
    setEditingModel(null);
    if (refresh) {
      getLstThucHienCongDoan();
    }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Danh sách người thực hiện công đoạn {congDoan.tenCongDoan}</h5>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            Thêm người thực hiện
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Mã CD</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item) => (
                <tr key={`${item.maNhanVien}-${item.sttCongDoan}`}>
                  <td>{item.maNhanVien}</td>
                  <td>{item.sttCongDoan}</td>
                  <td>{item.vaiTro}</td>
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
                      onClick={() =>
                        handleDelete(
                          item.maNhanVien!,
                          item.sttCongDoan!,
                          item.maDuAn!,
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

      {showForm && editingModel && (
        <ThucHienCongDoanForm
          congDoan={congDoan}
          thucHienCongDoan={editingModel}
          type={type}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ThucHienCongDoanList;
