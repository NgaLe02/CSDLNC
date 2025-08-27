import { RouteSalaryModel } from "../RouteSalaryModel";

export class RouteResponseModel {
  maTuyen?: number;
  diemKhoiHanh?: number;
  diemDen?: number;
  thoiGianUocTinh?: number;
  doPhucTap?: number;
  maLuongTuyen?: number;
  khoangCach?: number;

  luongTuyenDuong?: RouteSalaryModel;

  constructor(init?: Partial<RouteResponseModel>) {
    Object.assign(this, init);
  }
}
