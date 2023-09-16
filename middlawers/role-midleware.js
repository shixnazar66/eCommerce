const rolesMiddleware = (...args) => {
   return (req,res,next) => {
      const roles = req.role
      if(args.includes(roles)){
      next()
      }else{
      res.status(401).json({message:'forbiddin'})
      }
   }
}


module.exports = rolesMiddleware



