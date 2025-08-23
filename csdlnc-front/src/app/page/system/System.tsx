import { HttpStatusCode } from "axios";
import { CarService } from "../../services/CarService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Car from "./car/Car";
import TypeCar from "./typeCar/TypeCar";

export default function System() {
  return (
    <>
      <TypeCar></TypeCar>
    </>
  );
}
