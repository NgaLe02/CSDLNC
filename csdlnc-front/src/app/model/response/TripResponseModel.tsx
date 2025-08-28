export class TripResponseModel {
  maChuyen?: string;
  tinhTrangChuyen?: string;
  ngayGioKhoiHanh?: string;
  ngayGioDen?: string;
  chiPhiVanHanh?: number;
  tiLeThuLao?: number;
  maXe?: string;
  maTuyen?: string;

  constructor(init?: Partial<TripResponseModel>) {
    Object.assign(this, init);
  }
}
