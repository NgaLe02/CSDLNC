import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TicketPriceModel } from "../../../../model/TicketPriceModel";
import { TicketPriceService } from "../../../../services/TicketPriceService";
import { RouteResponseModel } from "../../../../model/response/RouteResponseModel";
import { RouteService } from "../../../../services/RouteService";
import { HttpStatusCode } from "axios";
import { SeasonModel } from "../../../../model/SeasonModel";
import { SeasonService } from "../../../../services/SeasonService";

export default function TicketPriceForm(props: any) {
  const [model, setModel] = useState<TicketPriceModel>(
    props.model ?? new TicketPriceModel()
  );
  const [listRoute, setListRoute] = useState<RouteResponseModel[]>([]);
  const [listSeason, setListSeason] = useState<SeasonModel[]>([]);

  useEffect(() => {
    getLstRoute();
    getLstSeason();
  }, []);

  function getLstRoute() {
    RouteService.getInstance()
      .getLstRoute({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setListRoute(data);
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

  function getLstSeason() {
    SeasonService.getInstance()
      .getLstSeason({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setListSeason(data);
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
            <label htmlFor="maTuyen" className="form-label">
              Tuyến đường
            </label>
            <select
              className="form-select"
              id="maTuyen"
              name="maTuyen"
              value={model.maTuyen ?? ""}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">-- Chọn tuyến đường --</option>
              {listRoute.map((item) => (
                <option key={item.maTuyen} value={item.maTuyen}>
                  {item.diemKhoiHanh} - {item.diemDen}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="maMua" className="form-label">
              Mùa lễ
            </label>
            <select
              className="form-select"
              id="maMua"
              name="maMua"
              value={model.maMua ?? ""}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">-- Chọn mùa lễ --</option>
              {listSeason.map((item) => (
                <option key={item.maMua} value={item.maMua}>
                  {item.tenMua}
                </option>
              ))}
            </select>

            <div className="mb-3">
              <label htmlFor="giaVe" className="form-label">
                Giá vé
              </label>
              <input
                type="number"
                className="form-control"
                id="giaVe"
                name="giaVe"
                value={model.giaVe ?? ""}
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
