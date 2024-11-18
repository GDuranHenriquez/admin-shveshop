export interface status {
  allOrders: TypeOrder[]
}

export type TypeOrderDescription = {
  nombre: string,
  cantidad: number,
  precio: number
}

export type TypeAbono = {
  efectivoUsd: number,
  pagoDigitalUsd: number,
  efectivoMlc: number,
  pagoDigitalMlc: number,
  tasa: number
}

export type TypePedidoUsuario = {
  id: number,
  nombre: string,
  correo: string,
  telefono: string,
  dni: string,
  usuarioTipoDni: number
}

export type TypePedidoCliente = {
  id: number,
  nombre: string,
  correo: string | null,
  direccion: string |  null,
  telefono: string,
  dni: string,
  status: false,
  clienteTipoDni: number
}

export type TypeOrder = {
  id: number,
  fecha: string,
  comentario: string | null,
  descripcion: TypeOrderDescription[],
  deuda: number,
  abono: TypeAbono[],
  pendiente: number,
  estado: string,
  idCliente: number,
  totalAbono: number,
  idUsuario: number,
  pedido_usuario: TypePedidoUsuario,
  pedido_cliente: TypePedidoCliente
}

