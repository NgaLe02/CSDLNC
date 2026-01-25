export class LoaiDuAnModel {
  maLoaiDuAn?: string;
  tenLoaiDuAn?: string;
  soNvToiDa?: number;
  moTa?: string;

  constructor(init?: Partial<LoaiDuAnModel>) {
    Object.assign(this, init);
  }
}
