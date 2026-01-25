export class ThucHienCongViecModel {
  maNv?: string;
  maCv?: string;
  thang?: number;
  nam?: number;
  ketQua?: string;
  dungHan?: boolean;

  constructor(init?: Partial<ThucHienCongViecModel>) {
    Object.assign(this, init);
  }
}
