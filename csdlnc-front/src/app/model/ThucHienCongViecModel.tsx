import { NhanVienModel } from "./NhanVienModel";

export class ThucHienCongViecModel {
  maNv?: string;
  maCv?: string;

  nhanVien?: NhanVienModel;
  constructor(init?: Partial<ThucHienCongViecModel>) {
    Object.assign(this, init);
  }
}
