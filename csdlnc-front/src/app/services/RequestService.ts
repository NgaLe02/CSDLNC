import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";

export class RequestService {
  private static _requestService: RequestService;

  public static getInstance(): RequestService {
    if (!RequestService._requestService) {
      RequestService._requestService = new RequestService();
    }
    return RequestService._requestService;
  }

  public getSalary(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/request/employee/getSalary",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

}
