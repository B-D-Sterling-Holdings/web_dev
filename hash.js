const bcrypt = require('bcryptjs')

const password = 'ilikepie@159'
const hash = bcrypt.hashSync(password, 10)

console.log('Generated hash:', hash)
