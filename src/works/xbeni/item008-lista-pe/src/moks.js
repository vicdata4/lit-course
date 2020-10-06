export const extraerDatosListaPe = () => {
  // ITEM008
  /* FORMATO QUE DEBE RECIBIR Nombre="String", Email="String", telefono="String/Number", perfil="String", en_plantilla="boolean"(true="SI",false="NO"), fecha_ultima_actualizacion="STRING"(formato(dd/mm/yyyy)) */
  return [{ titulo: 'Tester Junior', fecha_publicacion: '16/09/2020', id_peticion: 'PET_201' }, { titulo: 'Analista Programador Java', fecha_publicacion: '18/08/2020', id_peticion: 'PET_202' }, { titulo: 'Prueba programador', fecha_publicacion: '16/09/2020', id_peticion: 'PET_203' }];
};

export const getDatosDescripcionPe = () => {
  // ITEM008
  /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resultados = JSON.parse(this.response);
                //SOLO HACE FALTA CARGAR EL DATO DE LA DESCRIPCION, EL TITULO Y FECHA SE SOLICITAN EN LA 1 CONSULTA AJAX
                this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_resultados_descripcion_publicacion).textContent = "DESCRIPCION PRUEBAA";
            }
        }
        var parametros_enviar = 'id_peticion=' + id_peticion;
        xhttp.open("POST", "RUTA EXTRACCION DE DATOS", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parametros_enviar);
  */
  return '';
};
