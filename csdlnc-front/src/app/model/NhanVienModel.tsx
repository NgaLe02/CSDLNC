export class NhanVienModel {
  maNv?: string;
  hoTen?: string;
  ngaySinh?: string; // Date as string
  gioiTinh?: "Nam" | "Nữ" | "Khác";
  chucVu?: "NhanVien" | "TruongPhong" | "PhoPhong";
  bacLuong?: number;
  luongCoBan?: number;
  maPhong?: string;

  constructor(init?: Partial<NhanVienModel>) {
    Object.assign(this, init);
  }
}
