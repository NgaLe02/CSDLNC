import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { CongViecModel } from "../model/CongViecModel";

export class CongViecService {
  private static _congViecService: CongViecService;

  public static getInstance(): CongViecService {
    if (!CongViecService._congViecService) {
      CongViecService._congViecService = new CongViecService();
    }
    return CongViecService._congViecService;
  }

  public getLstCongViec(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congviec",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertCongViec(model: CongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congviec",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateCongViec(model: CongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/congviec`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteCongViec(maCv: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/congviec/${maCv}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
