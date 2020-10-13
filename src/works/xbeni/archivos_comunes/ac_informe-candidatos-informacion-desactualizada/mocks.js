export const cargarInformacionCandidatosCipa = () => {
  /*
         1- HACER FUNCION AJAX QUE CARGUE TODOS LOS CANDIDATOS DE LA TABLA DE DATOS.
            ESTA PARTE SE DEBERIA DE HACER EN BACK-END POR SEGURIDAD ...
            1.1- HACER FUNCION QUE COMPARE LOS DATOS RECIBIDOS Y QUE CALCULE SI LA FECHA ACTUAL SUPERO LOS 18 MESES DE FECHA DE VENCIMIENTO
                1.1.1-LOS CANDIDATOS QUE SALGAN POSITIVO HACER OTRA FUNCION AJAX QUE LOS ELIMINE DE LA BASE DE DATOS
            1.2 LOS CANDIDATOS QUE SUPEREN EL FILTRO DE DE FECHAS QUE SE CARGUEN EN EL COMPONENTE
    */

  /* FORMATO QUE DEBE RECIBIR Nombre="String", Email="String", telefono="String/Number", perfil="String", en_plantilla="boolean"(true="SI",false="NO"), fecha_ultima_actualizacion="STRING"(formato(dd/mm/yyyy)) */
  return [{ nombre: 'Maria Mendoza', email: 'mm@gmail.com', telefono: '465464654', perfil: 'programador', en_plantilla: false, fecha_ultima_actualizacion: '25/4/2019' }, { nombre: 'Luisa Ojeda', email: 'lo@gmail.com', telefono: '658464132', perfil: 'programador', en_plantilla: true, fecha_ultima_actualizacion: '05/06/2019' }, { nombre: 'Javier Hernande', email: 'jehk@gmail.com', telefono: '645632111', perfil: 'arquitecto devop', en_plantilla: false, fecha_ultima_actualizacion: '11/06/2019' }, { nombre: 'Rocio Canales', email: 'rocio.canales@alvea.es', telefono: '652488965', perfil: 'programador', en_plantilla: true, fecha_ultima_actualizacion: '11/03/2019' }];
};
