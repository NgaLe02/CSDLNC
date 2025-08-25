import { useEffect, useState } from "react";
import { TypeCarService } from "../../../../services/TypeCarService";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { TypeCarModel } from "../../../../model/TypeCarModel";
import { CarModel } from "../../../../model/CarModel";
import { CarService } from "../../../../services/CarService";

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
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setListTypeCar(data);
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
      CarService.getInstance()
        .updateCar(model)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            props.closeModal(true)
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          toast.error("Có lỗi xảy ra");
        });
    } else {
      CarService.getInstance()
        .saveCar(model)
        .then((resp) => {
          if (resp.status === HttpStatusCode.Ok) {
            if (resp.data.status) {
              toast.success(resp.data.message);
              props.closeModal(true)
            } else {
              toast.error(resp.data.message);
            }
          }
          else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          toast.error("Có lỗi xảy ra");
        });
    }

  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tenLoaiXe" className="form-label">
              Biển số
            </label>
            <input
              type="text"
              className="form-control"
              id="tenLoaiXe"
              name="tenLoaiXe"
              value={model.bienSo ?? ""}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>
          </div>
          <div className="mb-3">
            <label htmlFor="soGhe" className="form-label">
              Tình trạng
            </label>
            <input
              type="number"
              className="form-control"
              id="soGhe"
              name="soGhe"
              value={model.tinhTrang ?? ""}
              onChange={handleChange}
            />
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
