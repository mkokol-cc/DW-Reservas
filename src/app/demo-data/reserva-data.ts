import { Pago } from "../interfaces/pago";
import { Reserva } from "../interfaces/reserva";
import { CLIENTES } from "./cliente-data";
import { RECURSOS } from "./recurso-data";
import { SERVICIOS } from "./servicio-data";

// Método para generar reservas aleatorias
function generateReservas(count: number): Reserva[] {
    const reservas: Reserva[] = [];

    for (let i = 0; i < count; i++) {
      const cliente = getRandomCliente(CLIENTES);
      const recurso = getRandomItem(RECURSOS);
      const servicio = getRandomItem(SERVICIOS);
      const pago = getRandomPago();

      reservas.push({
        id: (i + 1).toString(),
        fechahora: getRandomDate(),
        precioSenia: getRandomNumber(50, 200),
        precio: getRandomNumber(300, 1000),
        servicio: servicio,
        recurso: recurso,
        pago: pago,
        cliente: cliente,
        cancelado: Math.random() < 0.2, // 20% probabilidad de estar cancelado
      });
    }

    return reservas;
  }

  // Generar una fecha aleatoria
  function getRandomDate(): string {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 30); // Fechas dentro de los próximos 30 días
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString();
  }

  // Selecciona un elemento aleatorio de un array
  function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Selecciona un elemento aleatorio de un array
  function getRandomCliente<Cliente>(array: Cliente[]): Cliente {
    let isBlackList = true
    let cliente:any = {}
    while(isBlackList){
      cliente = array[Math.floor(Math.random() * array.length)]
      isBlackList = !cliente.habilitado
    }
    return cliente;
  }

  // Generar un número aleatorio entre min y max
  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generar un pago aleatorio (objeto vacío o undefined)
  function getRandomPago(): Pago | undefined {
    return Math.random() < 0.5 ? {} as Pago : undefined;
  }

  export const RESERVAS: Reserva[] = generateReservas(100);