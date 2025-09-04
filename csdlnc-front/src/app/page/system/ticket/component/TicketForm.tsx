import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TicketModel } from "../../../../model/TicketModel";
import { TicketService } from "../../../../services/TicketService";
import { RouteResponseModel } from "../../../../model/response/RouteResponseModel";
import { RouteService } from "../../../../services/RouteService";
import { HttpStatusCode } from "axios";
import { SeasonModel } from "../../../../model/SeasonModel";
import { SeasonService } from "../../../../services/SeasonService";

export default function TicketForm(props: any) {
  const [model, setModel] = useState<TicketModel>(
    props.model ?? new TicketModel()
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
    if (model.maVe) {
      TicketService.getInstance()
        .updateTicket(model)
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
      TicketService.getInstance()
        .insertTicket(model)
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


          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button type="submit" className="btn btn-primary ms-2">
            {model.maVe ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
