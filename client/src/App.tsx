import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ListUser from "./containers/ListUser";

type TUser = {
  name: string;
  age: string | number;
};

const App = () => {
  const [user, setUser] = useState<TUser>({
    name: "",
    age: "",
  });

  const [refresh, setRefresh] = useState(false);

  const { name, age } = user;
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8080/users",
        data: user,
      });
      setRefresh(!refresh);
      alert("Add user successfully!!!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <SForm onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <button type="submit">Add</button>
      </SForm>
      <ListUser refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export default App;

const SForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
  input {
    display: block;
    margin: 10px 0;
  }
`;
