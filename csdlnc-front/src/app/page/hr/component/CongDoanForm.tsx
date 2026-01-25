import { useState } from "react";
import { toast } from "react-toastify";
import { CongDoanModel } from "../../../model/CongDoanModel";
import { CongDoanService } from "../../../services/CongDoanService";

export default function CongDoanForm(props: any) {
  const [model, setModel] = useState<CongDoanModel>(
    props.model ?? new CongDoanModel(),
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.ma_cd) {
      CongDoanService.getInstance()
        .updateCongDoan(model.ma_cd, model)
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
      CongDoanService.getInstance()
        .insertCongDoan(model)
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
            <label htmlFor="ma_cd" className="form-label">
              Mã CD
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_cd"
              name="ma_cd"
              value={model.ma_cd ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ten_cong_doan" className="form-label">
              Tên Công Đoạn
            </label>
            <input
              type="text"
              className="form-control"
              id="ten_cong_doan"
              name="ten_cong_doan"
              value={model.ten_cong_doan ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thu_tu" className="form-label">
              Thứ Tự
            </label>
            <input
              type="number"
              className="form-control"
              id="thu_tu"
              name="thu_tu"
              value={model.thu_tu ?? ""}
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
            <label htmlFor="so_ngay_hoan_thanh" className="form-label">
              Số Ngày Hoàn Thành
            </label>
            <input
              type="number"
              className="form-control"
              id="so_ngay_hoan_thanh"
              name="so_ngay_hoan_thanh"
              value={model.so_ngay_hoan_thanh ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngay_hoan_thanh_thuc_te" className="form-label">
              Ngày Hoàn Thành Thực Tế
            </label>
            <input
              type="date"
              className="form-control"
              id="ngay_hoan_thanh_thuc_te"
              name="ngay_hoan_thanh_thuc_te"
              value={model.ngay_hoan_thanh_thuc_te ?? ""}
              onChange={handleChange}
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
            <label htmlFor="trang_thai_tien_do" className="form-label">
              Trạng Thái Tiến Độ
            </label>
            <select
              className="form-control"
              id="trang_thai_tien_do"
              name="trang_thai_tien_do"
              value={model.trang_thai_tien_do ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn trạng thái</option>
              <option value="DungHan">DungHan</option>
              <option value="TreHan">TreHan</option>
            </select>
          </div>
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
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
