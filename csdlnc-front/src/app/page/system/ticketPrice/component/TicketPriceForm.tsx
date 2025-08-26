import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TicketPriceModel } from "../../../../model/TicketPriceModel";
import { TicketPriceService } from "../../../../services/TicketPriceService";

export default function TicketPriceForm(props: any) {
  const [model, setModel] = useState<TicketPriceModel>(
    props.model ?? new TicketPriceModel()
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
    if (model.maGiaVe) {
      TicketPriceService.getInstance()
        .updateTicketPrice(model)
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
      TicketPriceService.getInstance()
        .insertTicketPrice(model)
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
              Tuyến đường
            </label>
            <select
              className="form-select"
              id="maLoaiXe"
              name="maLoaiXe"
              value={model.maTuyen ?? ""}
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
            {model.maGiaVe ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
