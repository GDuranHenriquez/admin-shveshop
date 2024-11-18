import React, { useState, useEffect } from 'react';
import { DataTable, DataTableColumn } from "mantine-datatable";
import '../../styles/tables.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { useCustomSelector } from "../../hooks/redux";
import { TypeOrder } from "../../redux/slices/orders/typesOrders";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListOrders : React.FC<Props> = ({ setIsLoading }) => {

  const allOrders = useCustomSelector((state) => state.order.allOrders);
  const [records, setRecords] = useState<TypeOrder[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]); 
  
  /* const getAbonoFromOrder = (abono: TypeAbono[] ) : number => {

    let total: number = 0;    
    for(let i=0; i < abono.length; i++){
      const item: TypeAbono = abono[i];
      total = total + item.efectivoUsd + item.pagoDigitalUsd + (item.efectivoMlc / item.tasa) + (item.pagoDigitalMlc / item.tasa);
    }
    return total
  } */

  
  useEffect(() => {
    setRecords(allOrders)
  }, [allOrders])

  return <div>
    <div className="panel container-table-quoter">
      <div className="datatables div3d">
        <DataTable
          className="whitespace-nowrap table-hover"
          columns={[
          { accessor: 'id', title: 'ID', hidden: true },
          {
              accessor: 'fecha',
              title: 'Fecha',
              textAlign: 'center',
              sortable: true,
              render: (record: Record<string, unknown>) => {
                  const { fecha } = record as TypeOrder;
                  return (
                      <div><span>{fecha}</span></div>
                  )
              },
          },
          {
            accessor: 'pedido_cliente',
            title: 'Cliente',
            textAlign: 'center',
            sortable: true,
            render: (record: Record<string, unknown>) => {
                const { pedido_cliente } = record as TypeOrder;
                return (
                    <div><span>{(pedido_cliente.nombre).toUpperCase()}</span></div>
                )
            },
          },
          {
            accessor: 'pedido_usuario',
            title: 'Vendedor',
            textAlign: 'center',
            sortable: true,
            render: (record: Record<string, unknown>) => {
                const { pedido_usuario } = record as TypeOrder;
                return (
                    <div><span>{(pedido_usuario.nombre).toUpperCase()}</span></div>
                )
            },
          },
          { accessor: 'comentario', 
            title: 'Comentario', 
            textAlign: 'center', 
            sortable: true,
            width: 160,
            render: (record: Record<string, unknown>) => {
                const { comentario } = record as TypeOrder;
                return (
                    <div><span>{comentario ? comentario : ''}</span></div>
                )
            },
          },
          { accessor: 'deuda', 
            title: 'Deuda', 
            textAlign: 'center', 
            sortable: true,
            width: 160,
            render: (record: Record<string, unknown>) => {
                const { deuda } = record as TypeOrder;
                return (
                    <div><span>{deuda.toFixed(2)}</span></div>
                )
            },
          },
          { accessor: 'abono', 
            title: 'Abono', 
            textAlign: 'center', 
            sortable: true,
            width: 160,
            render: (record: Record<string, unknown>) => {
                const { totalAbono } = record as TypeOrder;
                return (
                    <div><span>{totalAbono.toFixed(2)}</span></div>
                )
            },
          },
          { accessor: 'pendiente', 
            title: 'Pendiente', 
            textAlign: 'center', 
            sortable: true,
            width: 160,
            render: (record: Record<string, unknown>) => {
                const { pendiente } = record as TypeOrder;
                return (
                    <div><span>{pendiente.toFixed(2)}</span></div>
                )
            },
          },
          /* {accessor: "deuda",
            title: "Deuda",
            textAlign: "center",
            render: (record: Record<string, unknown>) => {
              const { id } = record as TypeItems;
              const quantity = listQuoter?.[categoria.id]?.items[id]?.item?.realCost || '';
              return (
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => handleInputChange(id, 'realCost', e.target.value)}
                  style={{ width: "100%" }}
                  className="inputs-in-tabledata"
                  disabled = {selectedIds.includes(id) ? false: true}
                />
              );
            },
          },
          {
            accessor: "descriptionQuoter",
            title: "Descripcion para esta obra",
            textAlign: "center",
            width: 250,
            render: (record: Record<string, unknown>) => {
              const { id } = record as TypeItems;
              const description = listQuoter?.[categoria.id]?.items[id]?.item?.description || '';
              return (
                <textarea
                  value={description}
                  onChange={(e) => handleInputChange(id, 'description', e.target.value)}
                  style={{ width: "100%" }}
                  className="inputs-in-tabledata"
                  disabled = {selectedIds.includes(id) ? false: true}
                  rows={3}
                />
              );
            },
          },
          {
            accessor: "count",
            title: "Cantidad",
            textAlign: "center",
            width: 140,
            render: (record: Record<string, unknown>) => {
              const { id } = record as TypeItems;
              const quantity = listQuoter?.[categoria.id]?.items[id]?.item?.count || '';
              return (
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => handleInputChange(id, 'count', e.target.value)}
                  style={{ width: "100%" }}
                  className="inputs-in-tabledata"
                  disabled = {selectedIds.includes(id) ? false: true}
                />
              );
            },
          },
          {
            accessor: "percentage",
            title: "Porcentaje",
            textAlign: "center",
            width: 140,
            render: (record: Record<string, unknown>) => {
              const { id } = record as TypeItems;
              const percentage = listQuoter?.[categoria.id]?.items[id]?.item?.percentage || '';
              return (
                <input
                  type="text"
                  value={percentage}
                  onChange={(e) => handleInputChange(id, 'percentage', e.target.value)}
                  style={{ width: "100%" }}
                  className="inputs-in-tabledata"
                  disabled = {selectedIds.includes(id) ? false: true}
                />
              );
            },
          },
          {
            accessor: "total",
            title: "Total",
            textAlign: "center",
            render: (record: Record<string, unknown>) => {
              const { id } = record as TypeItems;
              const total = listQuoter?.[categoria.id]?.items[id]?.item?.total || 0;
              return (
                <div><span>{(total.toFixed(3))}</span></div>
              );
            },
          }, */
          ] as DataTableColumn<TypeOrder>[]}
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          records={records as TypeOrder[]}
          //selectedRecords={getSelectedItemsFromListQuoter(Object.values(listQuoter[categoria.id]?.items || []))}
          //onSelectedRecordsChange={(value) => selectedRecorsFromList(value)}
          height={300}
          //isRecordSelectable={(record) => record.name.length < 14}
        />
      </div>
    </div>
  </div>

}

export default ListOrders;