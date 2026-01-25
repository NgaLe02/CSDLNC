export class CongViecModel {
  maCv?: string;
  tenCv?: string;
  loaiCv?: string;
  mucLuongNangSuat?: number;

  constructor(init?: Partial<CongViecModel>) {
    Object.assign(this, init);
  }
}
