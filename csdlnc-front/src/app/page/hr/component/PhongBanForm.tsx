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
    if (model.maPhong) {
      PhongBanService.getInstance()
        .updatePhongBan(model)
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
            <label htmlFor="maPhong" className="form-label">
              Mã Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="maPhong"
              name="maPhong"
              value={model.maPhong ?? ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenPhong" className="form-label">
              Tên Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="tenPhong"
              name="tenPhong"
              value={model.tenPhong ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="moTa" className="form-label">
              Mô tả
            </label>
            <textarea
              className="form-control"
              id="moTa"
              name="moTa"
              value={model.moTa ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngayThanhLap" className="form-label">
              Ngày Thành Lập
            </label>
            <input
              type="date"
              className="form-control"
              id="ngayThanhLap"
              name="ngayThanhLap"
              value={model.ngayThanhLap ?? ""}
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
