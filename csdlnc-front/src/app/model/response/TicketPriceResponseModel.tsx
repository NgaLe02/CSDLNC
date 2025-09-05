import { SeasonModel } from "../SeasonModel";
import { RouteResponseModel } from "./RouteResponseModel";

export class TicketPriceResponseModel {
  maGiaVe?: number;
  maTuyen?: string;
  maMua?: number;
  giaVe?: number;
  ngayBatDau?: string;
  ngayKetThuc?: string;

  mua?: SeasonModel;
  tuyenDuong?: RouteResponseModel;

  constructor(init?: Partial<TicketPriceResponseModel>) {
    Object.assign(this, init);
  }
}
