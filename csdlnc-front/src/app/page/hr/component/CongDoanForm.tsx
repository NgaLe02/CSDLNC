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
    if (model.maCd) {
      CongDoanService.getInstance()
        .updateCongDoan(model.maCd, model)
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
            <label htmlFor="maCd" className="form-label">
              Mã CD
            </label>
            <input
              type="text"
              className="form-control"
              id="maCd"
              name="maCd"
              value={model.maCd ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenCongDoan" className="form-label">
              Tên Công Đoạn
            </label>
            <input
              type="text"
              className="form-control"
              id="tenCongDoan"
              name="tenCongDoan"
              value={model.tenCongDoan ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thuTu" className="form-label">
              Thứ Tự
            </label>
            <input
              type="number"
              className="form-control"
              id="thuTu"
              name="thuTu"
              value={model.thuTu ?? ""}
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
            <label htmlFor="soNgayHoanThanh" className="form-label">
              Số Ngày Hoàn Thành
            </label>
            <input
              type="number"
              className="form-control"
              id="soNgayHoanThanh"
              name="soNgayHoanThanh"
              value={model.soNgayHoanThanh ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngayHoanThanhThucTe" className="form-label">
              Ngày Hoàn Thành Thực Tế
            </label>
            <input
              type="date"
              className="form-control"
              id="ngayHoanThanhThucTe"
              name="ngayHoanThanhThucTe"
              value={model.ngayHoanThanhThucTe ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ketQua" className="form-label">
              Kết Quả
            </label>
            <textarea
              className="form-control"
              id="ketQua"
              name="ketQua"
              value={model.ketQua ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="trangThaiTienDo" className="form-label">
              Trạng Thái Tiến Độ
            </label>
            <select
              className="form-control"
              id="trangThaiTienDo"
              name="trangThaiTienDo"
              value={model.trangThaiTienDo ?? ""}
              onChange={handleSelectChange}
            >
              <option value="">Chọn trạng thái</option>
              <option value="DungHan">DungHan</option>
              <option value="TreHan">TreHan</option>
            </select>
          </div>
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
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
