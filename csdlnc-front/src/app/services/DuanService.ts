import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { DuanModel } from "../model/DuanModel";

export class DuanService {
  private static _duanService: DuanService;

  public static getInstance(): DuanService {
    if (!DuanService._duanService) {
      DuanService._duanService = new DuanService();
    }
    return DuanService._duanService;
  }

  public getLstDuan(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/duan",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getDuanById(maDa: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/duan/" + maDa,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertDuan(model: DuanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/duan",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateDuan(model: DuanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/duan",
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteDuan(maDa: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/duan/" + maDa,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
