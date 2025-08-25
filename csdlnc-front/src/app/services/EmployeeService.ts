import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { CarModel } from "../model/CarModel";
import { PassengerModel } from "../model/PassengerModel";

export class EmployeeService {
  private static _employeeService: EmployeeService;

  public static getInstance(): EmployeeService {
    if (!EmployeeService._employeeService) {
      EmployeeService._employeeService = new EmployeeService();
    }
    return EmployeeService._employeeService;
  }

  public getLstEmployee(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/employee/getLstEmployee",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertEmployee(model: PassengerModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/employee/insertEmployee"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateEmployee(model: PassengerModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/employee/updateEmployee"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteEmployee(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/employee/" + id + "/deleteEmployee"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
