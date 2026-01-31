import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { LoaiDuAnModel } from "../model/LoaiDuAnModel";
import { LoaiCongViecModel } from "../model/LoaiCongViecModel";

export class LoaiCongViecService {
  private static _service: LoaiCongViecService;

  public static getInstance(): LoaiCongViecService {
    if (!LoaiCongViecService._service) {
      LoaiCongViecService._service = new LoaiCongViecService();
    }
    return LoaiCongViecService._service;
  }

  public getLstLoaiCv(request?: any) {
    const params = request ? ParamUtil.toRequestParams(request) : undefined;
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-cong-viec",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLoaiCvById(maLoai: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-cong-viec/" + maLoai,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertLoaiCv(model: LoaiCongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-cong-viec",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateLoaiCv(model: LoaiCongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-cong-viec",
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteLoaiCv(maLoai: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/loai-cong-viec/" + maLoai,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
