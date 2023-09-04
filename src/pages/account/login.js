import axios from "axios";
import { useQuery } from "react-query";
export const Login = () => {
  const url = "https://catfact.ninja/fact";
  let error;
  const { data, isLoading, isError, refetch, remove } = useQuery(
    ["catFact"],
    () => {
      return axios.get(url).then((res) => res.data.fact);
    }
  );
  if (isError) {
    return <h1>there was an error</h1>;
  }
  if (isLoading) {
    return <h1>loding ....</h1>;
  }
  return (
    <div>
      <h1>Login {data}</h1>
      <button>click</button>
    </div>
  );
};
