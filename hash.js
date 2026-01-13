const bcrypt = require('bcryptjs')

const password = 'alpha'
const hash = bcrypt.hashSync(password, 10)

console.log('Generated hash:', hash)
