export interface Horario {
    id:number|undefined,
    inicio:string|null,
    cierre:string|null,
    dia:number,//0-domingo 6-sabado
    programadoDesde:Date,
    programadoHasta:Date|null,
}
