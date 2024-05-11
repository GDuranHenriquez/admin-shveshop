import React, { useEffect, useState } from 'react';
import { useCustomSelector } from '../../../hooks/redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { TipeDataSells } from '../../../redux/slices/statiscts/types';

interface Props {
  data: TipeDataSells[]
}

const LineChartsSells : React.FC<Props> = ({data}) => {
  const allDepartamentos = useCustomSelector((select) => select.product.allDepartamentos)
  const [listColor, setListColor] = useState<string[]>([])
  const dataColors = [
    '#0000ff', '#8a2be2', '#a52a2a', '#7fff00', '#d2691e', '#6495ed', '#00ffff', '#006400', '#ff8c00',
    '#e9967a', '#00ced1', '#daa520', '#008000', '#cd5c5c', '#7cfc00', '#20b2aa', '#ff4500', '#cd853f',
    '#87ceeb', '#9acd32'
  ] 

  function generatePastelColors(n : number) {
    const colors = [];
    const minHue = 0; // Mínimo valor de matiz (rojo)
    const maxHue = 360; // Máximo valor de matiz (rojo)
    const saturation = 0.8; // Saturación constante
    const lightness = 0.3; // Luminosidad constante

    const step = (maxHue - minHue) / n;

    for (let i = 0; i < n; i++) {
        const hue = minHue + i * step;
        const color = `hsl(${hue},${saturation * 100}%,${lightness * 100}%)`;
        colors.push(color);
    }

    return colors;
}

  useEffect(() => {
    if(allDepartamentos){
      const n = allDepartamentos.length
      if( n > dataColors.length ){
        const colors = generatePastelColors(n)
        setListColor(colors)
      }else{
        setListColor(dataColors)
      }
      const colors = generatePastelColors(5)
      setListColor(colors)
    }
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            allDepartamentos && listColor ? allDepartamentos.map((depar, index) => {
              const name = (depar.nombre).toLowerCase() + 'Bs'
              if(index === 0){
                return <Line key={index} type="monotone" dataKey= {name} stroke={listColor[index]} activeDot={{ r: 8 }} />
              }else{
                return <Line key={index} type="monotone" dataKey={name} stroke={listColor[index]}  />
              }
            }) 
            : 
            null
          }       
          
        </LineChart>
      </ResponsiveContainer>
  )

}

export default LineChartsSells