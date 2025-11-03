import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { TripModel } from "../model/TripModel";
import { AssigmentModel } from "../model/AssigmentModel";

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

  public deleteTrip(payload: { maChuyen: string, maXe: string, maTuyen: string }) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/deleteTrip"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
      data: payload,
    });
  }

  public assignEmployeesToTrip(payload: { addOrUpdate: AssigmentModel[], remove: AssigmentModel[] }) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/assignEmployeesToTrip"
    );
    return axios.post(url, payload, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getAssignEmployeesToTrip(trip: TripModel) {
    const info = {
      maChuyen: trip.maChuyen,
      maXe: trip.maXe,
      maTuyen: trip.maTuyen
    }
    const params = ParamUtil.toRequestParams(info);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/trip/getAssignEmployeesToTrip",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
