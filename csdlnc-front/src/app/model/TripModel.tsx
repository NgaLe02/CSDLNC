export class TripModel {
  maChuyen?: string;
  tinhTrangChuyen?: string;
  ngayGioKhoiHanh?: string;
  ngayGioDen?: string;
  chiPhiVanHanh?: number;
  tiLeThuLao?: number;
  maXe?: string;
  maTuyen?: string;

  constructor(init?: Partial<TripModel>) {
    Object.assign(this, init);
  }
}
