import { SeasonModel } from "../Season";
import { RouteResponseModel } from "./RouteResponseModel";

export class TicketPriceResponseModel {
  maGiaVe?: number;
  maTuyen?: string;
  maMua?: number;
  giaVe?: number;

  mua?: SeasonModel;
  tuyenDuong?: RouteResponseModel;

  constructor(init?: Partial<TicketPriceResponseModel>) {
    Object.assign(this, init);
  }
}
