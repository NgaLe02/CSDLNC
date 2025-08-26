export class RouthSalaryModel {
  maLuongTuyen?: number;
  doPhucTap?: number;
  khoangCachTu?: number;
  khoangCachDen?: number;
  luongCoBan?: number;
  ngayBatDau?: string;
  ngayKetThuc?: string;

  constructor(init?: Partial<RouthSalaryModel>) {
    Object.assign(this, init);
  }
}
