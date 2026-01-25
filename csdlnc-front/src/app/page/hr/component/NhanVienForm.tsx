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
    if (model.maNv) {
      NhanVienService.getInstance()
        .updateNhanVien(model.maNv, model)
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
            <label htmlFor="hoTen" className="form-label">
              Họ Tên
            </label>
            <input
              type="text"
              className="form-control"
              id="hoTen"
              name="hoTen"
              value={model.hoTen ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngaySinh" className="form-label">
              Ngày Sinh
            </label>
            <input
              type="date"
              className="form-control"
              id="ngaySinh"
              name="ngaySinh"
              value={model.ngaySinh ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gioiTinh" className="form-label">
              Giới Tính
            </label>
            <select
              className="form-control"
              id="gioiTinh"
              name="gioiTinh"
              value={model.gioiTinh ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="chucVu" className="form-label">
              Chức Vụ
            </label>
            <select
              className="form-control"
              id="chucVu"
              name="chucVu"
              value={model.chucVu ?? ""}
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
            <label htmlFor="bacLuong" className="form-label">
              Bậc Lương
            </label>
            <input
              type="number"
              className="form-control"
              id="bacLuong"
              name="bacLuong"
              value={model.bacLuong ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="luongCoBan" className="form-label">
              Lương Cơ Bản
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="luongCoBan"
              name="luongCoBan"
              value={model.luongCoBan ?? ""}
              onChange={handleChange}
              required
            />
          </div>
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
