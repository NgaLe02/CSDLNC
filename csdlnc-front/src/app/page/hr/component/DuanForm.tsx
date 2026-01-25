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
    if (model.ma_da) {
      DuanService.getInstance()
        .updateDuan(model.ma_da, model)
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
            <label htmlFor="ma_da" className="form-label">
              Mã DA
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_da"
              name="ma_da"
              value={model.ma_da ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ten_da" className="form-label">
              Tên DA
            </label>
            <input
              type="text"
              className="form-control"
              id="ten_da"
              name="ten_da"
              value={model.ten_da ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loai_da" className="form-label">
              Loại DA
            </label>
            <input
              type="text"
              className="form-control"
              id="loai_da"
              name="loai_da"
              value={model.loai_da ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="so_nhan_vien_toi_da" className="form-label">
              Số NV Tối Đa
            </label>
            <input
              type="number"
              className="form-control"
              id="so_nhan_vien_toi_da"
              name="so_nhan_vien_toi_da"
              value={model.so_nhan_vien_toi_da ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ma_phong_ql" className="form-label">
              Mã Phòng QL
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_phong_ql"
              name="ma_phong_ql"
              value={model.ma_phong_ql ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ma_nv_chu_tri" className="form-label">
              Mã NV Chủ Trì
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_nv_chu_tri"
              name="ma_nv_chu_tri"
              value={model.ma_nv_chu_tri ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngay_bat_dau" className="form-label">
              Ngày Bắt Đầu
            </label>
            <input
              type="date"
              className="form-control"
              id="ngay_bat_dau"
              name="ngay_bat_dau"
              value={model.ngay_bat_dau ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngay_ket_thuc_du_kien" className="form-label">
              Ngày Kết Thúc Dự Kiến
            </label>
            <input
              type="date"
              className="form-control"
              id="ngay_ket_thuc_du_kien"
              name="ngay_ket_thuc_du_kien"
              value={model.ngay_ket_thuc_du_kien ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="trang_thai" className="form-label">
              Trạng Thái
            </label>
            <select
              className="form-control"
              id="trang_thai"
              name="trang_thai"
              value={model.trang_thai ?? ""}
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
