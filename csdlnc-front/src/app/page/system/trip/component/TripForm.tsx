import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { TripModel } from "../../../../model/TripModel";
import { TripService } from "../../../../services/TripService";
import { CarResponseModel } from "../../../../model/response/CarResponseModel";
import { RouteResponseModel } from "../../../../model/response/RouteResponseModel";
import { CarService } from "../../../../services/CarService";
import { HttpStatusCode } from "axios";
import { RouteService } from "../../../../services/RouteService";
import { Constant } from "../../../../constants/constant";
import dayjs from "dayjs";
import { TicketPriceService } from "../../../../services/TicketPriceService";
import { SeasonModel } from "../../../../model/SeasonModel";
import { SeasonService } from "../../../../services/SeasonService";

export default function TripForm(props: any) {
  const [model, setModel] = useState<TripModel>(props.model ?? new TripModel());
  const [listCar, setListCar] = useState<CarResponseModel[]>([]);
  const [listRoute, setListRoute] = useState<RouteResponseModel[]>([]);
  const [listStatusTrip, setStatusTrip] = useState<any[]>(
    Constant.LIST_STATUS_TRIP
  );
  const [listSeason, setListSeason] = useState<SeasonModel[]>([]);

  const [giaVe, setGiaVe] = useState<number>(0);
  const [thuLaoPhuXe, setThuLaoPhuXe] = useState<number>(0);

  useEffect(() => {
    if (props.type === "C") {
      setModel((prev) => ({
        ...prev,
        tiLeThuLao: Constant.TI_LE_THU_LAO,
      }));
    }
  }, [props.type]);

  useEffect(() => {
    getLstCar();
    getLstRoute();
    getLstSeason();
  }, []);

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

  function getLstCar() {
    CarService.getInstance()
      .getLstCar({ tinhTrang: "Đang hoạt động" })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setListCar(data);
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

  function getLstRoute() {
    RouteService.getInstance()
      .getLstRoute({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
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

  function findTicketPriceByTuyenAndMua(maTuyen: string, maMua: string, ngayGioKhoiHanh: string) {
    TicketPriceService.getInstance()
      .findTicketPriceByTuyenAndMua(maTuyen, maMua, dayjs(ngayGioKhoiHanh).format('YYYY-MM-DD'))
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setModel((prev) => ({
              ...prev,
              maGiaVe: data.maGiaVe,
            }));
            setGiaVe(data.giaVe);
          } else {
            setGiaVe(0);
            toast.error(response.data.message);
          }
        } else {
          setGiaVe(0);
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
    if (model.maChuyen) {
      TripService.getInstance()
        .updateTrip(model)
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
      TripService.getInstance()
        .insertTrip(model)
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

  useEffect(() => {
    if (model.maTuyen && model.maMua && model.ngayGioKhoiHanh) {
      //find maGiaVe
      findTicketPriceByTuyenAndMua(model.maTuyen, model.maMua, model.ngayGioKhoiHanh);
    } else {
      setGiaVe(0);
    }

  }, [model.maTuyen, model.maMua, model.ngayGioKhoiHanh]);

  useEffect(() => {
    if (model.maTuyen) {
      const tuyenDuong = listRoute.find(
        (item: any) => item.maTuyen === model.maTuyen
      );
      setThuLaoPhuXe(tuyenDuong?.luongTuyenDuong?.luongCoBan ?? 0);
    } else {
      setThuLaoPhuXe(0);
    }
  }, [model.maTuyen])

  useEffect(() => {
    if (model.maTuyen) {
      const tuyenDuong = listRoute.find(
        (item: any) => item.maTuyen === model.maTuyen
      );
      setThuLaoPhuXe(tuyenDuong?.luongTuyenDuong?.luongCoBan ?? 0);
    }
  }, [listRoute]);

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maXe" className="form-label">
                Xe
              </label>
              <select
                className="form-select"
                id="maXe"
                name="maXe"
                disabled={model.maChuyen ? true : false}
                value={model.maXe ?? ""}
                onChange={(e: any) => handleChange(e)}
              >
                <option value="">-- Chọn xe --</option>
                {listCar.map((item) => (
                  <option key={item.maXe} value={item.maXe}>
                    {item.maXe}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="maTuyen" className="form-label">
                Tuyến đường
              </label>
              <select
                className="form-select"
                id="maTuyen"
                name="maTuyen"
                disabled={model.maChuyen ? true : false}
                value={model.maTuyen ?? ""}
                onChange={(e: any) => handleChange(e)}
              >
                <option value="">-- Chọn tuyến đường --</option>
                {listRoute.map((item) => (
                  <option key={item.maTuyen} value={item.maTuyen}>
                    {item.diemKhoiHanh} - {item.diemDen} ({item.khoangCach}km)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="ngayGioKhoiHanh" className="form-label">
                Ngày giờ khởi hành
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="ngayGioKhoiHanh"
                disabled={model.maChuyen ? true : false}
                name="ngayGioKhoiHanh"
                value={
                  model.ngayGioKhoiHanh
                    ? dayjs(model.ngayGioKhoiHanh).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="ngayGioDen" className="form-label">
                Ngày giờ đến
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="ngayGioDen"
                name="ngayGioDen"
                disabled={model.maChuyen ? true : false}
                value={
                  model.ngayGioDen
                    ? dayjs(model.ngayGioDen).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="chiPhiVanHanh" className="form-label">
                Chi phí vận hành (VNĐ)
              </label>
              <input
                type="number"
                className="form-control"
                id="chiPhiVanHanh"
                name="chiPhiVanHanh"
                value={model.chiPhiVanHanh ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="tiLeThuLao" className="form-label">
                Tỉ lệ thù lao lái xe/ phụ xe
              </label>
              <input
                type="number"
                className="form-control"
                id="tiLeThuLao"
                name="tiLeThuLao"
                value={model.tiLeThuLao ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maMua" className="form-label">
                Ngày lễ
              </label>
              <select
                className="form-select"
                id="maMua"
                disabled={model.maChuyen ? true : false}
                name="maMua"
                value={model.maMua ?? ""}
                onChange={(e: any) => handleChange(e)}
              >
                <option value="">-- Chọn ngày lễ --</option>
                {listSeason.map((item) => (
                  <option key={item.maMua} value={item.maMua}>
                    {item.tenMua}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="tinhTrangChuyen" className="form-label">
                Tình trạng chuyến
              </label>
              <select
                className="form-select"
                id="tinhTrangChuyen"
                name="tinhTrangChuyen"
                value={model.tinhTrangChuyen ?? ""}
                onChange={(e: any) => handleChange(e)}
              >
                <option value="">-- Chọn tình trạng chuyến --</option>
                {listStatusTrip.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="tinhTrangChuyen" className="form-label">
              Giá vé: {giaVe.toLocaleString("vi-vn")} VNĐ
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="tinhTrangChuyen" className="form-label">
              Thù lao phụ xe:{" "}
              {thuLaoPhuXe ? thuLaoPhuXe?.toLocaleString("vi-vn") : "-"} VNĐ
            </label>
          </div>

          <div className="mb-2">
            <label htmlFor="tinhTrangChuyen" className="form-label">
              Thù lao lái xe:{" "}
              {model.tiLeThuLao
                ? (thuLaoPhuXe * model.tiLeThuLao).toLocaleString("vi-vn")
                : "-"}{" "}
              VNĐ
            </label>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button type="submit" className="btn btn-primary ms-2">
            {model.maChuyen ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
