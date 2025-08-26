export class RouteSalaryModel {
  maLuongTuyen?: number;
  doPhucTap?: number;
  khoangCachTu?: number;
  khoangCachDen?: number;
  luongCoBan?: number;
  ngayBatDau?: string;
  ngayKetThuc?: string;

  constructor(init?: Partial<RouteSalaryModel>) {
    Object.assign(this, init);
  }
}
