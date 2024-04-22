import React, { useEffect, useRef, useState } from 'react'
import styles from './pdfCards.module.css'
import { useReactToPrint } from 'react-to-print'
import CardBarCode from "../cardBarCode/CardBarCode";

type TypeBarCode = {
  id: number,
  code: string,
  name: string,
}

type Option = {
  value: string;
  label: string;
}

type DataPrint = {
  selectOptionsSheetsData: Option,
  selectOptionLeterData: Option,
  sizeTagData: string[]
}


type Props = {
  listTags: TypeBarCode[],
  print: boolean,
  openModal: boolean
  setPrint: React.Dispatch<React.SetStateAction<boolean>>;
  dataPrint: DataPrint
}

interface Styles {
  containerCard?: React.CSSProperties;
  containerPrice?: React.CSSProperties;
  barcodeImage?: React.CSSProperties;
  spanComp?: React.CSSProperties;
}

const PdfCards: React.FC<Props> = ({listTags, print, setPrint, openModal, dataPrint}) => {

  const constGap = 4
  const refTags = useRef<HTMLIFrameElement>(null);
  const [widthPage, setWidthPage] = useState<number>(215.9)
  const [heightPage, setHeightPage] = useState<number>(279.4)  
  const [widthTag, setWidthTag] = useState<number>(50)
  const [heightTag, setHeightTag] = useState<number>(30)

  const [fontSizePrice, setFontSizePrice] = useState<number>(6)

  /* const [nPages, setNPages] = useState<number>(15) */
  const [pages, setPages] = useState<TypeBarCode[][]>([])

  const endPrint = () =>{
    window.alert('Impresion satisfactoria')
    setPrint(false)
  }
  const handlePrint = useReactToPrint({
    content: () => refTags.current,
    documentTitle: 'ticket',
    onAfterPrint: () => endPrint()
  })

  const getNPages = ()  => {
    let nPages: number = 1;
    const wct = widthTag + constGap;
    const hct = heightTag + constGap;
    const nCardHr = widthPage / wct;
    const nCardVr = heightPage / hct;
    const nCardPerPage = Math.floor(nCardHr) * Math.floor(nCardVr);
    const n = listTags.length;
    if(n <= nCardPerPage){
      nPages = 1
    }else{
      const resto = n % parseInt(nCardPerPage.toFixed(2));
      const numberPages = (n - resto) / parseInt(nCardPerPage.toFixed(2));      
      if(resto > 0){
        nPages = numberPages + 1; 
      }else{
        nPages = numberPages
      }
    }
    //obtemose ahora los slices para cada pagina
    const listPages: TypeBarCode[][] = []
    if(nPages === 1){
      listPages.push(listTags)
    }else{
      for(let i = 0; i < nPages; i++){
        if(i <= (nPages - 1)){
          const init = i * nCardPerPage;
          const end = (i+1) * nCardPerPage;
          const page = listTags.slice(init, end)
          listPages.push(page)
        }else{
          const page = listTags.slice(i * nPages)
          listPages.push(page)
        }
      }
    }
    /* setNPages(nPages); */
    setPages(listPages)
  }

  const getPageSize = (size: string) =>{
    switch (size) {
      case 'carta':
        setWidthPage(215.9)
        setHeightPage(279.4)
      break;    
      default:
        setWidthPage(215.9)
        setHeightPage(279.4)
      break;
    }
  }

  const readDataPrint = (data: DataPrint) => {
    const pageSize = data.selectOptionsSheetsData;
    const cardSize = data.sizeTagData;
    const leterSize = data.selectOptionLeterData.label;

    const calLeterSize = (parseFloat(leterSize) * 1.33).toFixed(2);
    const widthCard = parseFloat(cardSize[0]) * 10;
    const heigthCard = parseFloat(cardSize[1]) * 10;

    setWidthTag(widthCard)
    setHeightTag(heigthCard)
    setFontSizePrice(parseFloat(calLeterSize))
    getPageSize(pageSize.label)
  }

  useEffect(() => {
    if(dataPrint){
      readDataPrint(dataPrint)
      getNPages()
    }
  }, [dataPrint])

  
  const ComponentToPrint: React.FC = () =>{

    /* <div ref={refTags} className={styles.cardsContainer} style={{width: `${widthPage}`, maxWidth: `${widthPage}`}}>
      {listTags.length ? 
        listTags.map((tag, index) => {
          return <div key={index} className={styles.containerCards} style={{width: widthTag, minWidth: widthTag}}>
            <div className={styles.conatainerPrice}>
              <span id={styles.price}>{tag.price}</span>
              <span>Bs.</span>
            </div>
            <p>{tag.name}.</p>
          </div>
        })
      : null}
    </div> */

    const stylesCardBarCode : Styles = {
      containerCard: {
        maxWidth: `${widthTag}mm`,
        width: `${widthTag}mm`,
        height: `${heightTag}mm`,
        maxHeight: `${heightTag}mm`,
        border: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
      },
      containerPrice: {
        display: 'flex',
        maxWidth: `${widthTag - 4}mm`,
        width: `${widthTag - 4}mm`,
        height: `${heightTag - 10}mm`,
        maxHeight: `${heightTag - 10}mm`,
        justifyContent: 'center',
        alignItems: 'center'
      },
      spanComp:{
        fontSize: `${fontSizePrice * 1.1}px`,
        maxWidth: `${widthTag - 4}mm`,
      }
    }
    
    return (
      <div ref={refTags} className='page'>
        {pages.length ? 
          pages.map((page, index) => (
            <div key={`page${index}`} 
              className={styles.cardsContainer} 
              style={{width: `${widthPage}mm`, 
              maxWidth: `${widthPage}mm` , 
              minHeight: `${heightPage}mm`, 
              maxHeight: `${heightPage}mm` }}
            >
              {page.map((tag, index) => {
                return (
                  <div key={`${index}`+ `${tag.id}`} 
                    className={styles.containerCards} 
                    style={{width: `${widthTag}mm`, maxWidth: `${widthTag}mm` ,minWidth: `${widthTag}mm`,
                    height: `${heightTag}mm`, minHeight: `${heightTag}mm`, maxHeight: `${heightTag}mm`
                    }}>
                    <CardBarCode key={tag.id} barCode={tag} stylesProps={stylesCardBarCode}/>
                  </div>
                )
              })
            }
            </div>
          ))
        :null}
      </div>
    )
  }

  useEffect(() => {
    if(print){
      handlePrint()
    }
  }, [print])

  useEffect(() =>{
    if( openModal && listTags){
      getNPages()
    }
  }, [listTags, openModal])

  
  return (
    <div>
      <ComponentToPrint/>
    </div>
  )

  /* useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm', 
        format: [210, 297],
      });

      // Renderizar el componente PdfCards a HTML
      const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <PdfCards/>
      );

      // Generar el PDF con el HTML
      doc.html(htmlContent, {
        callback: function (pdf) {
          if (iframeRef.current) {
            // Convertir el PDF a una URL de datos y establecerlo como src del iframe
            const pdfDataUri = pdf.output('datauristring');
            iframeRef.current.src = pdfDataUri;
          }
        },
        x: 10,
        y: 10,
      });
    };

    generatePDF();
  }, [listTags]);
  
  return <iframe ref={iframeRef} title="PDF Previewer" width="100%" height="500px"/>; */
}

export default PdfCards;