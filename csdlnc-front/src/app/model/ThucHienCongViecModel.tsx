export class ThucHienCongViecModel {
  ma_nv?: string;
  ma_cv?: string;
  thang?: number;
  nam?: number;
  ket_qua?: string;
  dung_han?: boolean;

  constructor(init?: Partial<ThucHienCongViecModel>) {
    Object.assign(this, init);
  }
}
