import { css } from 'lit-element';

export const newStyles = css`
tabla { 
  width: 100%; 
  border-collapse: collapse; 
}

tr {
  text-align: center;
}
h1:before {
 font-size: 0.8em;
}
td, th { 
  padding: 6px; 
  border: 1px solid #ccc;
  text-align: left; 
}

#select{
  border: 1px solid #ccc;
  width: 120px;
  border-radius: 3px;
  overflow: hidden;
}

@media 
only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px)  {
  label #select{
  font-size:1.2em;
}
    
table, thead, tbody, th, td, tr { 
  display: block; 
}
      
thead tr { 
  position: absolute;
  top: -9999px;
  left: -9999px;
}
      
tr { border: 1px solid #ccc; }
      
td { 
  border: none;
  border-bottom: 1px solid #eee; 
  position: relative;
  padding-left: 50%; 
}

.i0 .i1 .i2{
  width: 120px;
}

td:before { 
  position: relative;
  top: 0px;
  left: 30px;
  width: 85%; 
  padding-right: 40px; 
  white-space: nowrap;
}
      
td:nth-of-type(1):before { content: "Nombre Apellido:"; }
td:nth-of-type(2):before { content: "Fecha de Solicitud:"; }
td:nth-of-type(3):before { content: "Fecha de Inicio:"; }
td:nth-of-type(4):before { content: "Fecha Fin:"; }
td:nth-of-type(5):before { content: "Estado:"; }
td:nth-of-type(6):before { content: "Fecha de estado:"; }
`;
