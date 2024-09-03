import { Cliente } from "../interfaces/cliente";

// Arrays de nombres y apellidos
const nombresPila: string[] = [
  'Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura', 'Carlos', 'Lucía', 
  'José', 'Sofía', 'Miguel', 'Elena', 'Jorge', 'Patricia', 'Diego', 'Paula', 
  'Fernando', 'Isabel', 'Antonio', 'Marta', 'Francisco', 'Valeria', 'David', 
  'Carmen', 'Javier', 'Claudia', 'Raúl', 'Alicia', 'Daniel', 'Andrea', 
  'Roberto', 'Julia', 'Hugo', 'Teresa', 'Santiago', 'Eva', 'Alberto', 'Irene', 
  'Adrián', 'Sara', 'Manuel', 'Verónica', 'Jesús', 'Mónica', 'Ramón', 
  'Silvia', 'Álvaro', 'Beatriz', 'Ricardo', 'Victoria', 'Sergio'
];

const apellidos: string[] = [
  'Pérez', 'Gómez', 'Rodríguez', 'Fernández', 'López', 'Martínez', 
  'Sánchez', 'García', 'Romero', 'Díaz', 'Vázquez', 'Ramírez', 'Moreno', 
  'Muñoz', 'Alonso', 'Torres', 'Ruiz', 'Navarro', 'Rojas', 'Castillo', 
  'Ortega', 'Vega', 'Molina', 'Jiménez', 'Castro', 'Suárez', 'Reyes', 
  'Herrera', 'Domínguez', 'Gil'
];

// Función para generar un número de teléfono aleatorio
function getRandomPhoneNumber(): string {
  const prefix = '+54';  // Código de país (puedes cambiarlo)
  const number = Math.floor(1000000000 + Math.random() * 9000000000);  // Números de 10 dígitos
  return `${prefix} ${number}`;
}

// Función para generar el estado habilitado/deshabilitado al azar
function getRandomHabilitado(): boolean {
  return Math.random() >= 0.05;  // probabilidad de ser true
}

function geometricRandom(p: number) {
  // Genera un número basado en una distribución geométrica
  let k = Math.ceil(Math.log(1 - Math.random()) / Math.log(1 - p));
  
  // Asegúrate de que el valor esté entre 1 y 10
  return Math.min(k, 10);
}

// Función para generar un cliente aleatorio
function getRandomCliente(): Cliente {
  const nombre = nombresPila[Math.floor(Math.random() * nombresPila.length)];
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  const telefono = getRandomPhoneNumber();
  const habilitado = getRandomHabilitado();
  const cantidadReservas = geometricRandom(0.3);

  return { nombre, apellido, telefono, habilitado, cantidadReservas};
}


// Función para generar 65 clientes aleatorios
function generateRandomClientes(count: number): Cliente[] {
  const clientes: Cliente[] = [];
  for (let i = 0; i < count; i++) {
    clientes.push(getRandomCliente());
  }
  return clientes;
}

// Exporta los clientes generados
export const CLIENTES: Cliente[] = generateRandomClientes(65);