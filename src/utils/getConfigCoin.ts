
const COIN = import.meta.env.VITE_COIN

function getConfigCoinIsMlcOrRef() : 'mlc' | 'ref'{
  if(!COIN || COIN === 'mlc'){
    return 'mlc'
  }else if(COIN === 'ref'){
    return 'ref'
  }
  return 'mlc'
}

export default getConfigCoinIsMlcOrRef