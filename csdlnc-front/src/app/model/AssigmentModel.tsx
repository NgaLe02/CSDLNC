import { Constant } from "../constants/constant";

export class AssigmentModel {
  maChuyen?: string;
  maNhanVien?: number;
  maTuyen?: string;
  maXe?: string;
  vaiTro?: string;

  constructor(init?: Partial<AssigmentModel>) {
    Object.assign(this, init);
  }
}


export class LaiXeModel extends AssigmentModel {
  constructor(init?: Partial<LaiXeModel>) {
    super(init);
    this.vaiTro = Constant.VAI_TRO_LAI_XE;
  }
}

export class PhuXeModel extends AssigmentModel {
  constructor(init?: Partial<PhuXeModel>) {
    super(init);
    this.vaiTro = Constant.VAI_TRO_PHU_XE;
  }
}
