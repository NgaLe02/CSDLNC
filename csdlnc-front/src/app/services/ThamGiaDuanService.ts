import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { ThamGiaDuanModel } from "../model/ThamGiaDuanModel";

export class ThamGiaDuanService {
  private static _thamGiaDuanService: ThamGiaDuanService;

  public static getInstance(): ThamGiaDuanService {
    if (!ThamGiaDuanService._thamGiaDuanService) {
      ThamGiaDuanService._thamGiaDuanService = new ThamGiaDuanService();
    }
    return ThamGiaDuanService._thamGiaDuanService;
  }

  public getLstThamGiaDuan(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thamgiaduan",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLstThamGiaDuanOfDuAn(model: {
    maDa: string;
    thang?: string;
    nam?: string;
  }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thamgiaduan/getByMaDa",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertThamGiaDuan(model: ThamGiaDuanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thamgiaduan",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateThamGiaDuan(model: ThamGiaDuanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thamgiaduan`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteThamGiaDuan(model: {
    maNv: string;
    maDa: string;
    thang: number;
    nam: number;
  }) {
    const params = ParamUtil.toRequestParams(model);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thamgiaduan/delete`,
      params,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
