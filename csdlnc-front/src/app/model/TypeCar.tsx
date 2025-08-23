export class TypeCar {
  maLoaixe?: number;
  tenLoaixe?: string;
  soGhe?: number;

  constructor(init?: Partial<TypeCar>) {
    Object.assign(this, init);
  }
}
