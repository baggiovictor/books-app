import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CadastroAlunoModal from "../core/components/CadastroAluno";


function Alunos() {
  const [data, setData] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {

    fetchAlunos();
  }, []);

  async function fetchAlunos() {
    try {
      const response = await fetch('http://localhost:5000/alunos');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data from backend', error);
      console.log('Response:', error.response);
    }
  }

  const handleCadastroAluno = async (nome) => {
    const novoAluno = { nome };
    setAlunos([...alunos, novoAluno]);
    await fetchAlunos();
  };

  return (
    <>
      <CadastroAlunoModal onCadastro={handleCadastroAluno} atualizarAlunos={fetchAlunos} />

      <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Matrícula</TableCell>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return <TableRow key={row.matricula}>
                  <TableCell component="th" scope="row">
                    {row.matricula}
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Alunos;
