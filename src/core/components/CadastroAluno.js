import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export default function CadastroAlunoModal(props) {
  const [open, setOpen] = useState(false);
  const [nomeAluno, setNomeAluno] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNomeAlunoChange = (event) => {
    setNomeAluno(event.target.value);
  };

  const handleCadastroAluno = async (nome) => {
    try {
      const response = await fetch('http://localhost:5000/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
      });

      if (response.ok) {
        const novoAluno = await response.json();
        console.log(novoAluno);
        props.atualizarAlunos(); // Chama a função para atualizar a tabela
        handleClose();
      } else {
        throw new Error('Erro ao cadastrar aluno');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCadastroAlunoWrapper = async () => {
    try {
      await handleCadastroAluno(nomeAluno);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Cadastrar Aluno
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastrar Aluno</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Aluno"
            type="text"
            fullWidth
            value={nomeAluno}
            onChange={handleNomeAlunoChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCadastroAlunoWrapper} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
