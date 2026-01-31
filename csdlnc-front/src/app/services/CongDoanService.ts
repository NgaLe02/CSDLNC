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

  public getLstCongDoanByMaDuAn(maDuAn: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan/getByMaDuAn?maDuAn=" + maDuAn,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getNhanVienTheoCongDoan(maDuAn: string, sttCongDoan: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
        "/congdoan/nhan-vien-theo-cong-doan?maDuAn=" +
        maDuAn +
        "&sttCongDoan=" +
        sttCongDoan,
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

  public deleteCongDoan(model: { maDuAn: string; sttCongDoan: string }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/congdoan",
      params,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
