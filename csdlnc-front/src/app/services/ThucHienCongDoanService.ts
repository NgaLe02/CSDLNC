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

  public getLstThucHienCongDoan(model: {
    maDuAn: string;
    sttCongDoan: string;
  }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongdoan",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  // public getLstThucHienCongDoanByMaDuAn(maDuAn: string) {
  //   const url = ApiUrlUtil.buildQueryString(
  //     process.env.REACT_APP_API_URL +
  //       "/thuchiencongdoan/getByMaDuAn?maDuAn=" +
  //       maDuAn,
  //   );
  //   return axios.get(url, {
  //     headers: HeadersUtil.getHeaders(),
  //   });
  // }

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

  public deleteThucHienCongDoan(maNv: string, sttCd: string, maDuAn: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
        `/thuchiencongdoan/${maNv}/${sttCd}/${maDuAn}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
