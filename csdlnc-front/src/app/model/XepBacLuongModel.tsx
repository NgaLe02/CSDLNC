import { BacLuongModel } from "./BacLuongModel";

export class XepBacLuongModel {
  maBacLuong?: string;
  maNhanVien?: string;
  ngayApDung?: string; // Date as string

  bacLuong?: BacLuongModel;

  constructor(init?: Partial<XepBacLuongModel>) {
    Object.assign(this, init);
  }
}
