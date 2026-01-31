export class PhongBanModel {
  maPhongBan?: string;
  tenPhongBan?: string;
  loaiPhong?: string;
  ngayThanhLap?: string; // Date as string

  constructor(init?: Partial<PhongBanModel>) {
    Object.assign(this, init);
  }
}
