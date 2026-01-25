export class BangLuongModel {
  ma_bang_luong?: number;
  ma_nv?: string;
  thang?: number;
  nam?: number;
  luong_cung?: number;
  luong_trach_nhiem?: number;
  luong_nang_suat?: number;
  tong_tien_phat?: number;
  tong_luong?: number;

  constructor(init?: Partial<BangLuongModel>) {
    Object.assign(this, init);
  }
}
