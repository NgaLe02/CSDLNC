export class ChiTietPhatModel {
  ma_phat?: number;
  ma_bang_luong?: number;
  ly_do?: string;
  ty_le_phat?: number;
  so_tien_phat?: number;

  constructor(init?: Partial<ChiTietPhatModel>) {
    Object.assign(this, init);
  }
}
