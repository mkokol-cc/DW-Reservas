import { Cliente } from "./cliente"
import { Pago } from "./pago"
import { Recurso } from "./recurso"
import { Servicio } from "./servicio"

export interface Reserva {
    id:string|number,
    fechahora: string|Date,
    precioSenia: number,
    precio: number,
    servicio: Servicio,
    recurso: Recurso,
    pago: Pago|undefined,
    cliente: Cliente,
    cancelado: boolean,
}
