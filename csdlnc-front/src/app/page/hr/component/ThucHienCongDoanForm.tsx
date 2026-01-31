import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../../services/ThucHienCongDoanService";
import { HttpStatusCode } from "axios";
import { NhanVienService } from "../../../services/NhanVienService";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { CongDoanService } from "../../../services/CongDoanService";
import { DuanService } from "../../../services/DuanService";
import { CongDoanModel } from "../../../model/CongDoanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";

export default function ThucHienCongDoanForm(props: any) {
  const [model, setModel] = useState<ThucHienCongDoanModel>(
    props.thucHienCongDoan ?? new ThucHienCongDoanModel(),
  );
  const [congDoan, setCongDoan] = useState<CongDoanModel>(
    props.congDoan ?? new CongDoanModel(),
  );
  const [nhanVienList, setNhanVienList] = useState<any[]>([]);

  const getLstNhanVien = () => {
    CongDoanService.getInstance()
      .getNhanVienTheoCongDoan(congDoan.maDuAn!, congDoan.sttCongDoan!)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setNhanVienList(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (congDoan.maDuAn && congDoan.sttCongDoan) {
      getLstNhanVien();
    }
  }, [congDoan.maDuAn, congDoan.sttCongDoan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedModel = {
      ...model,
      sttCongDoan: congDoan.sttCongDoan,
      maDuAn: congDoan.maDuAn,
    };

    if (props.type === "U") {
      ThucHienCongDoanService.getInstance()
        .updateThucHienCongDoan(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật thành công");
            props.onClose(true);
          } else {
            toast.error("Có lỗi xảy ra khi cập nhật");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message || "Có lỗi xảy ra");
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    } else {
      ThucHienCongDoanService.getInstance()
        .insertThucHienCongDoan(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm thành công");
            props.onClose(true);
          } else {
            toast.error("Có lỗi xảy ra khi thêm");
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

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.type === "U"
                ? "Cập nhật người thực hiện"
                : "Thêm người thực hiện"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => props.onClose(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="bg-light rounded p-4"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="maNhanVien" className="form-label">
                    Nhân viên
                  </label>
                  <select
                    className="form-control"
                    id="maNhanVien"
                    name="maNhanVien"
                    value={model.maNhanVien ?? ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn nhân viên</option>
                    {nhanVienList.map((nv) => (
                      <option key={nv.maNv} value={nv.maNv}>
                        {nv.hoTen} ({nv.thang}/{nv.nam})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="vaiTro" className="form-label">
                    Vai Trò
                  </label>
                  <select
                    className="form-control"
                    id="vaiTro"
                    name="vaiTro"
                    value={model.vaiTro ?? ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="ThanhVien">Thành viên</option>
                    <option value="ChuTri">Chủ trì</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
