const argumentos = process.argv.slice(2)

const funcion = argumentos[0]
const rut = argumentos[1]
const nombre = argumentos[2]
const curso = argumentos[3]
const nivel = argumentos[4]

module.exports = { funcion, rut, nombre, curso, nivel }
