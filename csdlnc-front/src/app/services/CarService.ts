import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { CarModel } from "../model/CarModel";

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

  public saveCar(model: CarModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/car/saveCar"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateCar(model: CarModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/car/updateCar"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteCar(id: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/car/" + id + "/deleteCar"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
