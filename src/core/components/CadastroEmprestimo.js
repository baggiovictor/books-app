import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";

const CadastroEmprestimo = (props) => {
  const [open, setOpen] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState("");
  const [selectedLivro, setSelectedLivro] = useState("");
  const [selectedAlunoId, setSelectedAlunoId] = useState(null);
  const [selectedLivroId, setSelectedLivroId] = useState(null);


  useEffect(() => {
    fetchAlunos();
    fetchLivros();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://localhost:5000/alunos");
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error("Failed to fetch data from backend", error);
    }
  };

  const fetchLivros = async () => {
    try {
      const response = await fetch("http://localhost:5000/livros");
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Failed to fetch data from backend", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSelectAluno = (event) => {
    setSelectedAluno(event.target.value);
  };

  const handleSelectLivro = (event) => {
    setSelectedLivro(event.target.value);
  };

  const handleEmprestimo = async () => {
    try {
      const response = await fetch("http://localhost:5000/emprestimos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matricula_aluno: 7,
          registro_livro: 3
        })

      });

      if (response.ok) {
        alert("Empréstimo cadastrado com sucesso!");
        props.atualizaEmprestimo();
        handleClose();
      } else if (response.status === 400) {
        alert("Livro já está emprestado.");
      } else {
        alert("Erro ao cadastrar empréstimo.");
      }
    } catch (error) {
      console.error("Failed to send data to backend", error);
    }
  };

  const handleCadastroEmprestimoWrapper = async () => {
    try {
      await handleEmprestimo({ matricula_aluno: alunos.matricula, autor: livros.registro });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Cadastrar Emprestimo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Empréstimo</DialogTitle>
        <DialogContent>
          <div>
            <FormControl style={{ minWidth: 150, marginRight: 16 }}>
              <InputLabel>Aluno</InputLabel>
              <Select value={selectedAluno} onChange={handleSelectAluno}>
                {alunos.map((aluno) => (
                  <MenuItem key={aluno.matricula} value={aluno.nome}>
                    {aluno.matricula} - {aluno.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ minWidth: 150, marginRight: 16 }}>
              <InputLabel>Livro</InputLabel>
              <Select value={selectedLivro} onChange={handleSelectLivro}>
                {livros.map((livro) => (
                  <MenuItem key={livro.registro} value={livro.titulo}>
                    {livro.registro} - {livro.titulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleCadastroEmprestimoWrapper}>
            Emprestar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CadastroEmprestimo