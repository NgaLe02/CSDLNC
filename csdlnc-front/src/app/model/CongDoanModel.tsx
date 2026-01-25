export class CongDoanModel {
  maCd?: string;
  tenCongDoan?: string;
  thuTu?: number;
  ngayBatDau?: string;
  soNgayHoanThanh?: number;
  ngayHoanThanhThucTe?: string;
  ketQua?: string;
  trangThaiTienDo?: "DungHan" | "TreHan";
  maDa?: string;

  constructor(init?: Partial<CongDoanModel>) {
    Object.assign(this, init);
  }
}
