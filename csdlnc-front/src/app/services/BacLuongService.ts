import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { BacLuongModel } from "../model/BacLuongModel";

export class BacLuongService {
  private static _bacLuongService: BacLuongService;

  public static getInstance(): BacLuongService {
    if (!BacLuongService._bacLuongService) {
      BacLuongService._bacLuongService = new BacLuongService();
    }
    return BacLuongService._bacLuongService;
  }

  public getLstBacLuong(request: any = {}) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/bac-luong",
      params,
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertBacLuong(model: BacLuongModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/bac-luong",
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateBacLuong(model: BacLuongModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/bac-luong",
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteBacLuong(maBacLuong: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + `/bac-luong/${maBacLuong}`,
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
