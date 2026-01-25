import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { ThucHienCongDoanModel } from "../model/ThucHienCongDoanModel";

export class ThucHienCongDoanService {
  private static _thucHienCongDoanService: ThucHienCongDoanService;

  public static getInstance(): ThucHienCongDoanService {
    if (!ThucHienCongDoanService._thucHienCongDoanService) {
      ThucHienCongDoanService._thucHienCongDoanService =
        new ThucHienCongDoanService();
    }
    return ThucHienCongDoanService._thucHienCongDoanService;
  }

  public getLstThucHienCongDoan(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongdoan",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertThucHienCongDoan(model: ThucHienCongDoanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongdoan",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateThucHienCongDoan(
    ma_nv: string,
    ma_cd: string,
    model: ThucHienCongDoanModel,
  ) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thuchiencongdoan/${ma_nv}/${ma_cd}`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteThucHienCongDoan(ma_nv: string, ma_cd: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thuchiencongdoan/${ma_nv}/${ma_cd}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
