import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("/api");
      setValue(response.data);
      console.log(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="text-2xl font-semibold">
      <p>Hello World From the Typescript Client!</p>
      <p>{value}</p>
    </div>
  );
}

export default App;
