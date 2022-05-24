import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface IUser {
  age: number;
  created_at: string;
  id: number;
  name: string;
}

const ListUser = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8080/users",
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SListUser>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ))}
    </SListUser>
  );
};

export default ListUser;

const User = ({
  user,
  setRefresh,
  refresh,
}: {
  user: IUser;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}) => {
  const handleDelete = async () => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:8080/users",
        data: { id: user.id },
      });
      setRefresh(!refresh);
      alert("DELETE USER SUCCESSFULLY");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SUser>
      <h1>Name : {user.name}</h1>
      <h4>Age : {user.age}</h4>
      <button onClick={handleDelete}>DELETE</button>
      <form>
        <input type="text" placeholder="username" />
        <input type="number" placeholder="age" />
        <button>UPDATE</button>
      </form>
    </SUser>
  );
};

const SListUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SUser = styled.div``;
