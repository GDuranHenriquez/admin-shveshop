export type DataTypeStatistics = {
  totalsProducts : {
    totalProductsIn:{[clave: string] : number},
    totalStockIn:{[clave: string] : number},
    totalStimateSellIn:{[clave: string] : number},
    totalProducts: 0,
    totalProductsInStock: 0,
    totalEstimatedVenta: 0,
  },
  dataSells: TipeDataSells[]
}

export type TipeDataSells = {
  date: Date,
  naturistaBs: number,
  naturistaRef: number,
  licrasBs: number,
  licrasRef: number,
  [key: string]: Date | number;
}


export type DataTypeGrafBarTotalProducts= {
  name: string,
  "Productos registrados": number
}

export type DataTypeGrafBarTotalStockIn = {
  name: string,
  "Total inventario": number
}

export type DataTypeGrafBarTotalSellIn= {
  name: string,
  "Venta total de stock": number
}

export type DataTypeSellsLastThirty = {
  [clave: string] : number
}

export type DataTypeArrSellsLastThirty = { 
  name: string, 
  'venta en Bs.': number, 
  'venta Ref.': number
}