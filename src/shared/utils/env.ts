const env = {
  server: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://allper.powwer.io'
}

export default env;