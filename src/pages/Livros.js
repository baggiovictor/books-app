import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import CadastroLivroModal from "../core/components/CadastroLivro";

export default function Livros() {
  const [data, setData] = useState([]);
  const [livro, setLivro] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/livros");
      const data = await response.json();
      console.log(data)
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data from backend", error);
      console.log("Response:", error.response);
    }
  }

  const handleCadastroLivro = async (titulo, autor) => {
    const novoLivro = { titulo, autor };
    setLivro([...livro, novoLivro]);
    await fetchData();
  };


  return (
    <>
      <CadastroLivroModal onCadastro={handleCadastroLivro} atualizaLivros={fetchData} />
      <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Registro</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Emprestado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((livro) => (
                <TableRow key={livro.registro}>
                  <TableCell>{livro.registro}</TableCell>
                  <TableCell>{livro.titulo}</TableCell>
                  <TableCell>{livro.autor}</TableCell>
                  <TableCell>{livro.emprestado === 1 ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
