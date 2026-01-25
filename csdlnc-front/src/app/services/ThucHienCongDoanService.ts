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

  public updateThucHienCongDoan(model: ThucHienCongDoanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thuchiencongdoan`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteThucHienCongDoan(maNv: string, maCd: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thuchiencongdoan/${maNv}/${maCd}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
