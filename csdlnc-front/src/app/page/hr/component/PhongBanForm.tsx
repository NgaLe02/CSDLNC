import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
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
    // Format ngayThanhLap to DD-MM-YYYY before sending
    const formattedModel = {
      ...model,
      ngayThanhLap: model.ngayThanhLap
        ? dayjs(model.ngayThanhLap).format("YYYY-MM-DD")
        : model.ngayThanhLap,
    };
    if (model.maPhongBan) {
      PhongBanService.getInstance()
        .updatePhongBan(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật phòng ban thành công");
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
      PhongBanService.getInstance()
        .insertPhongBan(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm phòng ban thành công");
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="maPhongBan" className="form-label">
              Mã Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="maPhongBan"
              name="maPhongBan"
              value={model.maPhongBan ?? ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenPhongBan" className="form-label">
              Tên Phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="tenPhongBan"
              name="tenPhongBan"
              value={model.tenPhongBan ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Loại phòng</label>
            <select
              className="form-control"
              name="loaiPhong"
              value={model.loaiPhong ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn loại phòng</option>
              <option value="PHONG_NHAN_SU">Phòng nhân sự</option>
              <option value="PHONG_QUAN_LY_DU_AN">Phòng quản lý dự án</option>
              <option value="Khác">Khác</option>
            </select>
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
