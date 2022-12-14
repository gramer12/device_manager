import { useState } from "react";

const Counter = (props: CounterProps) => {
  const [data, setData] = useState(0);

  function plus() {
    setData(data + 1);
  }
  function minus() {
    setData(data - 1);
  }
  return (
    <>
      <div className="bg-emerald-300">{props.title}</div>
      <div className="bg-red-700">
        카운터 수 : <span>{data}</span>
      </div>
      <button onClick={plus}>+1</button>
      <button onClick={minus}>-1</button>
    </>
  );
};

interface CounterProps {
  title: String;
  subtitle?: String;
}

export default Counter;
