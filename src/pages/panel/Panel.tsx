import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from '../../Loading/Loading'
import { useAuth } from '../../auth/authPro'
import { useNavigate } from 'react-router-dom'
import { useCustomSelector } from '../../hooks/redux'
import getConfigCoinIsMlcOrRef from '../../utils/getConfigCoin'

//Types
import { DataTypeStatistics, 
  DataTypeGrafBarTotalProducts, 
  DataTypeGrafBarTotalStockIn,
  DataTypeGrafBarTotalSellIn,
  TipeDataSells,
  DataTypeSellsLastThirty,
  DataTypeArrSellsLastThirty } from '../../redux/slices/statiscts/types'

//comp
import GrafBarTotalProducts from '../../feacture/staticts/grafBarTotalProducts/GrafBarTotalProducts'
import LineChartsSells from '../../feacture/staticts/lineChartsSells/LineChartsSells'

const PanelPage: React.FC = () =>{
  
  const configCoin = getConfigCoinIsMlcOrRef()
  const navigate = useNavigate()
  const auth = useAuth()
  const levelUser = auth.getUser()?.level
  const allDepartamentos = useCustomSelector((select) => select.product.allDepartamentos)

  if(levelUser && levelUser !== 'root'){
    navigate('/addProduct')
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataStatict, setDataStatict] = useState<DataTypeStatistics | null>(null)
  const [dataBarTotalProduct, setDataBarTotalProduct] = useState<DataTypeGrafBarTotalProducts[] | null>(null)
  const [dataBarTotalStockIn, setDataBarTotalStockIn] = useState< DataTypeGrafBarTotalStockIn[] | null>(null)
  const [dataBarTotalSellIn, setDataBarTotalSellIn] = useState<DataTypeGrafBarTotalSellIn[] | null>(null)
  const [dataGraffLineSell, setDataGraffLineSell] = useState<TipeDataSells[] | null>(null)
  const [dataTotalsSellsLassTirtyDay, setDataTotalsSellsLassTirtyDay] = useState<DataTypeArrSellsLastThirty[] | null>(null)

  const getStatics = async () => {
    try {
      setIsLoading(true)
      const baseEndPoint = import.meta.env.VITE_BASENDPOINT_BACK
      const endPoint = baseEndPoint + '/productos/statics'
      const tkn = auth.getAccessToken()
      const config = {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
        data: null
      }
      const resp = await axios.get(endPoint, config)
      if(resp.status === 200){
        const data : DataTypeStatistics = resp.data as DataTypeStatistics;
        setDataStatict(data)
      }else if(resp.status === 202){
        console.log(resp.data)
      }else if(resp.status === 400){
        console.log(resp.data)
      }

    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const levelUser = auth.getUser()?.level
    console.log(auth.getAccessToken())
    if(levelUser && levelUser !== 'root'){
      navigate('/addProduct')
    }
    getStatics()
  }, [])

  useEffect(() => {
    if(dataStatict){

      const dataTotalsProducst: DataTypeGrafBarTotalProducts[]  = []
      const dataTotalsStockIn: DataTypeGrafBarTotalStockIn[] = []
      const dataTotalsEstimateSellIn: DataTypeGrafBarTotalSellIn[] = []
      

      const totalSellsIn = dataStatict.totalsProducts.totalStimateSellIn
      const totalProductsIn = dataStatict.totalsProducts.totalProductsIn
      const totalStockIn = dataStatict.totalsProducts.totalStockIn
      const sellsData = dataStatict.dataSells
      

      const namesTotalStockIn = Object.keys(totalStockIn)
      const namesProductsIn = Object.keys(totalProductsIn)
      const namesSellsIn = Object.keys(totalSellsIn)
      
      for (let i = 0; i < namesProductsIn.length; i++) {
        const name = namesProductsIn[i]
        const data: DataTypeGrafBarTotalProducts = {
          name: name,
          "Productos registrados" : totalProductsIn[name]
        }
        dataTotalsProducst.push(data)
      }
      for (let j = 0; j < namesTotalStockIn.length; j++) {
        const name = namesTotalStockIn[j]
        const data: DataTypeGrafBarTotalStockIn = {
          name: name,
          "Total inventario" : totalStockIn[name]
        }
        dataTotalsStockIn.push(data)
      }
      for (let k = 0; k < namesSellsIn.length; k++) {
        const name = namesSellsIn[k]
        const data: DataTypeGrafBarTotalSellIn = {
          name: name,
          "Venta total de stock" : totalSellsIn[name]
        }
        dataTotalsEstimateSellIn.push(data)
      }

      if (sellsData && sellsData.length) {
        const firstSell = sellsData[0];
        const namesFirstData = Object.keys(firstSell)
        const totalsLessThirtyDay : DataTypeSellsLastThirty = {}

        for (let d = 0; d < namesFirstData.length; d++) {
          const element = namesFirstData[d];
          if(element !== 'date'){
            totalsLessThirtyDay[element] = 0
          }
        }

        for (let i = 0; i < sellsData.length; i++) {
          const element = sellsData[i];
          const namesElement = Object.keys(element)
          for (let v = 0; v < namesElement.length; v++) {
            const name = namesElement[v];
            if(name !== 'date' && (name in element)){
              const value = element[name]
              if(typeof value === 'number'){
                totalsLessThirtyDay[name] = totalsLessThirtyDay[name] + value
              }
            }
          }
        }

        const arrTotalsLessThirtyDay : DataTypeArrSellsLastThirty[] = []
        for (let k = 0; k < allDepartamentos.length; k++) {
          const element = allDepartamentos[k];
          const name = (element.nombre).toLowerCase();
          const dataValue : DataTypeArrSellsLastThirty = {
            name: name,
            "venta en Bs.": 0,
            "venta Ref.": 0,
          }
          
          if((name + 'Bs') in totalsLessThirtyDay){
            dataValue['venta en Bs.'] = totalsLessThirtyDay[name + 'Bs']
          }
          if((name + 'Ref') in totalsLessThirtyDay){
            dataValue['venta Ref.'] = totalsLessThirtyDay[name + 'Ref']
          }
          arrTotalsLessThirtyDay.push(dataValue)
        }
        
        setDataTotalsSellsLassTirtyDay(arrTotalsLessThirtyDay)
        setDataGraffLineSell(sellsData)
      } 
      setDataBarTotalProduct(dataTotalsProducst)
      setDataBarTotalStockIn(dataTotalsStockIn)
      setDataBarTotalSellIn(dataTotalsEstimateSellIn)
    }
  }, [dataStatict])

  return <Container>
    {levelUser === 'root' ? <div className='containerTitle'>
      <h2>Estadisticas basicas de los productos y ventas en tienda.</h2>
    </div> : null}

    <div className='containerGraf'>

      {dataGraffLineSell ? 
        <div className='containerLineChart'>
          {
            configCoin === 'mlc' ? <p>Total ventas en Bs de los ultimos 30 días de cada uno de los departamentos</p> 
            :
            <p>Total ventas en moneda refencial de los ultimos 30 días de cada uno de los departamentos</p>
          } 
          
          <LineChartsSells data={dataGraffLineSell}/>
        </div>
        : null
      }

      {dataBarTotalProduct? <div className='containerCharBarOne'>
      <div className='containerBarChartTotalsProducts'>
          <p>Total venta de los ultimos 30 dias por cada departamento </p>
          {dataTotalsSellsLassTirtyDay && configCoin === 'mlc' ? <GrafBarTotalProducts dataKeyBar="venta en Bs." dataKeyXAxis='name' dataBarTotalProduct={dataTotalsSellsLassTirtyDay}/> 
          : null}
          {dataTotalsSellsLassTirtyDay && configCoin === 'ref' ? <GrafBarTotalProducts dataKeyBar="venta Ref." dataKeyXAxis='name' dataBarTotalProduct={dataTotalsSellsLassTirtyDay}/> 
          : null}
        </div>

        <div className='containerBarChartTotalsProducts'>
          <p>Total Productos registrados en los distintos departamentos</p>
           <GrafBarTotalProducts dataKeyBar="Productos registrados" dataKeyXAxis='name' dataBarTotalProduct={dataBarTotalProduct}/>
        </div>  
        
      </div> 
      : null}

      {dataBarTotalSellIn? <div className='containerCharBarOne'>
        <div className='containerBarChartTotalsProducts'>
          <p>Total productos en stock en los distintos departamentos </p>
          {dataBarTotalStockIn? <GrafBarTotalProducts dataKeyBar="Total inventario" dataKeyXAxis='name' dataBarTotalProduct={dataBarTotalStockIn}/> : null}
        </div>

        <div className='containerBarChartTotalsProducts'>
          {configCoin === 'mlc' ? <p>Total estimado por venta en moneda local de todo el stock en los distintos departamentos</p> : null}
          {configCoin === 'ref' ? <p>Total estimado por venta en moneda referencial de todo el stock en los distintos departamentos</p> : null}
          <GrafBarTotalProducts dataKeyBar="Venta total de stock" dataKeyXAxis='name' dataBarTotalProduct={dataBarTotalSellIn}/>
          
        </div>                
      </div> : null}

      {dataStatict && configCoin === 'mlc' ? <div className='containerInfoTotals'>
         <p>Tomando en cosideración todos los departamentos y todos los productos en los distintos departamentos se tiene un 
          total de <b>{(dataStatict.totalsProducts.totalProducts).toFixed(2)}</b> productos registrados y <b>{(dataStatict.totalsProducts.totalProductsInStock).toFixed(2)}</b> productos 
          en inventario, ademas por la venta total del inventario, se espera un ingreso de <b>{(dataStatict.totalsProducts.totalEstimatedVenta).toFixed(2)} Bs</b>, 
          teniendo esto en cuenta y considerando que a cada producto se le obtine un <b>30%</b> de rendimiento sobre su costo, se estima que la inversión es de <b>{(dataStatict.totalsProducts.totalEstimatedVenta / 1.3).toFixed(2)} Bs</b>.
        </p>
      </div> : null} 

      { dataStatict && configCoin === 'ref' ? <div className='containerInfoTotals'>
          <p>Tomando en cosideración todos los departamentos y todos los productos en los distintos departamentos se tiene un 
            total de <b>{(dataStatict.totalsProducts.totalProducts).toFixed(2)}</b> productos registrados y <b>{(dataStatict.totalsProducts.totalProductsInStock).toFixed(2)}</b> productos 
            en inventario, ademas por la venta total del inventario, se espera un ingreso de <b>{(dataStatict.totalsProducts.totalEstimatedVenta).toFixed(2)} Ref.</b>, 
            teniendo esto en cuenta y considerando que a cada producto se le obtine un <b>30%</b> de rendimiento sobre su costo, se estima que la inversión es de <b>{(dataStatict.totalsProducts.totalEstimatedVenta / 1.3).toFixed(2)} Ref</b>.
          </p>
        </div> : null} 
      
    </div>
    
    {isLoading? <Loading/> : null}
  </Container>
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 25px);
  height: 100%;
  min-height: 100vh;
  margin-left: 25px;
  margin-bottom: 25px;
  .containerGraf{
    width: 100%;
    display: flex;
    flex-direction: column;
    .containerTitle{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    .containerCharBarOne{
      margin-top: 25px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .containerBarChartTotalsProducts{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        width: 500px;
        height: 300px;
        margin-top: 30px;
        p{
          font-size: 14px;
          font-weight: 600;
          padding: 0;
          margin: 0;
        }
      }
    }
    .containerInfoTotals{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 25px;
      margin-bottom: 25px;
      width: 100%;
      p{
        font-size: 14px;
        font-weight: 500;
        width: 90%;
      }
    }
    .containerLineChart{
      width: 95%;
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      p{
        font-size: 14px;
        font-weight: 600;
        width: 100%;
        text-align: center;
      }
    }
  }
`

export default PanelPage;