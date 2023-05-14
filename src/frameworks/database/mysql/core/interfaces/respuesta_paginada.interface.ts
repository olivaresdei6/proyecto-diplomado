export interface RespuestaPaginadaInterface<T> {
    cantidadTotalDeRegistros: number;
    paginasTotales: number,
    paginaActual: number,
    registrosPaginados: T[];
}
