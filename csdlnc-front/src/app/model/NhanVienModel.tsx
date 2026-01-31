import { ChucVuModel } from "./ChucVuModel";
import { XepBacLuongModel } from "./XepBacLuongModel";

export class NhanVienModel {
  maNhanVien?: string;
  hoTen?: string;
  ngaySinh?: string; // Date as string
  gioiTinh?: string;
  hoatDong?: boolean;

  phanCong?: ChucVuModel;
  xepBacLuong?: XepBacLuongModel;

  constructor(init?: Partial<NhanVienModel>) {
    Object.assign(this, init);
  }
}
