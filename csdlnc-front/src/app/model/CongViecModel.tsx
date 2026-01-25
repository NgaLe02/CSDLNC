export class CongViecModel {
  ma_cv?: string;
  ten_cv?: string;
  loai_cv?: string;
  muc_luong_nang_suat?: number;

  constructor(init?: Partial<CongViecModel>) {
    Object.assign(this, init);
  }
}
