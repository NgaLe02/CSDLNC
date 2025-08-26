export class TicketPriceModel {
  maGiaVe?: number;
  maTuyen?: string;
  maMua?: number;
  giaVe?: number;

  constructor(init?: Partial<TicketPriceModel>) {
    Object.assign(this, init);
  }
}
