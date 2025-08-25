export class SeasonModel {
  maMua?: number;
  tenMua?: string;

  constructor(init?: Partial<SeasonModel>) {
    Object.assign(this, init);
  }
}
