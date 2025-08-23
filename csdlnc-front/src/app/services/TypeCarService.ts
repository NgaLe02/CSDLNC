import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";

export class TypeCarService {
  private static _typeCarService: TypeCarService;

  public static getInstance(): TypeCarService {
    if (!TypeCarService._typeCarService) {
      TypeCarService._typeCarService = new TypeCarService();
    }
    return TypeCarService._typeCarService;
  }

  public getLstTypeCar(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/typeCar/getLstTypeCar",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public saveTypeCar(model: any) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/typeCar/saveTypeCar"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateTypeCar(model: any) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/typeCar/updateTypeCar"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteTypeCar(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/typeCar/" + id + "/deleteTypeCar"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
