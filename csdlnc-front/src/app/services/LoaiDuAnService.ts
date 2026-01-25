import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { LoaiDuAnModel } from "../model/LoaiDuAnModel";

export class LoaiDuAnService {
  private static _loaiDuAnService: LoaiDuAnService;

  public static getInstance(): LoaiDuAnService {
    if (!LoaiDuAnService._loaiDuAnService) {
      LoaiDuAnService._loaiDuAnService = new LoaiDuAnService();
    }
    return LoaiDuAnService._loaiDuAnService;
  }

  public getLstLoaiDuAn(request?: any) {
    const params = request ? ParamUtil.toRequestParams(request) : undefined;
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-du-an",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLoaiDuAnById(maLoai: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-du-an/" + maLoai,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertLoaiDuAn(model: LoaiDuAnModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-du-an",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateLoaiDuAn(model: LoaiDuAnModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-du-an",
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteLoaiDuAn(maLoai: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-du-an/" + maLoai,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
