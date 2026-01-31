import { LoaiDuAnModel } from "./LoaiDuAnModel";
import { NhanVienModel } from "./NhanVienModel";
import { PhongBanModel } from "./PhongBanModel";
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
  luongTrachNhiem?: string;

  loaiDuAn?: LoaiDuAnModel;
  phongQuanLy?: PhongBanModel;
  dsNvThamGia?: NhanVienModel[];
  thamGiaLst?: ThamGiaDuanModel[];

  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
