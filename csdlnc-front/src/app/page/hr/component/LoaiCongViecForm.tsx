import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoaiCongViecModel } from "../../../model/LoaiCongViecModel";
import { LoaiCongViecService } from "../../../services/LoaiCongViecService";

export default function LoaiCongViecForm(props: any) {
  const [model, setModel] = useState<LoaiCongViecModel>(
    new LoaiCongViecModel(),
  );

  useEffect(() => {
    if (props.model) {
      setModel(props.model);
    }
  }, [props.model]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.maLoaiCv) {
      LoaiCongViecService.getInstance()
        .updateLoaiCv(model)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật loại công việc thành công");
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
      LoaiCongViecService.getInstance()
        .insertLoaiCv(model)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm loại công việc thành công");
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
            <label htmlFor="maLoaiCv" className="form-label">
              Mã Loại Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="maLoaiCv"
              name="maLoaiCv"
              value={model?.maLoaiCv ?? ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenLoaiCongViec" className="form-label">
              Tên Loại Công Việc
            </label>
            <input
              type="text"
              className="form-control"
              id="tenLoaiCongViec"
              name="tenLoaiCongViec"
              value={model?.tenLoaiCongViec ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mucLuongNangSuat" className="form-label">
              Mức lương năng suất
            </label>
            <input
              type="number"
              className="form-control"
              id="mucLuongNangSuat"
              name="mucLuongNangSuat"
              value={model?.mucLuongNangSuat ?? ""}
              onChange={handleNumberChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {model?.maLoaiCv ? "Cập Nhật" : "Thêm Mới"}
          </button>
        </form>
      </div>
    </div>
  );
}
