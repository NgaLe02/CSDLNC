import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeModel } from "../../../../model/EmployeeModel";
import { EmployeeService } from "../../../../services/EmployeeService";

export default function EmployeeForm(props: any) {
  const [model, setModel] = useState<EmployeeModel>(
    props.model ?? new EmployeeModel()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function check() {
    if (model.cmnd?.length != 12) {
      toast.error("CMND phải gồm 12 kí tự");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!check()) {
      return;
    }
    if (model.maNhanVien) {
      EmployeeService.getInstance()
        .updateEmployee(model)
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
      EmployeeService.getInstance()
        .insertEmployee(model)
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
            <label htmlFor="hoTen" className="form-label">
              Họ tên
            </label>
            <input
              type="text"
              className="form-control"
              id="hoTen"
              name="hoTen"
              value={model.hoTen ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cmnd" className="form-label">
              CMND
            </label>
            <input
              type="text"
              className="form-control"
              id="cmnd"
              name="cmnd"
              value={model.cmnd ?? ""}
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
            {model.maNhanVien ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
