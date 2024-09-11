export interface Horario {
    id:number,
    inicio:string|null,
    cierre:string|null,
    dia:number,//0-domingo 6-sabado
    programado:string,
}
