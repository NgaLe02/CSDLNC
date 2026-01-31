export class LoaiDuAnModel {
  maLoaiDuAn?: string;
  tenLoaiDuAn?: string;
  soNhanVienToiDa?: number;
  moTa?: string;

  constructor(init?: Partial<LoaiDuAnModel>) {
    Object.assign(this, init);
  }
}
