export class ThamGiaDuanModel {
  ma_nv?: string;
  ma_da?: string;
  vai_tro?: "ThanhVien" | "ChuTri";
  thang?: number;
  nam?: number;

  constructor(init?: Partial<ThamGiaDuanModel>) {
    Object.assign(this, init);
  }
}
