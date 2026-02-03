import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";

export class RequestService {
  private static _requestService: RequestService;

  public static getInstance(): RequestService {
    if (!RequestService._requestService) {
      RequestService._requestService = new RequestService();
    }
    return RequestService._requestService;
  }

  public getLstDuAn(model: { tenDuAn: string; thang: number; nam: number }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/request/du-an",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getCongDoanDuAn(maDuAn: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
        "/request/du-an/cong-doan?maDuAn=" +
        maDuAn,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLuongNhanVien(model: {
    tenDuAn: string;
    thang: number;
    nam: number;
  }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/request/luong-nhan-vien",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
