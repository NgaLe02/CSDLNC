import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TicketModel } from "../../../../model/TicketModel";
import { TicketService } from "../../../../services/TicketService";
import { RouteResponseModel } from "../../../../model/response/RouteResponseModel";
import { RouteService } from "../../../../services/RouteService";
import { HttpStatusCode } from "axios";
import { PassengerModel } from "../../../../model/PassengerModel";
import { PassengerService } from "../../../../services/PassengerService";
import { TripService } from "../../../../services/TripService";
import { TripResponseModel } from "../../../../model/response/TripResponseModel";
import dayjs from "dayjs";
import { TicketPriceService } from "../../../../services/TicketPriceService";

export default function TicketForm(props: any) {
  const [model, setModel] = useState<TicketModel>(
    props.model ?? new TicketModel()
  );
  const [listRoute, setListRoute] = useState<RouteResponseModel[]>([]);
  const [listPassenger, setListPassenger] = useState<PassengerModel[]>([]);
  const [listTrip, setListTrip] = useState<TripResponseModel[]>([]);
  const [listBookedSeat, setBookedSeat] = useState<string[]>([]);
  const [listSeat, setListSeat] = useState<string[]>([]);

  useEffect(() => {
    getLstRoute();
    getLstPassenger();
  }, []);

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

  function getLstPassenger() {
    PassengerService.getInstance()
      .getLstPassenger({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
            setListPassenger(data);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "maChuyen") {
      const [maChuyen, maXe, maTuyen] = value.split("|");
      setModel({ ...model, maChuyen, maXe });
    } else {
      setModel({ ...model, [name]: value });
    }
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

  function getLstTrip() {
    const tuyenDuong = listRoute.find(
      (item: RouteResponseModel) => item.maTuyen === model.maTuyen
    );
    const search = {
      diemKhoiHanh: tuyenDuong?.diemKhoiHanh,
      diemDen: tuyenDuong?.diemDen,
      khoiHanhTuNgay: dayjs(new Date()).format("YYYY-MM-DD"),
    };

    TripService.getInstance()
      .getLstTrip(search)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
            setListTrip(data);
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

  function getSeat(maXe: string, maTuyen: string, maChuyen: string) {
    TicketPriceService.getInstance()
      .getSellSeat(maXe, maTuyen, maChuyen)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const bookedSeat = response.data.responseData.bookedSeat;
            const allSeat = response.data.responseData.allSeat;
            setBookedSeat(bookedSeat);
            setListSeat(allSeat);
          } else {
            setBookedSeat([]);
            setListSeat([]);
            toast.error(response.data.message);
          }
        } else {
          setBookedSeat([]);
          setListSeat([]);
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  useEffect(() => {
    if (!model.maTuyen) {
      // Nếu chưa chọn tuyến -> reset hết
      setListTrip([]);
      setListSeat([]);
      setBookedSeat([]);
      setModel((prev) => ({
        ...prev,
        maChuyen: "",
        maXe: "",
        gheNgoi: "",
      }));
      return;
    }

    getLstTrip();

    // Nếu là thêm mới vé thì khi đổi tuyến phải reset
    if (!model.maVe) {
      setModel((prev) => ({
        ...prev,
        maChuyen: "",
        maXe: "",
        gheNgoi: "",
      }));
      setListSeat([]);
      setBookedSeat([]);
    }
  }, [model.maTuyen]);

  useEffect(() => {
    if (model.maChuyen && model.maXe && model.maTuyen) {
      setListSeat([]);
      setBookedSeat([]);
    } else {
      setModel((prev) => ({
        ...prev,
        maXe: "",
        gheNgoi: "",
      }));
    }
  }, [model.maChuyen]);

  useEffect(() => {
    console.log(model);
    if (model.maTuyen && model.maXe && model.maChuyen) {
      getSeat(model.maXe, model.maTuyen, model.maChuyen);
    } else {
      setListSeat([]);
      setBookedSeat([]);
    }
  }, [model.maTuyen, model.maXe, model.maChuyen]);

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="maHanhKhach" className="form-label">
              Hành khách
            </label>
            <select
              className="form-select"
              id="maHanhKhach"
              name="maHanhKhach"
              value={model.maHanhKhach ?? ""}
              disabled={model.maVe ? true : false}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">-- Chọn hành khách --</option>
              {listPassenger.map((item) => (
                <option key={item.maHanhKhach} value={item.maHanhKhach}>
                  {item.hoTen} - {item.soDienThoai}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="maTuyen" className="form-label">
              Tuyến đường
            </label>
            <select
              className="form-select"
              id="maTuyen"
              name="maTuyen"
              disabled={model.maVe ? true : false}
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

          <div className="mb-3">
            <label htmlFor="maChuyen" className="form-label">
              Chuyến xe
            </label>
            <select
              className="form-select"
              id="maChuyen"
              name="maChuyen"
              disabled={model.maVe ? true : false}
              value={
                model.maChuyen && model.maXe && model.maTuyen
                  ? `${model.maChuyen}|${model.maXe}|${model.maTuyen}`
                  : ""
              }
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">-- Chọn chuyến xe --</option>
              {listTrip.map((item, index) => (
                <option
                  key={index}
                  value={`${item.maChuyen}|${item.maXe}|${item.maTuyen}`}
                >
                  {item.maXe} -{" "}
                  {dayjs(item.ngayGioKhoiHanh).format("DD/MM/YYYY HH:mm")} -{" "}
                  {item.giaVe?.giaVe?.toLocaleString("vi-vn")} VNĐ
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Chọn ghế</label>
            <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
              {listSeat.map((seat: string) => {
                const isSelected = model.gheNgoi == seat;
                const isBooked = listBookedSeat.includes(seat) && !isSelected;

                return (
                  <button
                    key={seat}
                    className={`btn 
                      ${
                        isSelected
                          ? "btn-success"
                          : isBooked
                          ? "btn-danger"
                          : "btn-outline-primary"
                      }`}
                    disabled={isBooked}
                    onClick={() => {
                      const oldSeat = model.gheNgoi;
                      const newSeat = seat;

                      setModel({ ...model, gheNgoi: newSeat });

                      if (oldSeat && !listBookedSeat.includes(oldSeat)) {
                        setBookedSeat((prev) =>
                          prev.filter((s) => s != oldSeat)
                        );
                      }
                    }}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button
            type="submit"
            className="btn btn-primary ms-2"
            onClick={handleSubmit}
          >
            {model.maVe ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
