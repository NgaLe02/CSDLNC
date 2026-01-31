import { LoaiDuAnModel } from "./LoaiDuAnModel";
import { NhanVienModel } from "./NhanVienModel";
import { ThamGiaDuanModel } from "./ThamGiaDuanModel";

export class DuanModel {
  maDuAn?: string;
  tenDuAn?: string;
  maLoaiDuAn?: string;
  maPhongQuanLy?: string;
  ngayBatDau?: string;
  ngayKetThucDuKien?: string;
  ngayKetThucThucTe?: string;
  trangThai?: string;

  loaiDuAn?: LoaiDuAnModel;
  dsNvThamGia?: NhanVienModel[];
  thamGiaLst?: ThamGiaDuanModel[];

  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
