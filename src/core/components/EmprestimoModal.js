import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const EmprestimoModal = ({ open, onClose, onSalvar }) => {
  const [alunos, setAlunos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const buscarAlunos = async () => {
    try {
      const response = await fetch('http://localhost:5000/alunos');
      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
      } else {
        console.log('Erro ao buscar alunos');
      }
    } catch (error) {
      console.log('Erro ao buscar alunos', error);
    }
  };

  const buscarLivros = async () => {
    try {
      const response = await fetch('http://localhost:5000/livros');
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
      } else {
        console.log('Erro ao buscar livros');
      }
    } catch (error) {
      console.log('Erro ao buscar livros', error);
    }
  };

  useEffect(() => {
    buscarAlunos();
    buscarLivros();
  }, []);

  const handleClose = () => {
    setAlunoSelecionado(null);
    setLivroSelecionado(null);
    onClose();
  };

  const handleSalvar = () => {
    onSalvar(alunoSelecionado, livroSelecionado);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Criar empréstimo</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={alunos}
              getOptionLabel={(aluno) => aluno.nome}
              value={alunoSelecionado}
              onChange={(event, newValue) => {
                setAlunoSelecionado(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Pesquisar aluno" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={livros}
              getOptionLabel={(livro) => livro.titulo}
              value={livroSelecionado}
              onChange={(event, newValue) => {
                setLivroSelecionado(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Pesquisar livro" fullWidth />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSalvar}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmprestimoModal;
