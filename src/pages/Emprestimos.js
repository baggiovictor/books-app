import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import EmprestimoModal from "../core/components/EmprestimoModal";
import CadastroEmprestimo from "../core/components/CadastroEmprestimo";

export default function Emprestimos() {
  const [data, setData] = useState([]);
  const [emprestimo, setEmprestimo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/emprestimos");
      const data = await response.json();
      console.log(data)
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data from backend", error);
      console.log("Response:", error.response);
    }
  }

  const handleDevolucao = async (registro) => {
    try {
      const response = await fetch(`http://localhost:5000/emprestimos/${registro}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registro_emprestimo: registro
        })
      });
      console.log(response)
      if (response.ok) {
        await fetchData();
      } else {
        const error = await response.json();
        console.error(error);
        alert('Erro ao registrar devolução');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar devolução');
    }
  };


  const handleCadastroEmprestimo = async (titulo, autor) => {
    const novoLivro = { titulo, autor };
    setEmprestimo([...emprestimo, novoLivro]);
    await fetchData();
  };


  return (
    <>
      <CadastroEmprestimo onCadastro={handleCadastroEmprestimo} atualizaEmprestimo={fetchData} />
      <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Registro</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Aluno</TableCell>
                <TableCell>Data Emprestimo</TableCell>
                <TableCell>Data Devolução</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((emprestimo) => (
                <TableRow key={emprestimo.registro_emprestimo}>
                  <TableCell>{emprestimo.registro_emprestimo}</TableCell>
                  <TableCell>{emprestimo.titulo_livro}</TableCell>
                  <TableCell>{emprestimo.nome_aluno}</TableCell>
                  <TableCell>{emprestimo.data_emprestimo}</TableCell>
                  <TableCell>{emprestimo.data_devolucao}</TableCell>
                  <TableCell>
                    {!emprestimo.data_devolucao ? (
                      <Button variant="contained" color="primary" onClick={() => handleDevolucao(emprestimo.registro_emprestimo)}>
                        Devolver
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" disabled>
                        Devolvido
                      </Button>
                    )}

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
