import { Horario } from "../interfaces/horario";
import { Pago } from "../interfaces/pago";
import { Recurso } from "../interfaces/recurso";
import { Reserva } from "../interfaces/reserva";
import { CLIENTES } from "./cliente-data";
import { HORARIOS } from "./horario-data";
import { RECURSOS } from "./recurso-data";
import { SERVICIOS } from "./servicio-data";

// Método para generar reservas aleatorias

function generateReservas(count: number): Reserva[] {


  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 30); // Fechas dentro de los próximos 30 días
  start.setDate(start.getDate() - 30); 

    const reservas: Reserva[] = [];

    for (let i = 0; i < count; i++) {
      const cliente = getRandomCliente(CLIENTES);
      const recurso = getRandomItem(RECURSOS);
      const servicio = getRandomItem(SERVICIOS);
      const pago = getRandomPago();

      let fechayhora = ''


      reservas.push({
        id: (i + 1).toString(),
        //fechahora: getRandomDate(),
        fechahora: getRandomDateTimeNotNull(start,end),
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

  function getRandomDateTimeNotNull(start: Date,
    end: Date,){
    let result = null;
      
    while (result === null) {
      result = getRandomDateTimeBetween(start,end,getRandomItem(HORARIOS))
    }
    
    return result;
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





  


  function getRandomDateTimeBetween(
    fechaInicio: Date,
    fechaFin: Date,
    horario: Horario
  ): Date|null {
    // Filtrar los días que coincidan con el `horario.dia` entre `fechaInicio` y `fechaFin`
    const validDays: Date[] = [];
    let currentDate = new Date(fechaInicio);
  
    while (currentDate <= fechaFin) {
      if (currentDate.getDay() === horario.dia) {
        validDays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    if (validDays.length === 0) {
      return null
    }
  
    // Seleccionar un día aleatorio dentro de los días válidos
    const randomDay = getRandomItem(validDays);
  
    // Convertir el horario de inicio y cierre a minutos
    const startMinutes = convertTimeToMinutes(horario.inicio);
    const endMinutes = convertTimeToMinutes(horario.cierre) - 30; // Excluir el cierre exacto
  
    // Generar una hora aleatoria entre el inicio y el cierre, en intervalos de 30 minutos
    const randomMinute = getRandomNumberInRangeWithInterval(startMinutes, endMinutes, 30);
  
    // Asignar la hora generada al día seleccionado
    randomDay.setHours(Math.floor(randomMinute / 60), randomMinute % 60, 0, 0);
  
    return randomDay//.toLocaleString()//toISOString();
  }
  
  // Convertir una hora en formato "HH:MM" a minutos
  function convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  // Seleccionar un número aleatorio dentro de un rango con un intervalo específico (en este caso, de 30 minutos)
  function getRandomNumberInRangeWithInterval(min: number, max: number, interval: number): number {
    const possibleValues = [];
    for (let i = min; i <= max; i += interval) {
      possibleValues.push(i);
    }
    return getRandomItem(possibleValues);
  }












  export const RESERVAS: Reserva[] = generateReservas(400);