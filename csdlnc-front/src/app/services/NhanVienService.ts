import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { NhanVienModel } from "../model/NhanVienModel";

export class NhanVienService {
  private static _nhanVienService: NhanVienService;

  public static getInstance(): NhanVienService {
    if (!NhanVienService._nhanVienService) {
      NhanVienService._nhanVienService = new NhanVienService();
    }
    return NhanVienService._nhanVienService;
  }

  public getLstNhanVien(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/nhanvien",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getNhanVienById(ma_nv: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/nhanvien/" + ma_nv,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertNhanVien(model: NhanVienModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/nhanvien",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateNhanVien(ma_nv: string, model: NhanVienModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/nhanvien/" + ma_nv,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteNhanVien(ma_nv: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/nhanvien/" + ma_nv,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
