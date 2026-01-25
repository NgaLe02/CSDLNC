import { LoaiDuAnModel } from "./LoaiDuAnModel";

export class DuanModel {
  maDa?: string;
  tenDa?: string;
  loaiDa?: string;
  maPhongQl?: string;
  maNvChuTri?: string;
  ngayBatDau?: string;
  ngayKetThucDuKien?: string;
  ngayKetThucThucTe?: string;
  ketQuaThucHien?: string;
  trangThai?: "ChuaThucHien" | "DangThucHien" | "DungHan" | "QuaHan";
  loaiDuAn?: LoaiDuAnModel;

  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
