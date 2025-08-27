export class TicketPriceModel {
  maGiaVe?: number;
  maTuyen?: string;
  maMua?: number;
  giaVe?: number;
  ngayKetThuc?: string;
  ngayBatDau?: string;

  constructor(init?: Partial<TicketPriceModel>) {
    Object.assign(this, init);
  }
}
