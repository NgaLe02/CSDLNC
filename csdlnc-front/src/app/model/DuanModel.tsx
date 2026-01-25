export class DuanModel {
  maDa?: string;
  tenDa?: string;
  loaiDa?: string;
  soNhanVienToiDa?: number;
  maPhongQl?: string;
  maNvChuTri?: string;
  ngayBatDau?: string;
  ngayKetThucDuKien?: string;
  trangThai?: string;

  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
