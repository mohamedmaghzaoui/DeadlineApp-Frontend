import axios from "axios";
import { useQuery } from "react-query";
export const SignIn = () => {
  const url = "http://localhost:3001/events";
  const { data, isLoading, isError } = useQuery(["event"], () => {
    return axios.get(url).then((res) => res.data);
  });
  console.log(data);

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return <h1>there was an error</h1>;
  }
  return (
    <div>
      <h1>sign</h1>
      {data.map((event) => {
        return <p>{event.start}</p>;
      })}
    </div>
  );
};
