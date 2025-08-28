import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { TripModel } from "../model/TripModel";

export class TripService {
  private static _seasonService: TripService;

  public static getInstance(): TripService {
    if (!TripService._seasonService) {
      TripService._seasonService = new TripService();
    }
    return TripService._seasonService;
  }

  public getLstTrip(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/getLstTrip",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertTrip(model: TripModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/insertTrip"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateTrip(model: TripModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/updateTrip"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteTrip(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/" + id + "/deleteTrip"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
