import { useState } from "react";
import { TypeCar } from "../../../../model/TypeCar";
import { TypeCarService } from "../../../../services/TypeCarService";
import { toast } from "react-toastify";

export default function TypeCarForm(props: any) {
  const [model, setModel] = useState<TypeCar>(props.model ?? new TypeCar());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (model.maLoaixe) {
        TypeCarService.getInstance()
          .updateTypeCar(model)
          .then((resp) => {
            if (resp.data.status) {
              toast.success("Cập nhật loại xe thành công!");
            } else {
              toast.error('Có lỗi xảy ra!');
            }
          })
          .catch((err) => {
            toast.error('Có lỗi xảy ra!');
          });
        alert("Cập nhật loại xe thành công!");
      } else {
        TypeCarService.getInstance()
          .saveTypeCar(model)
          .then((resp) => {
            if (resp.data.status) {
              toast.success(`Thêm loại xe thành công!`);
            } else {
              toast.error('Có lỗi xảy ra!');
            }
          })
          .catch((err) => {
            toast.error('Có lỗi xảy ra!');
          });
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tenLoaixe" className="form-label">
              Tên loại xe
            </label>
            <input
              type="text"
              className="form-control"
              id="tenLoaixe"
              name="tenLoaixe"
              value={model.tenLoaixe ?? ""}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text"> We'll never share your email with anyone else. </div>
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
          <button type="submit" className="btn btn-primary">
            {model.maLoaixe ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
