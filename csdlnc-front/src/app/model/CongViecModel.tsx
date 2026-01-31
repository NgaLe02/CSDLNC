import { LoaiCongViecModel } from "./LoaiCongViecModel";

export class CongViecModel {
  maCongViec?: string;
  tenCongViec?: string;
  maLoaiCv?: string;
  ngayBatDau?: string;
  ngayHoanThanhDuKien?: string;
  ngayHoanThanhThucTe?: string;
  ketQua?: string;
  trangThaiTienDo?: string;

  loaiCongViec?: LoaiCongViecModel;

  constructor(init?: Partial<CongViecModel>) {
    Object.assign(this, init);
  }
}
