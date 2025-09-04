import { useEffect, useState } from "react";
import { TypeCarService } from "../../../../services/TypeCarService";
import { toast } from "react-toastify";
import { CarModel } from "../../../../model/CarModel";
import { CarService } from "../../../../services/CarService";
import { TypeCarModel } from "../../../../model/TypeCarModel";

export default function CarForm(props: any) {
  const [model, setModel] = useState<CarModel>(props.model ?? new CarModel());
  const [listTypeCar, setListTypeCar] = useState<TypeCarModel[]>([]);

  useEffect(() => {
    getLstTypeCar();
  }, []);

  function getLstTypeCar() {
    TypeCarService.getInstance()
      .getLstTypeCar({})
      .then((response) => {
        if (response.data.status) {
          const data = response.data.responseData;
          setListTypeCar(data);
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bienSo" className="form-label">
              Biển số
            </label>
            <input
              type="text"
              className="form-control"
              id="bienSo"
              name="bienSo"
              value={model.bienSo ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="soGhe" className="form-label">
              Tình trạng
            </label>
            <select
              className="form-select"
              name="tinhTrang"
              onChange={(e: any) => handleChange(e)}
              value={model.tinhTrang}
            >
              <option value="">-- Tình trạng xe --</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Sắp bảo dưỡng">Sắp bảo dưỡng</option>
              <option value="Đang bảo dưỡng">Đang bảo dưỡng</option>
              <option value="Quá hạn bảo dưỡng">Quá hạn bảo dưỡng</option>
              <option value="Ngừng hoạt động">Ngừng hoạt động</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="maLoaiXe" className="form-label">
              Loại xe
            </label>
            <select
              className="form-select"
              id="maLoaiXe"
              name="maLoaiXe"
              value={model.maLoaiXe ?? ""}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">-- Chọn loại xe --</option>
              {listTypeCar.map((type) => (
                <option key={type.maLoaiXe} value={type.maLoaiXe}>
                  {type.tenLoaiXe}
                </option>
              ))}
            </select>
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
