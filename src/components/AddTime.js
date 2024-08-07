import axios from "axios";
import React, { useEffect, useState } from "react";
const headers = {
  "ngrok-skip-browser-warning": "123",
};
/*
        {
            "ano_fundacao": 2000,
            "estadio": "nenhum",
            "nome": "aaaaaaaaa",
            "pais": "aaaa",
            "titulos": 0
        }
*/

const AddTime = ({ onTimeAdded }) => {
  const [nome, setNome] = useState("");
  const [titulos, setTitulos] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome === "" || nome.length < 4) {
      alert("erro, nome invalido");
    } else {
      console.log(nome);

      const novoTime = {
        nome,
        titulos,
      };
      try {
        const response = await axios.post(
          "https://6349-45-236-9-52.ngrok-free.app/times",
          novoTime,
          {
            headers: headers,
          }
        );
        console.log(response);
        setNome("");
        onTimeAdded(response.data);
      } catch (error) {
        console.error("Falha ao criar novo time:" + error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label>Titulos:</label>
        <input
          type="text"
          value={titulos}
          onChange={(e) => setTitulos(e.target.value)}
        />
        <button type="submit">Adicionar time</button>
      </form>
    </>
  );
};

export default AddTime;
