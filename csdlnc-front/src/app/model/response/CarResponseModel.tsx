import { TypeCarModel } from "../TypeCarModel";

export class CarResponseModel {
  maxe?: string;
  bienSo?: string;
  tinhTrang?: string;
  maLoaiXe?: number;
  loaiXe?: TypeCarModel

  constructor(init?: Partial<CarResponseModel>) {
    Object.assign(this, init);
  }
}
