import { useState } from "react";
import { toast } from "react-toastify";
import { PhongBanModel } from "../../../model/PhongBanModel";
import { PhongBanService } from "../../../services/PhongBanService";

export default function PhongBanForm(props: any) {
  const [model, setModel] = useState<PhongBanModel>(
    props.model ?? new PhongBanModel(),
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
    if (model.ma_phong) {
      PhongBanService.getInstance()
        .updatePhongBan(model.ma_phong, model)
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
      PhongBanService.getInstance()
        .insertPhongBan(model)
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
            <label htmlFor="ma_phong" className="form-label">
              Mã Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_phong"
              name="ma_phong"
              value={model.ma_phong ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ten_phong" className="form-label">
              Tên Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="ten_phong"
              name="ten_phong"
              value={model.ten_phong ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mo_ta" className="form-label">
              Mô tả
            </label>
            <textarea
              className="form-control"
              id="mo_ta"
              name="mo_ta"
              value={model.mo_ta ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngay_thanh_lap" className="form-label">
              Ngày Thành Lập
            </label>
            <input
              type="date"
              className="form-control"
              id="ngay_thanh_lap"
              name="ngay_thanh_lap"
              value={model.ngay_thanh_lap ?? ""}
              onChange={handleChange}
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
