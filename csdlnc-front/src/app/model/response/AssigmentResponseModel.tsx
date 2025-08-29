import { EmployeeModel } from "../EmployeeModel";
import { CarResponseModel } from "./CarResponseModel";
import { RouteResponseModel } from "./RouteResponseModel";
import { TripResponseModel } from "./TripResponseModel";

export class AssigmentModel {
  maChuyen?: string;
  maNhanVien?: number;
  maTuyen?: string;
  maXe?: string;
  vaiTro?: string;

  chuyenXe?: TripResponseModel;
  nhanVien?: EmployeeModel;
  tuyenDuong?: RouteResponseModel;
  xe?: CarResponseModel

  constructor(init?: Partial<AssigmentModel>) {
    Object.assign(this, init);
  }
}
