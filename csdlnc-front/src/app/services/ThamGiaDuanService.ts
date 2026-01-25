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

  public insertThamGiaDuan(model: ThamGiaDuanModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thamgiaduan",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateThamGiaDuan(
    maNv: string,
    maDa: string,
    model: ThamGiaDuanModel,
  ) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thamgiaduan/${maNv}/${maDa}`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteThamGiaDuan(maNv: string, maDa: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thamgiaduan/${maNv}/${maDa}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
