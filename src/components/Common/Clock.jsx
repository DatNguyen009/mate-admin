import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
export default function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();
      const currentDate = moment().format("DD-MM-YYYY");
      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();
      const currentTime = `${currentDate} ${hour}:${minute}:${second}`;
      setTime(currentTime);
    }, 1000);
  }, []);

  return <span>{time}</span>;
}
