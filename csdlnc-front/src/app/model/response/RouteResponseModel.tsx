import { RouteSalaryModel } from "../RouteSalaryModel";

export class RouteResponseModel {
  maTuyen?: number;
  diemKhoiHanh?: number;
  diemDen?: number;
  thoiGianUocTinh?: number;
  maTuyenLuong?: number;
  doPhucTap?: number;
  luongCoBan?: number;
  ngayBatDau?: string;
  ngayKetThuc?: string;

  luongTuyenDuong?: RouteSalaryModel;

  constructor(init?: Partial<RouteResponseModel>) {
    Object.assign(this, init);
  }
}
