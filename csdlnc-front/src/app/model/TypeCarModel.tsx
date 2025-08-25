export class TypeCarModel {
  maLoaiXe?: number;
  tenLoaiXe?: string;
  soGhe?: number;

  constructor(init?: Partial<TypeCarModel>) {
    Object.assign(this, init);
  }
}
