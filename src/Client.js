import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { css } from '@emotion/react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


const ValueDisplay = () => {
  const [value, setValue] = useState(0);
    
//  const Slider = css`
  //  background-color: blue;
    //color: white;
    //padding: 10px;
  // `;

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
    
  useEffect(() => {
    // Conectar al WebSocket
   const socket = io('http://localhost:8080');  // Asegúrate de que coincida con tu servidor Node.js

   socket.connect();

   console.log(socket);

    // Escuchar actualizaciones en tiempo real
   socket.on('resonga', (newValue) => {
     setValue(newValue.nombre);
   });

   return () => {
     socket.disconnect();  // Limpiar la conexión cuando el componente se desmonte
   };
  }, []);

  return (
    <div>
      <Typography gutterBottom> Humidity sensor </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
      />
      <h1>Valor recibido desde server:</h1>
      <p>{value}</p>
    </div>
  );
}

export default ValueDisplay;
