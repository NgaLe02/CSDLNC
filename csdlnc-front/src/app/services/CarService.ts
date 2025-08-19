import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";

export class CarService {
  private static _carService: CarService;

  public static getInstance(): CarService {
    if (!CarService._carService) {
      CarService._carService = new CarService();
    }
    return CarService._carService;
  }

  public getLstCar(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/car/getLstCar",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
