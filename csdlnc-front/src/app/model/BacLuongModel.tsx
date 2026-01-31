export class BacLuongModel {
  maBacLuong?: string;
  tenBacLuong?: string;
  mucLuongCoBan?: number;

  constructor(init?: Partial<BacLuongModel>) {
    Object.assign(this, init);
  }
}
