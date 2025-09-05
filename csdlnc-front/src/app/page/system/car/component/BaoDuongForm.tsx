import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CarModel } from "../../../../model/CarModel";
import { CarService } from "../../../../services/CarService";
import { MaintainenceScheduleService } from "../../../../services/MaintainenceScheduleService";
import { MaintainenceScheduleResponse } from "../../../../model/response/MaintainenceScheduleResponse";
import dayjs from "dayjs";

export default function BaoDuongForm(props: any) {
  const [model, setModel] = useState<CarModel>(props.model ?? new CarModel());
  const [listBaoDuong, setListbaoDuong] = useState<MaintainenceScheduleResponse[]>([]);

  useEffect(() => {
    if (props.model.maXe) {
      getLstMaintainenceScheduleToCar();
    }
  }, [props.model.maXe]);

  function getLstMaintainenceScheduleToCar() {
    MaintainenceScheduleService.getInstance()
      .getLstMaintainenceScheduleToCar({ maXe: props.model.maXe })
      .then((response) => {
        if (response.data.status) {
          const data = response.data.responseData;
          setListbaoDuong(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra");
        }
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.maXe) {
      CarService.getInstance()
        .updateCar(model)
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
      CarService.getInstance()
        .saveCar(model)
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
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0"></h6>
          <button className="btn btn-sm btn-primary">
            Thêm
          </button>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                <th scope="col" style={{ width: "5%" }}>
                  STT
                </th>
                <th scope="col">Ngày bảo dưỡng</th>
                <th scope="col">Chi phí (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {listBaoDuong.map((item: MaintainenceScheduleResponse, index: number) => (
                <tr key={item.maXe}>
                  <td>{index + 1}</td>
                  <td>{dayjs(item.ngayBaoDuong).format('DD-MM-YYYY')}</td>
                  <td>{item.chiPhi?.toLocaleString('vi-vn')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
