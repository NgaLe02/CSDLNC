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
    if (model.ma_nv && model.ma_cv) {
      ThucHienCongViecService.getInstance()
        .updateThucHienCongViec(model.ma_nv, model.ma_cv, model)
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
      ThucHienCongViecService.getInstance()
        .insertThucHienCongViec(model)
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
            <label htmlFor="ma_nv" className="form-label">
              Mã NV
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_nv"
              name="ma_nv"
              value={model.ma_nv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ma_cv" className="form-label">
              Mã CV
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_cv"
              name="ma_cv"
              value={model.ma_cv ?? ""}
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
            <label htmlFor="ket_qua" className="form-label">
              Kết Quả
            </label>
            <textarea
              className="form-control"
              id="ket_qua"
              name="ket_qua"
              value={model.ket_qua ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dung_han" className="form-label">
              Đúng Hạn
            </label>
            <select
              className="form-control"
              id="dung_han"
              name="dung_han"
              value={model.dung_han?.toString() ?? ""}
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
