export class LoaiCongViecModel {
  maLoaiCv?: string;
  tenLoaiCongViec?: string;
  mucLuongNangSuat?: number;

  constructor(init?: Partial<LoaiCongViecModel>) {
    Object.assign(this, init);
  }
}
