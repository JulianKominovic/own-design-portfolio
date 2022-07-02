import { useEffect, useMemo, useState } from "preact/hooks";
import Dayjs from "dayjs";
import "./Clock.css";
const Clock = () => {
  const [seconds, setSeconds] = useState(0);

  const memoizedDayjs = useMemo(() => {
    const DAYJS = Dayjs();
    return DAYJS;
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div class="clock">
      {memoizedDayjs.add(seconds, "seconds").format("HH:mm:ss")}
    </div>
  );
};

export default Clock;
