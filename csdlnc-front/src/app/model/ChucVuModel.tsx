import { PhongBanModel } from "./PhongBanModel";

export class ChucVuModel {
  maPhongBan?: string;
  maNhanVien?: string;
  tenChucVu?: string;
  ngayApDung?: string; // Date as string

  phongBan?: PhongBanModel;
  constructor(init?: Partial<ChucVuModel>) {
    Object.assign(this, init);
  }
}
