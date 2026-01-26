import { useState } from "react";
import { toast } from "react-toastify";
import { ThucHienCongViecModel } from "../../../model/ThucHienCongViecModel";
import { ThucHienCongViecService } from "../../../services/ThucHienCongViecService";

export default function ThucHienCongViecForm(props: any) {
  const [model, setModel] = useState<ThucHienCongViecModel>(
    props.model ?? new ThucHienCongViecModel(),
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
    if (model.maNv && model.maCv) {
      ThucHienCongViecService.getInstance()
        .updateThucHienCongViec(model)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật thực hiện công việc thành công");
            props.closeModal(true);
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
      ThucHienCongViecService.getInstance()
        .insertThucHienCongViec(model)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm thực hiện công việc thành công");
            props.closeModal(true);
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
    <div className="col-sm-12 col-xl-12">
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
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
            <label htmlFor="maCv" className="form-label">
              Mã CV
            </label>
            <input
              type="text"
              className="form-control"
              id="maCv"
              name="maCv"
              value={model.maCv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thang" className="form-label">
              Tháng
            </label>
            <input
              type="number"
              className="form-control"
              id="thang"
              name="thang"
              value={model.thang ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nam" className="form-label">
              Năm
            </label>
            <input
              type="number"
              className="form-control"
              id="nam"
              name="nam"
              value={model.nam ?? ""}
              onChange={handleChange}
              required
            />
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
