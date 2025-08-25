export class PassengerModel {
  maHanhKhach?: number;
  hoTen?: string;
  cmnd?: string;
  soDienThoai?: number;

  constructor(init?: Partial<PassengerModel>) {
    Object.assign(this, init);
  }
}
