export class CongDoanModel {
  sttCongDoan?: string;
  tenCongDoan?: string;
  thuTu?: number;
  ngayBatDau?: string;
  ngayHoanThanhDuKien?: string;
  ngayHoanThanhThucTe?: string;
  ketQua?: string;
  trangThaiTienDo?: string;
  maDuAn?: string;

  constructor(init?: Partial<CongDoanModel>) {
    Object.assign(this, init);
  }
}
