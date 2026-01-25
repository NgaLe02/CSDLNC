export class PhongBanModel {
  ma_phong?: string;
  ten_phong?: string;
  mo_ta?: string;
  ngay_thanh_lap?: string; // Date as string

  constructor(init?: Partial<PhongBanModel>) {
    Object.assign(this, init);
  }
}
