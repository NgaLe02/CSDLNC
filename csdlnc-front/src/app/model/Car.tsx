export class Car {
  maxe?: string;

  constructor(init?: Partial<Car>) {
    Object.assign(this, init);
  }
}
