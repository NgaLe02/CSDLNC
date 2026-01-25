export class CongDoanModel {
  ma_cd?: string;
  ten_cong_doan?: string;
  thu_tu?: number;
  ngay_bat_dau?: string;
  so_ngay_hoan_thanh?: number;
  ngay_hoan_thanh_thuc_te?: string;
  ket_qua?: string;
  trang_thai_tien_do?: "DungHan" | "TreHan";
  ma_da?: string;

  constructor(init?: Partial<CongDoanModel>) {
    Object.assign(this, init);
  }
}
