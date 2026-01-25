import { useState } from "react";
import { toast } from "react-toastify";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { NhanVienService } from "../../../services/NhanVienService";

export default function NhanVienForm(props: any) {
  const [model, setModel] = useState<NhanVienModel>(
    props.model ?? new NhanVienModel(),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (model.ma_nv) {
      NhanVienService.getInstance()
        .updateNhanVien(model.ma_nv, model)
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
      NhanVienService.getInstance()
        .insertNhanVien(model)
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
            <label htmlFor="ho_ten" className="form-label">
              Họ Tên
            </label>
            <input
              type="text"
              className="form-control"
              id="ho_ten"
              name="ho_ten"
              value={model.ho_ten ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngay_sinh" className="form-label">
              Ngày Sinh
            </label>
            <input
              type="date"
              className="form-control"
              id="ngay_sinh"
              name="ngay_sinh"
              value={model.ngay_sinh ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gioi_tinh" className="form-label">
              Giới Tính
            </label>
            <select
              className="form-control"
              id="gioi_tinh"
              name="gioi_tinh"
              value={model.gioi_tinh ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="chuc_vu" className="form-label">
              Chức Vụ
            </label>
            <select
              className="form-control"
              id="chuc_vu"
              name="chuc_vu"
              value={model.chuc_vu ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn chức vụ</option>
              <option value="NhanVien">Nhân Viên</option>
              <option value="TruongPhong">Trưởng Phòng</option>
              <option value="PhoPhong">Phó Phòng</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bac_luong" className="form-label">
              Bậc Lương
            </label>
            <input
              type="number"
              className="form-control"
              id="bac_luong"
              name="bac_luong"
              value={model.bac_luong ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="luong_co_ban" className="form-label">
              Lương Cơ Bản
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="luong_co_ban"
              name="luong_co_ban"
              value={model.luong_co_ban ?? ""}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
