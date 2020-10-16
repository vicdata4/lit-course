export const extraerDatosListaPe =
[
  { titulo: 'Tester Junior', fecha_publicacion: '16/09/2020', id_peticion: 'PET_201' },
  { titulo: 'Analista Programador Java', fecha_publicacion: '18/08/2020', id_peticion: 'PET_202' },
  { titulo: 'Prueba programador', fecha_publicacion: '16/09/2020', id_peticion: 'PET_203' }
];

export const getDatosDescripcionPe = (idPeticion) => {
  return 'Requisitos:\nUn año de experiencia minimo\nLugar de Trabajo: Las Tablas\nActividades:\nAutomatización de pruebas\nDescripcion se obtendra de ajax una vez que se conecte a la base datos.';
};
