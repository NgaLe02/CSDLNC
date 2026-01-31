export class ThucHienCongDoanModel {
  maNhanVien?: string;
  sttCongDoan?: string;
  maDuAn?: string;
  vaiTro?: string;

  constructor(init?: Partial<ThucHienCongDoanModel>) {
    Object.assign(this, init);
  }
}
