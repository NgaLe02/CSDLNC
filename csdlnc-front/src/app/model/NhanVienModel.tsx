export class NhanVienModel {
  ma_nv?: string;
  ho_ten?: string;
  ngay_sinh?: string; // Date as string
  gioi_tinh?: "Nam" | "Nữ" | "Khác";
  chuc_vu?: "NhanVien" | "TruongPhong" | "PhoPhong";
  bac_luong?: number;
  luong_co_ban?: number;
  ma_phong?: string;

  constructor(init?: Partial<NhanVienModel>) {
    Object.assign(this, init);
  }
}
