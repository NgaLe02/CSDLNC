import { TypeCarModel } from "../TypeCarModel";

export class CarResponseModel {
  maxe?: string;
  bienSo?: string;
  tinhTrang?: string;
  loaiXe?: TypeCarModel

  constructor(init?: Partial<CarResponseModel>) {
    Object.assign(this, init);
  }
}
