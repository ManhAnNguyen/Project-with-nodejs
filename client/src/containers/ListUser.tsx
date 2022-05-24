import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [updatedUser, setUpdatedUser] = useState<IUser>(user);
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
  const { name, age } = updatedUser;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: "PUT",
        url: "http://localhost:8080/users",
        data: updatedUser,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SUser>
      <Link to={`/user/${user.id}`}>Name : {user.name}</Link>
      <h4>Age : {user.age}</h4>
      <button onClick={handleDelete}>DELETE</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, age: Number(e.target.value) })
          }
        />
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

const SUser = styled.div`
  a {
    text-decoration: none;
    color: aqua;
    font-size: 28px;
  }
`;
