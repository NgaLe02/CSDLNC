export class SeasonModel {
  maMua?: string;
  tenMua?: string;

  constructor(init?: Partial<SeasonModel>) {
    Object.assign(this, init);
  }
}
