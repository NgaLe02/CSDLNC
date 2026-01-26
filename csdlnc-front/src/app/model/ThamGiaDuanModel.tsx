import { DuanModel } from "./DuanModel";

export class ThamGiaDuanModel {
  maNv?: string;
  maDa?: string;
  vaiTro?: "ThanhVien" | "ChuTri";
  thang?: number;
  nam?: number;

  duAn?: DuanModel;

  constructor(init?: Partial<ThamGiaDuanModel>) {
    Object.assign(this, init);
  }
}
