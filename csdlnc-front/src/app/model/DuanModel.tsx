import { LoaiDuAnModel } from "./LoaiDuAnModel";
import { NhanVienModel } from "./NhanVienModel";
import { ThamGiaDuanModel } from "./ThamGiaDuanModel";

export class DuanModel {
  maDa?: string;
  tenDa?: string;
  loaiDa?: string;
  maPhongQl?: string;
  ngayBatDau?: string;
  ngayKetThucDuKien?: string;
  ngayKetThucThucTe?: string;
  ketQuaThucHien?: string;
  trangThai?: "ChuaThucHien" | "DangThucHien" | "DungHan" | "QuaHan";
  loaiDuAn?: LoaiDuAnModel;

  dsNvThamGia?: NhanVienModel[];
  thamGiaLst?: ThamGiaDuanModel[];
  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
