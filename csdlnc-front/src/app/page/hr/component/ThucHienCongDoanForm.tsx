import { useState } from "react";
import { toast } from "react-toastify";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../../services/ThucHienCongDoanService";

export default function ThucHienCongDoanForm(props: any) {
  const [model, setModel] = useState<ThucHienCongDoanModel>(
    props.model ?? new ThucHienCongDoanModel(),
  );

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
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.maNv && model.maCd) {
      ThucHienCongDoanService.getInstance()
        .updateThucHienCongDoan(model.maNv, model.maCd, model)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            props.closeModal(true);
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    } else {
      ThucHienCongDoanService.getInstance()
        .insertThucHienCongDoan(model)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            props.closeModal(true);
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="maNv" className="form-label">
              Mã NV
            </label>
            <input
              type="text"
              className="form-control"
              id="maNv"
              name="maNv"
              value={model.maNv ?? ""}
              onChange={handleChange}
              required
            />
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
              required
            />
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
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="ThucHien">ThucHien</option>
              <option value="ChuTri">ChuTri</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ketQua" className="form-label">
              Kết Quả
            </label>
            <textarea
              className="form-control"
              id="ketQua"
              name="ketQua"
              value={model.ketQua ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dungHan" className="form-label">
              Đúng Hạn
            </label>
            <select
              className="form-control"
              id="dungHan"
              name="dungHan"
              value={model.dungHan?.toString() ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn</option>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
