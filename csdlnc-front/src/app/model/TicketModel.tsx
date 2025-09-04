

export class TicketModel {
  maVe?: number;
  maXe?: string;
  maChuyen?: string;
  maTuyen?: string;
  gheNgoi?: string;
  maHanhKhach?: number;
  ngayMua?: string;

  constructor(init?: Partial<TicketModel>) {
    Object.assign(this, init);
  }
}
