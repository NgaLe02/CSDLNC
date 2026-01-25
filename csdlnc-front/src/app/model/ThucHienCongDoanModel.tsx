export class ThucHienCongDoanModel {
  maNv?: string;
  maCd?: string;
  vaiTro?: "ThucHien" | "ChuTri";
  ketQua?: string;
  dungHan?: boolean;

  constructor(init?: Partial<ThucHienCongDoanModel>) {
    Object.assign(this, init);
  }
}
