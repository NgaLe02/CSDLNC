export class ThucHienCongDoanModel {
  maNv?: string;
  maCd?: string;

  constructor(init?: Partial<ThucHienCongDoanModel>) {
    Object.assign(this, init);
  }
}
