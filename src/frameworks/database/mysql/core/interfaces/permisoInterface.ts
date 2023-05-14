export interface PermisoInterface {
    uuidDeLaRuta: string;
    rolDeUsuario: string;
    nombreDelModulo: string;
    rutaDelModulo: string;
    nombreDeLaRuta: string;
    direccionDeLaRuta: string;
    accionHaEjecutar: string;
    metodoHttp: string;
}

export interface ParametroInterface {
    uuid: string;
    nombre: string;
    es_requerido: boolean;
    observacion: string;
}

export interface RutaParametros {
    permiso: PermisoInterface,
    parametros: ParametroInterface[]
}

export interface ResultadoParametrosDeUnaRuta {
    ruta: string;
    metodoHttp: string;
    parametros: ParametroInterface[];
}
