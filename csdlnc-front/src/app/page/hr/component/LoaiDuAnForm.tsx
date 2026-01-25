import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoaiDuAnModel } from "../../../model/LoaiDuAnModel";
import { LoaiDuAnService } from "../../../services/LoaiDuAnService";

export default function LoaiDuAnForm(props: any) {
  const [model, setModel] = useState<LoaiDuAnModel>(new LoaiDuAnModel());

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
    if (model.maLoaiDuAn) {
      LoaiDuAnService.getInstance()
        .updateLoaiDuAn(model)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật loại dự án thành công");
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
      LoaiDuAnService.getInstance()
        .insertLoaiDuAn(model)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm loại dự án thành công");
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
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="maLoaiDuAn" className="form-label">
              Mã Loại Dự Án
            </label>
            <input
              type="text"
              className="form-control"
              id="maLoaiDuAn"
              name="maLoaiDuAn"
              value={model?.maLoaiDuAn ?? ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenLoaiDuAn" className="form-label">
              Tên Loại Dự Án
            </label>
            <input
              type="text"
              className="form-control"
              id="tenLoaiDuAn"
              name="tenLoaiDuAn"
              value={model?.tenLoaiDuAn ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="soNvToiDa" className="form-label">
              Số NV Tối Đa
            </label>
            <input
              type="number"
              className="form-control"
              id="soNvToiDa"
              name="soNvToiDa"
              value={model?.soNvToiDa ?? ""}
              onChange={handleNumberChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="moTa" className="form-label">
              Mô Tả
            </label>
            <textarea
              className="form-control"
              id="moTa"
              name="moTa"
              value={model?.moTa ?? ""}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {model?.maLoaiDuAn ? "Cập Nhật" : "Thêm Mới"}
          </button>
        </form>
      </div>
    </div>
  );
}
