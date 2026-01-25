export class DuanModel {
  ma_da?: string;
  ten_da?: string;
  loai_da?: string;
  so_nhan_vien_toi_da?: number;
  ma_phong_ql?: string;
  ma_nv_chu_tri?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc_du_kien?: string;
  trang_thai?: string;

  constructor(init?: Partial<DuanModel>) {
    Object.assign(this, init);
  }
}
