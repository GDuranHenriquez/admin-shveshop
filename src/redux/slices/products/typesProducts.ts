export interface ProductState{
  allProducts: Product[] | [];
  allCategori: Category[] | [];
  allPresentacion: Presentacion[] | [];
  allDepartamentos: Departamento[] | [];
  rate : TypeRate | null;
}

export type Product = {
  id?: number | string;
  codigo: string;
  nombre: string;
  descripcion: string;
  lote: string | null;
  p_com_bulto: number;
  unidad_p_bulto: number;
  p_venta_bulto: number;
  p_venta_unidad: number;
  iva: number;
  total_bulto: number;
  cantidad_unidad: number;
  total_unidades?: number | null;
  img: string | Buffer | null,
  p_v_total_bulto?: number | null;
  p_v_total_unidad?: number | null;
  observacion: string | null;
  categoria: [number] | [] | Category[];
  ProductoPresentacion: Presentacion | null;
  ProductoDepartamento: Departamento | null;
  p_venta_mayor: number;
  cant_min_mayoreo: number;
  total_v_mayor?: number;
  delete?: boolean;
  venta_por: string | null;
  [key: string]: boolean | string | number | null | [number] | Buffer | undefined | [] | Category[] | Presentacion;
}

export type RegisterProduct = {
  codigo: string;
  nombre: string;
  descripcion: string;
  lote: string | null;
  p_com_bulto: number;
  unidad_p_bulto: number;
  p_venta_bulto: number;
  p_venta_unidad: number;
  iva: number;
  total_bulto: number;
  cantidad_unidad: number;
  img: string | Buffer | null,
  observacion: string | null,
  categorias: number[] | [],
  p_venta_mayor: number;
  cant_min_mayoreo: number;
  venta_por: string;
}

export type EditProduct = RegisterProduct & {
  id?: number | string;
  presentacion : number;
  departamento: number
}

export type Category = {
    id: number;
    nombre: string;
};

export type Presentacion = {
  id: number;
  nombre: string;
};

export type Departamento = {
  id: number;
  nombre: string;
};

export type ImageProduct = {
  type: string;
  data: number[];
}

export const ventasPor = [
  {
    id: 1,
    nombre: "unit"
  },
  {
    id: 2,
    nombre: "divisible"
  }
]

export type Categoria = {
  id: number,
  nombre: string
}

export type ProductoPresentacion = {
  id: number,
  nombre: string
}

export type ProductSearch = {
  id: number,
  codigo: string,
  nombre: string,
  descripcion: string,
  unidad_p_bulto: number,
  iva: number,
  total_bulto: number,
  cantidad_unidad: number,
  total_unidades: number;
  img: string | null,
  p_v_total_bulto: number,
  p_v_total_unidad: number,
  observacion: string,
  ProductoPresentacion: ProductoPresentacion,
  categoria: Categoria[],
  cant_min_mayoreo: number,
  total_v_mayor: number,
  venta_por: string;
}

export type TypeGetTotalPrice = {
  subTotal: number,
  total: number,
  subTotal_ref: number,
  totalFact_ref: number
}

export type TypeRate = {
  id: number,
  tasa: number
}

export type TypeAddSubProduct = {
  idProduct: number,
  cant: number,
  tipo: string
}