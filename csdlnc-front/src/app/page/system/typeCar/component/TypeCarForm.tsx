import { useState } from "react";
import { TypeCarService } from "../../../../services/TypeCarService";
import { toast } from "react-toastify";
import { TypeCarModel } from "../../../../model/TypeCarModel";

export default function TypeCarForm(props: any) {
  const [model, setModel] = useState<TypeCarModel>(
    props.model ?? new TypeCarModel()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.maLoaiXe) {
      TypeCarService.getInstance()
        .updateTypeCar(model)
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
      TypeCarService.getInstance()
        .saveTypeCar(model)
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
            <label htmlFor="tenLoaiXe" className="form-label">
              Tên loại xe
            </label>
            <input
              type="text"
              className="form-control"
              id="tenLoaiXe"
              name="tenLoaiXe"
              value={model.tenLoaiXe ?? ""}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              {" "}
              We'll never share your email with anyone else.{" "}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="soGhe" className="form-label">
              Số ghế
            </label>
            <input
              type="number"
              className="form-control"
              id="soGhe"
              name="soGhe"
              value={model.soGhe ?? ""}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button type="submit" className="btn btn-primary ms-2">
            {model.maLoaiXe ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
