export class EmployeeModel {
  maNhanVien?: number;
  hoTen?: string;
  cmnd?: string;
  soDienThoai?: string;

  constructor(init?: Partial<EmployeeModel>) {
    Object.assign(this, init);
  }
}
