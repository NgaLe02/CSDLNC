export class RouteModel {
  maTuyen?: number;
  diemKhoiHanh?: number;
  diemDen?: number;
  thoiGianUocTinh?: number;
  maTuyenLuong?: number;
  khoangCach?: number;
  doPhucTap?: number;
  // luongCoBan?: number;
  // ngayBatDau?: string;
  // ngayKetThuc?: string;

  constructor(init?: Partial<RouteModel>) {
    Object.assign(this, init);
  }
}
