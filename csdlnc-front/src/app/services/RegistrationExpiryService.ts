import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { RegistrationExpiry } from "../model/RegistrationExpiry";

export class RegistrationExpiryService {
  private static _service: RegistrationExpiryService;

  public static getInstance(): RegistrationExpiryService {
    if (!RegistrationExpiryService._service) {
      RegistrationExpiryService._service = new RegistrationExpiryService();
    }
    return RegistrationExpiryService._service;
  }

  public getLstRegistrationExpiry(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/registrationExpiry/getLstRegistrationExpiry",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public saveRegistrationExpiry(model: RegistrationExpiry) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/registrationExpiry/saveRegistrationExpiry"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateRegistrationExpiry(model: RegistrationExpiry) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/registrationExpiry/updateRegistrationExpiry"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteRegistrationExpiry(id: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/registrationExpiry/" + id + "/deleteRegistrationExpiry"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLstRegistrationExpiryToCar(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/registrationExpiry/getLstRegistrationExpiryToCar",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
