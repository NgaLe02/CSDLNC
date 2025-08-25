export class CarModel {
  maxe?: string;
  bienSo?: string;
  tinhTrang?: string;
  maLoaiXe?: number;

  constructor(init?: Partial<CarModel>) {
    Object.assign(this, init);
  }
}
