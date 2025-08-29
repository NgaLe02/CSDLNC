export class AssigmentModel {
  maChuyen?: string;
  maNhanVien?: number;
  maTuyen?: string;
  maXe?: string;
  vaiTro?: string;

  constructor(init?: Partial<AssigmentModel>) {
    Object.assign(this, init);
  }
}
