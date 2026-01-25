import { useState } from "react";
import { toast } from "react-toastify";
import { DuanModel } from "../../../model/DuanModel";
import { DuanService } from "../../../services/DuanService";

export default function DuanForm(props: any) {
  const [model, setModel] = useState<DuanModel>(props.model ?? new DuanModel());

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
    if (model.maDa) {
      DuanService.getInstance()
        .updateDuan(model.maDa, model)
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
      DuanService.getInstance()
        .insertDuan(model)
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
            <label htmlFor="maDa" className="form-label">
              Mã DA
            </label>
            <input
              type="text"
              className="form-control"
              id="maDa"
              name="maDa"
              value={model.maDa ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenDa" className="form-label">
              Tên DA
            </label>
            <input
              type="text"
              className="form-control"
              id="tenDa"
              name="tenDa"
              value={model.tenDa ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loaiDa" className="form-label">
              Loại DA
            </label>
            <input
              type="text"
              className="form-control"
              id="loaiDa"
              name="loaiDa"
              value={model.loaiDa ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="soNhanVienToiDa" className="form-label">
              Số NV Tối Đa
            </label>
            <input
              type="number"
              className="form-control"
              id="soNhanVienToiDa"
              name="soNhanVienToiDa"
              value={model.soNhanVienToiDa ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maPhongQl" className="form-label">
              Mã Phòng QL
            </label>
            <input
              type="text"
              className="form-control"
              id="maPhongQl"
              name="maPhongQl"
              value={model.maPhongQl ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maNvChuTri" className="form-label">
              Mã NV Chủ Trì
            </label>
            <input
              type="text"
              className="form-control"
              id="maNvChuTri"
              name="maNvChuTri"
              value={model.maNvChuTri ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngayBatDau" className="form-label">
              Ngày Bắt Đầu
            </label>
            <input
              type="date"
              className="form-control"
              id="ngayBatDau"
              name="ngayBatDau"
              value={model.ngayBatDau ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngayKetThucDuKien" className="form-label">
              Ngày Kết Thúc Dự Kiến
            </label>
            <input
              type="date"
              className="form-control"
              id="ngayKetThucDuKien"
              name="ngayKetThucDuKien"
              value={model.ngayKetThucDuKien ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="trangThai" className="form-label">
              Trạng Thái
            </label>
            <select
              className="form-control"
              id="trangThai"
              name="trangThai"
              value={model.trangThai ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn trạng thái</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Chưa bắt đầu">Chưa bắt đầu</option>
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
