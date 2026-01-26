import { useState } from "react";
import { toast } from "react-toastify";
import { CongViecModel } from "../../../model/CongViecModel";
import { CongViecService } from "../../../services/CongViecService";

export default function CongViecForm(props: any) {
  const [model, setModel] = useState<CongViecModel>(
    props.model ?? new CongViecModel(),
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
    if (model.maCv) {
      CongViecService.getInstance()
        .updateCongViec(model)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật công việc thành công");
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
      CongViecService.getInstance()
        .insertCongViec(model)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm công việc thành công");
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

  return (
    <div className="col-sm-12 col-xl-12">
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="maCv" className="form-label">
              Mã CV
            </label>
            <input
              type="text"
              className="form-control"
              id="maCv"
              name="maCv"
              value={model.maCv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenCv" className="form-label">
              Tên Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="tenCv"
              name="tenCv"
              value={model.tenCv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loaiCv" className="form-label">
              Loại Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="loaiCv"
              name="loaiCv"
              value={model.loaiCv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mucLuongNangSuat" className="form-label">
              Mức Lương Năng Suất
            </label>
            <input
              type="number"
              className="form-control"
              id="mucLuongNangSuat"
              name="mucLuongNangSuat"
              value={model.mucLuongNangSuat ?? ""}
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
