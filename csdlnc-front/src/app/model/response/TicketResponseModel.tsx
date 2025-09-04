import { PassengerModel } from "../PassengerModel";
import { CarResponseModel } from "./CarResponseModel";
import { RouteResponseModel } from "./RouteResponseModel";
import { TripResponseModel } from "./TripResponseModel";


export class TicketResponseModel {
  maVe?: number;
  maXe?: string;
  maChuyen?: string;
  maTuyen?: string;
  gheNgoi?: string;
  maHanhKhach?: number;
  ngayMua?: string;
  maVeFull?: string;

  hanhKhach?: PassengerModel;
  chuyenXe?: TripResponseModel;
  xe?: CarResponseModel;
  tuyenDuong?: RouteResponseModel

  constructor(init?: Partial<TicketResponseModel>) {
    Object.assign(this, init);
  }
}
