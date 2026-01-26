import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../../services/ThucHienCongDoanService";
import { HttpStatusCode } from "axios";
import { NhanVienService } from "../../../services/NhanVienService";
import { NhanVienModel } from "../../../model/NhanVienModel";

export default function ThucHienCongDoanForm(props: any) {
  const [model, setModel] = useState<ThucHienCongDoanModel>(
    props.thucHienCongDoan ?? new ThucHienCongDoanModel(),
  );
  const [nhanVienList, setNhanVienList] = useState<NhanVienModel[]>([]);

  useEffect(() => {
    getLstNhanVien();
  }, []);

  const getLstNhanVien = async () => {
    try {
      const resp = await NhanVienService.getInstance().getLstNhanVien({});
      if (resp.status === HttpStatusCode.Ok) {
        setNhanVienList(resp.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.type === "U") {
      ThucHienCongDoanService.getInstance()
        .updateThucHienCongDoan(model)
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
        .insertThucHienCongDoan(model)
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
                  <label htmlFor="maNv" className="form-label">
                    Nhân viên
                  </label>
                  <select
                    className="form-control"
                    id="maNv"
                    name="maNv"
                    value={model.maNv ?? ""}
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Chọn nhân viên</option>
                    {nhanVienList.map((nv) => (
                      <option key={nv.maNv} value={nv.maNv}>
                        {nv.hoTen} ({nv.maNv})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="maCd" className="form-label">
                    Mã CD
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="maCd"
                    name="maCd"
                    value={model.maCd ?? ""}
                    onChange={handleChange}
                    readOnly
                  />
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
