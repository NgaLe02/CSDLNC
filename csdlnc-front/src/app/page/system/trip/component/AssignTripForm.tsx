import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { EmployeeService } from "../../../../services/EmployeeService";
import { EmployeeModel } from "../../../../model/EmployeeModel";
import { LaiXeModel, PhuXeModel } from "../../../../model/AssigmentModel";
import { TripService } from "../../../../services/TripService";
import { TripModel } from "../../../../model/TripModel";
import { AssigmentResponseModel } from "../../../../model/response/AssigmentResponseModel";
import { Constant } from "../../../../constants/constant";

export default function AssignTripForm(props: any) {
  const [laiXe, setLaiXe] = useState<LaiXeModel>(new LaiXeModel({ maChuyen: props.model.maChuyen, maTuyen: props.model.maTuyen, maXe: props.model.maXe }));
  const [phuXe, setPhuXe] = useState<PhuXeModel>(new PhuXeModel({ maChuyen: props.model.maChuyen, maTuyen: props.model.maTuyen, maXe: props.model.maXe }));
  const [listEmployee, setListEmployee] = useState<EmployeeModel[]>([]);

  useEffect(() => {
    if (props.model) {
      const model = props.model as TripModel
      if (model.maChuyen && model.maXe && model.maTuyen) {
        getAssignEmployeesToTrip(model)
      }
    }
  }, [props.model])

  useEffect(() => {
    getLstEmployee();
  }, []);

  function getLstEmployee() {
    EmployeeService.getInstance()
      .getLstEmployee({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
            setListEmployee(data);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function getAssignEmployeesToTrip(model: TripModel) {
    TripService.getInstance()
      .getAssignEmployeesToTrip(model)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData as AssigmentResponseModel[];
            for (let i = 0; i < data.length; i++) {
              const item = data[i]
              if (item.vaiTro === Constant.VAI_TRO_LAI_XE) {
                setLaiXe(item)
              }
              else if (item.vaiTro === Constant.VAI_TRO_PHU_XE) {
                setPhuXe(item)
              }
            }
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = [laiXe, phuXe];
    TripService.getInstance()
      .assignEmployeesToTrip(payload)
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
    // }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            {/* Lái xe */}
            <div className="col-md-6">
              <label htmlFor="laiXe" className="form-label">
                Lái xe
              </label>
              <select
                className="form-select"
                id="laiXe"
                name="maNhanVien"
                value={laiXe.maNhanVien ?? ""}
                onChange={(e) => setLaiXe(new LaiXeModel({ ...laiXe, maNhanVien: Number(e.target.value) }))}
              >
                <option value="">-- Chọn lái xe --</option>
                {listEmployee.map((item) => (
                  <option key={item.maNhanVien} value={item.maNhanVien}>
                    {item.hoTen} - {item.soDienThoai}
                  </option>
                ))}
              </select>
            </div>

            {/* Phụ xe */}
            <div className="col-md-6">
              <label htmlFor="phuXe" className="form-label">
                Phụ xe
              </label>
              <select
                className="form-select"
                id="phuXe"
                name="maNhanVien"
                value={phuXe.maNhanVien ?? ""}
                onChange={(e) => setPhuXe(new PhuXeModel({ ...phuXe, maNhanVien: Number(e.target.value) }))}
              >
                <option value="">-- Chọn phụ xe --</option>
                {listEmployee.map((item) => (
                  <option key={item.maNhanVien} value={item.maNhanVien}>
                    {item.hoTen} - {item.soDienThoai}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button type="submit" className="btn btn-primary ms-2">
            {props.type === 'E' ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
