import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const CadastroLivroModal = (props) => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleAutorChange = (event) => {
    setAutor(event.target.value);
  };


  const cadastrarLivro = async (livro) => {
    try {
      const response = await fetch('http://localhost:5000/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
      });

      if (response.ok) {
        const data = await response.json();
        props.atualizaLivros();
        alert(data.message);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar livro');
    }
  };

  const handleCadastroLivroWrapper = async () => {
    try {
      await cadastrarLivro({ titulo: titulo, autor: autor });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ margin: '50px auto', maxWidth: 800, padding: '0 16px' }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Cadastro de Livro
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastrar Livro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            value={titulo}
            onChange={handleTituloChange}
          />
          <TextField
            margin="dense"
            label="Autor"
            fullWidth
            value={autor}
            onChange={handleAutorChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCadastroLivroWrapper} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CadastroLivroModal;
