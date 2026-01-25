export class PhongBanModel {
  maPhong?: string;
  tenPhong?: string;
  moTa?: string;
  ngayThanhLap?: string; // Date as string

  constructor(init?: Partial<PhongBanModel>) {
    Object.assign(this, init);
  }
}
