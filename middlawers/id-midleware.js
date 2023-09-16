function idMidleware(req,res,next){
  let str = ''
  const id = Number(req.params.id)
  if(!id){
    throw new Error('id yoq')
  }if(typeof id !== 'number'){
    throw new Error('typeOf xato')
  }if(id<1 || id>200){
    throw new Error('nomer kop')
  }
  next()
}

module.exports = idMidleware