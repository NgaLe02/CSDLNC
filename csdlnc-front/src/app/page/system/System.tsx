import { HttpStatusCode } from "axios";
import { CarService } from "../../services/CarService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function System() {
  const [listCar, setListCar] = useState([]);

  useEffect(() => {
    getLstCar();
  }, []);

  function getLstCar() {
    CarService.getInstance()
      .getLstCar({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            // const mappedData = data.map((item: any) => ({
            //     value: item.id,
            //     name: item.name,
            // }));
            setListCar(data);
          } else {
            toast.error("Tìm kiếm không thành công");
          }
        } else {
          toast.error("Tìm kiếm không thành công");
        }
      })
      .catch((error) => {
        toast.error("Tìm kiếm không thành công");
      });
  }

  return <></>;
}
