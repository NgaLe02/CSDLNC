import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { ThucHienCongViecModel } from "../model/ThucHienCongViecModel";

export class ThucHienCongViecService {
  private static _thucHienCongViecService: ThucHienCongViecService;

  public static getInstance(): ThucHienCongViecService {
    if (!ThucHienCongViecService._thucHienCongViecService) {
      ThucHienCongViecService._thucHienCongViecService =
        new ThucHienCongViecService();
    }
    return ThucHienCongViecService._thucHienCongViecService;
  }

  public getLstThucHienCongViec(maCv: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongviec?maCongViec=" + maCv,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertListNvThucHienCongViec(model: {
    maCongViec: string;
    lstNhanVien: string[];
  }) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongviec/insert-list",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertThucHienCongViec(model: ThucHienCongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/thuchiencongviec",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateThucHienCongViec(model: ThucHienCongViecModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/thuchiencongviec`,
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteThucHienCongViec(maNv: string, maCv: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
        `/thuchiencongviec/delete?maNv=${maNv}&maCv=${maCv}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
