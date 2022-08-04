import React from 'react';
import './App.css';
import { useLocalStorage } from 'usehooks-ts'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { cloneDeep, chunk } from "lodash";
import AddIcon from '@mui/icons-material/Add';
import { Contador } from './Contador';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [arrayTemas, setArrayTemas] = useLocalStorage('arrayTemas', [{ titulo: "Test", value: 0 }])

  const onPlus = (index: number) => {
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy[index].value++;
    setArrayTemas(arrayCopy);
  }

  const onMinus = (index: number) => {
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy[index].value = Math.max(arrayCopy[index].value-1,0);
    setArrayTemas(arrayCopy);
  }

  const onTextChange = (index: number, e: any) => {
    const newValue = e.target.value;
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy[index].titulo = newValue;
    setArrayTemas(arrayCopy);
  }
  const onDelete = (index: number) => {
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy.splice(index, 1);
    setArrayTemas(arrayCopy);
  }

  const onValueChange = (index: number, newValue: number) => {
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy[index].value = newValue;
    setArrayTemas(arrayCopy);
  }

  const onNewCounter = () => {
    const newCounter = {titulo: "", value: 0}
    let arrayCopy = cloneDeep(arrayTemas);
    arrayCopy.push(newCounter);
    setArrayTemas(arrayCopy);
  }

  const chunkSize = 10

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          {
            chunk(arrayTemas,chunkSize).map((chunk, chunkIndex) => 
              <div style={{display:"flex", flexDirection: "column", marginRight: "10px"}}>
                {chunk.map((element, thisIndex) => {
                  const index = chunkIndex*chunkSize + thisIndex;
                  return(
                    <Contador
                      key={index}
                      title={element.titulo}
                      value={element.value}
                      onPlus={() => onPlus(index)}
                      onMinus={() => onMinus(index)}
                      onTextChange={(e) => onTextChange(index, e)}
                      onDelete={() => onDelete(index)}
                      onValueChange={(newValue: number) => onValueChange(index, newValue)}
                    />
                  );
                }
                )}
              </div>)
              }

        </header>
        <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
          <Button variant="contained" color="success" onClick={onNewCounter} startIcon={<AddIcon />}> Nuevo contador </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;


