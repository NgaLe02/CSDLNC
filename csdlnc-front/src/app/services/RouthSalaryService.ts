import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { SeasonModel } from "../model/Season";
import { RouthSalaryModel } from "../model/RouthSalary";

export class RouthSalaryService {
  private static _routhSalaryService: RouthSalaryService;

  public static getInstance(): RouthSalaryService {
    if (!RouthSalaryService._routhSalaryService) {
      RouthSalaryService._routhSalaryService = new RouthSalaryService();
    }
    return RouthSalaryService._routhSalaryService;
  }

  public getLstRouthSalary(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routhSalary/getLstRouthSalary",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertRouthSalary(model: RouthSalaryModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routhSalary/insertRouthSalary"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateRouthSalary(model: RouthSalaryModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routhSalary/updateRouthSalary"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteRouthSalary(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/routhSalary/" + id + "/deleteRouthSalary"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
