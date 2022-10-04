import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6331531fcff0e7bf70ea77b2.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка при получении пицца");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>загрузка ...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽ </h4>
    </div>
  );
};
export default FullPizza;
