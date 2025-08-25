import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { CarModel } from "../model/CarModel";
import { PassengerModel } from "../model/PassengerModel";

export class PassengerService {
  private static _passengerService: PassengerService;

  public static getInstance(): PassengerService {
    if (!PassengerService._passengerService) {
      PassengerService._passengerService = new PassengerService();
    }
    return PassengerService._passengerService;
  }

  public getLstPassenger(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/passeneger/getLstPassenger",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertPassenger(model: PassengerModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/passeneger/insertPassenger"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updatePassenger(model: PassengerModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/passeneger/updatePassenger"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deletePassenger(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/passeneger/" + id + "/deletePassenger"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
