export class ThucHienCongDoanModel {
  ma_nv?: string;
  ma_cd?: string;
  vai_tro?: "ThucHien" | "ChuTri";
  ket_qua?: string;
  dung_han?: boolean;

  constructor(init?: Partial<ThucHienCongDoanModel>) {
    Object.assign(this, init);
  }
}
