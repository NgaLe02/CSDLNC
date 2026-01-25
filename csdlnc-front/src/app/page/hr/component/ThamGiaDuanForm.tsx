import { useState } from "react";
import { toast } from "react-toastify";
import { ThamGiaDuanModel } from "../../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";

export default function ThamGiaDuanForm(props: any) {
  const [model, setModel] = useState<ThamGiaDuanModel>(
    props.model ?? new ThamGiaDuanModel(),
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.ma_nv && model.ma_da) {
      ThamGiaDuanService.getInstance()
        .updateThamGiaDuan(model.ma_nv, model.ma_da, model)
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
      ThamGiaDuanService.getInstance()
        .insertThamGiaDuan(model)
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
            <label htmlFor="ma_nv" className="form-label">
              Mã NV
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_nv"
              name="ma_nv"
              value={model.ma_nv ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ma_da" className="form-label">
              Mã DA
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_da"
              name="ma_da"
              value={model.ma_da ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vai_tro" className="form-label">
              Vai Trò
            </label>
            <select
              className="form-control"
              id="vai_tro"
              name="vai_tro"
              value={model.vai_tro ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="ThanhVien">ThanhVien</option>
              <option value="ChuTri">ChuTri</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="thang" className="form-label">
              Tháng
            </label>
            <input
              type="number"
              className="form-control"
              id="thang"
              name="thang"
              value={model.thang ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nam" className="form-label">
              Năm
            </label>
            <input
              type="number"
              className="form-control"
              id="nam"
              name="nam"
              value={model.nam ?? ""}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
