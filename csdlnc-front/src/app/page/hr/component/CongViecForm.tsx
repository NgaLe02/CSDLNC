import { useState } from "react";
import { toast } from "react-toastify";
import { CongViecModel } from "../../../model/CongViecModel";
import { CongViecService } from "../../../services/CongViecService";

export default function CongViecForm(props: any) {
  const [model, setModel] = useState<CongViecModel>(
    props.model ?? new CongViecModel(),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.ma_cv) {
      CongViecService.getInstance()
        .updateCongViec(model.ma_cv, model)
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
      CongViecService.getInstance()
        .insertCongViec(model)
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
            <label htmlFor="ten_cv" className="form-label">
              Tên Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="ten_cv"
              name="ten_cv"
              value={model.ten_cv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loai_cv" className="form-label">
              Loại Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="loai_cv"
              name="loai_cv"
              value={model.loai_cv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="muc_luong_nang_suat" className="form-label">
              Mức Lương Năng Suất
            </label>
            <input
              type="number"
              className="form-control"
              id="muc_luong_nang_suat"
              name="muc_luong_nang_suat"
              value={model.muc_luong_nang_suat ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
