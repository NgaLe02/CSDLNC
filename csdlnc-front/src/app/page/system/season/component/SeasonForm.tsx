import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SeasonModel } from "../../../../model/SeasonModel";
import { SeasonService } from "../../../../services/SeasonService";

export default function SeasonForm(props: any) {
  const [model, setModel] = useState<SeasonModel>(
    props.model ?? new SeasonModel()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function check() {
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!check()) {
      return;
    }
    if (model.maMua) {
      SeasonService.getInstance()
        .updateSeason(model)
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
      SeasonService.getInstance()
        .insertSeason(model)
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
            <label htmlFor="tenMua" className="form-label">
              Tên mùa
            </label>
            <input
              type="text"
              className="form-control"
              id="tenMua"
              name="tenMua"
              value={model.tenMua ?? ""}
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
            {model.maMua ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
