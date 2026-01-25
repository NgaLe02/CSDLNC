import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { CongDoanModel } from "../model/CongDoanModel";

export class CongDoanService {
  private static _congDoanService: CongDoanService;

  public static getInstance(): CongDoanService {
    if (!CongDoanService._congDoanService) {
      CongDoanService._congDoanService = new CongDoanService();
    }
    return CongDoanService._congDoanService;
  }

  public getLstCongDoan(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getCongDoanById(maCd: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan/" + maCd,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertCongDoan(model: CongDoanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateCongDoan(model: CongDoanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan",
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteCongDoan(maCd: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan/" + maCd,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
