import { UserInfo } from "../../../auth/typesProtecterRoute";

export interface UserStatus{
  user: UserInfo | null;
  allTipoDni: TipoDniType[] | [];
}

export type TypeUser = {
  id: number,
  nombre: string,
  correo: string,
  direccion: string,
  telefono: string,
  dni: string,
  usuarioTipoDni: number,
}

export type TypeGetClose = {
  pago_usd : number ,
  pago_mlc_efectivo : number,
  pago_mlc_digital: number,
  pago_mlc_punto : number ,
  vuelto_mlc : number ,
  vuelto_usd : number ,
  total_venta_mlc : number ,
  total_venta_usd : number
}

export type TipoDniType = {
  id?: number,
  tipo: string,
}

export type NewTipoDni = {
  nombre: string
}

export type TypeUserRootRegister = {
  correo: string,
  password: string,
  passwordAccess: string,
  nombre: string,
  direccion: string,
  telefono: string,
  dni: string,
  tipoDni: number,
  level: string
}