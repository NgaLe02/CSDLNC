export class ThamGiaDuanModel {
  maNv?: string;
  maDa?: string;
  vaiTro?: "ThanhVien" | "ChuTri";
  thang?: number;
  nam?: number;

  constructor(init?: Partial<ThamGiaDuanModel>) {
    Object.assign(this, init);
  }
}
