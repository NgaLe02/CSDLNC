import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RouteSalaryService } from "../../../../services/RouteSalaryService";
import { RouteSalaryModel } from "../../../../model/RouthSalary";

export default function RouteSalaryForm(props: any) {
  const [model, setModel] = useState<RouteSalaryModel>(
    props.model ?? new RouteSalaryModel()
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
    if (model.maLuongTuyen) {
      RouteSalaryService.getInstance()
        .updateRouteSalary(model)
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
      RouteSalaryService.getInstance()
        .insertRouteSalary(model)
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
          <div className="mb-3">
            <label htmlFor="khoangCachTu" className="form-label">
              Khoảng cách từ
            </label>
            <input
              type="number"
              className="form-control"
              id="khoangCachTu"
              name="khoangCachTu"
              value={model.khoangCachTu ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="khoangCachDen" className="form-label">
              Khoảng cách đến
            </label>
            <input
              type="number"
              className="form-control"
              id="khoangCachDen"
              name="khoangCachDen"
              value={model.khoangCachDen ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ngayBatDau" className="form-label">
              Ngày bắt đầu
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
            <label htmlFor="ngayKetThuc" className="form-label">
              Ngày kết thúc
            </label>
            <input
              type="date"
              className="form-control"
              id="ngayKetThuc"
              name="ngayKetThuc"
              value={model.ngayKetThuc ?? ""}
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
            {model.maLuongTuyen ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
