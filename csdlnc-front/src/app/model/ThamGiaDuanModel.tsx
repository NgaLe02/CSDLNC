import { DuanModel } from "./DuanModel";
import { NhanVienModel } from "./NhanVienModel";

export class ThamGiaDuanModel {
  maNv?: string;
  maDa?: string;
  vaiTro?: "ThanhVien" | "ChuTri";
  thang?: number;
  nam?: number;

  duAn?: DuanModel;
  nhanVien?: NhanVienModel;
  constructor(init?: Partial<ThamGiaDuanModel>) {
    Object.assign(this, init);
  }
}
