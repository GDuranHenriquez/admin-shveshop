//import styles from './grafBarTotalProducts.module.css'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

//type
import { DataTypeGrafBarTotalProducts, 
  DataTypeGrafBarTotalStockIn,
  DataTypeGrafBarTotalSellIn,
  DataTypeArrSellsLastThirty } from '../../../redux/slices/statiscts/types'

interface Props {
  dataBarTotalProduct: DataTypeGrafBarTotalProducts[] | DataTypeGrafBarTotalStockIn[] | DataTypeGrafBarTotalSellIn[] | DataTypeArrSellsLastThirty[]
  dataKeyXAxis: string,
  dataKeyBar : string
}

const GrafBarTotalProducts: React.FC<Props> = ({dataBarTotalProduct, dataKeyXAxis, dataKeyBar}) => {

  const renderCustomBarLabel = ({  x, y, width, value } : any) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value.toFixed(2)}`}</text>;
  };
  

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300}  data={dataBarTotalProduct} margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,}}
            barSize={20}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey= {dataKeyXAxis} scale="point" padding={{ left: 40, right: 40 }}/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey = {dataKeyBar} fill="#8884d8" barSize={40} background={{ fill: '#eee' }} label={renderCustomBarLabel}  /> 
      </BarChart>
    </ResponsiveContainer>
  )

}

export default GrafBarTotalProducts;