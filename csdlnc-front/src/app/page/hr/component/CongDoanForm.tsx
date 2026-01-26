import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { CongDoanModel } from "../../../model/CongDoanModel";
import { CongDoanService } from "../../../services/CongDoanService";

export default function CongDoanForm(props: any) {
  const [model, setModel] = useState<CongDoanModel>(
    props.congDoan ?? new CongDoanModel(),
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
    // Format dates to DD-MM-YYYY before sending
    const formattedModel = {
      ...model,
      ngayBatDau: model.ngayBatDau
        ? dayjs(model.ngayBatDau).format("DD-MM-YYYY")
        : model.ngayBatDau,
      ngayHoanThanhThucTe: model.ngayHoanThanhThucTe
        ? dayjs(model.ngayHoanThanhThucTe).format("DD-MM-YYYY")
        : model.ngayHoanThanhThucTe,
    };
    if (props.type === "U") {
      CongDoanService.getInstance()
        .updateCongDoan(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật công đoạn thành công");
            props.onClose(true);
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
      CongDoanService.getInstance()
        .insertCongDoan(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm công đoạn thành công");
            props.onClose(true);
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

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.type === "U" ? "Cập nhật công đoạn" : "Thêm công đoạn"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => props.onClose(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="bg-light rounded p-4"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-12">
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
                      readOnly
                    />
                  </div>
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
                <div className="row mb-3">
                  <div className="col-6">
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
                  <div className="col-6">
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
                </div>

                <div className="row mb-3">
                  <div className="col-6">
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
                  <div className="col-6">
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

                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
