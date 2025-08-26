import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RouteService } from "../../../../services/RouteService";
import { RouteModel } from "../../../../model/RouteModel";

export default function RouteForm(props: any) {
  const [model, setModel] = useState<RouteModel>(
    props.model ?? new RouteModel()
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
    if (model.maTuyen) {
      RouteService.getInstance()
        .updateRoute(model)
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
      RouteService.getInstance()
        .insertRoute(model)
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
            <label htmlFor="diemKhoiHanh" className="form-label">
              Điểm khởi hành
            </label>
            <input
              type="text"
              className="form-control"
              id="diemKhoiHanh"
              name="diemKhoiHanh"
              value={model.diemKhoiHanh ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="diemDen" className="form-label">
              Điểm đến
            </label>
            <input
              type="text"
              className="form-control"
              id="diemDen"
              name="diemDen"
              value={model.diemDen ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="khoangCach" className="form-label">
              Khoảng cách (km)
            </label>
            <input
              type="number"
              className="form-control"
              id="khoangCach"
              name="khoangCach"
              value={model.khoangCach ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thoiGianUocTinh" className="form-label">
              Thòi gian ước tính (phút)
            </label>
            <input
              type="number"
              className="form-control"
              id="thoiGianUocTinh"
              name="thoiGianUocTinh"
              value={model.thoiGianUocTinh ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="doPhucTap" className="form-label">
              Độ phức tạp
            </label>
            <input
              type="number"
              className="form-control"
              id="doPhucTap"
              name="doPhucTap"
              value={model.doPhucTap ?? ""}
              step="1"
              onKeyDown={(e) => {
                if (e.key === "." || e.key === ",") {
                  e.preventDefault();
                }
              }}
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
            {model.maTuyen ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
