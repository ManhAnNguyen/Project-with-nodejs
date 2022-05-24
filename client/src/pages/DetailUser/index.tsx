import axios from "axios";
import { IUser } from "containers/ListUser";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailUser = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<IUser | null>(null);
  useEffect(() => {
    if (id) {
      fetchDetailUser();
    }
  }, [id]);

  const fetchDetailUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8080/users/${id}`,
      });
      setDetail(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  if (null) return <></>;

  return (
    <div>
      <h1>Name : {detail?.name}</h1>
      <h3>Age : {detail?.age}</h3>
    </div>
  );
};

export default DetailUser;
