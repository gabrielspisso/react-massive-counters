import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function Contador({ title, value, onPlus, onMinus, onTextChange, onDelete, onValueChange }: {
  title: string;
  value: number;
  onPlus: (event: any) => void;
  onMinus: (event: any) => void;
  onTextChange: (event: any) => void;
  onDelete: (event: any) => void;
  onValueChange: (newValue: number) => void;
}) {
  return <div>
    <TextField
      style={{ marginBottom: "20px", marginRight: "10px", marginLeft: "20px", maxWidth: "180px" }}
      label="Contador"
      color="success"
      focused variant="outlined"
      value={title}
      onChange={onTextChange} />
    <ButtonGroup variant="contained" style={{ height: "40px", maxWidth: "150px", marginTop: "10px" }}>
      <Button onClick={onDelete}><DeleteIcon /></Button>
      <Button color="warning" onClick={() => {
        const val = prompt('Por favor ingrese nuevo valor', value.toString());
        const newValue = parseInt(val ?? "", 10);
        if (isNaN(newValue))
          alert("No ha ingresado un numero valido");

        else
          onValueChange(newValue);
      }}>{value}</Button>
      <Button onClick={onPlus}><AddIcon /></Button>
      <Button onClick={onMinus}><RemoveIcon /></Button>
    </ButtonGroup>
  </div>;
}
