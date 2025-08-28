import { CarResponseModel } from "./CarResponseModel";
import { RouteResponseModel } from "./RouteResponseModel";

export class TripResponseModel {
  maChuyen?: string;
  tinhTrangChuyen?: string;
  ngayGioKhoiHanh?: string;
  ngayGioDen?: string;
  chiPhiVanHanh?: number;
  tiLeThuLao?: number;
  maXe?: string;
  maTuyen?: string;

  xe?: CarResponseModel;
  tuyenDuong?: RouteResponseModel;

  constructor(init?: Partial<TripResponseModel>) {
    Object.assign(this, init);
  }
}
