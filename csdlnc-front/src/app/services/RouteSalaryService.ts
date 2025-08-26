import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { RouteSalaryModel } from "../model/RouteSalaryModel";

export class RouteSalaryService {
  private static _routeSalaryService: RouteSalaryService;

  public static getInstance(): RouteSalaryService {
    if (!RouteSalaryService._routeSalaryService) {
      RouteSalaryService._routeSalaryService = new RouteSalaryService();
    }
    return RouteSalaryService._routeSalaryService;
  }

  public getLstRouteSalary(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routeSalary/getLstRouteSalary",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertRouteSalary(model: RouteSalaryModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routeSalary/insertRouteSalary"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateRouteSalary(model: RouteSalaryModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routeSalary/updateRouteSalary"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteRouteSalary(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
        "/routeSalary/" +
        id +
        "/deleteRoutehSalary"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
