const pool = require('./db')
const { funcion, rut, nombre, curso, nivel } = require('./argumentos')

const registrarEstudiante = async () => {
  pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) return console.error(errorConexion.code)
    const SQLQuery = {
      name: 'registrarEstudiante',
      text: 'insert into estudiante (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;',
      values: [nombre, rut, curso, nivel],
    }
    try {
      const res = await client.query(SQLQuery)
      release()
      console.log(`Estudiante ${nombre} Agregado con éxito`)
    } catch (error) {
      console.log(error)
    }
    pool.end()
  })
}

// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const estudianteRut = async () => {
  pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) return console.error(errorConexion.code)
    const SQLQuery = {
      name: 'estudianteRut',
      rowMode: 'array',
      text: 'SELECT * FROM estudiante WHERE rut = $1',
      values: [rut],
    }
    try {
      const res = await client.query(SQLQuery)
      release()
      console.log('Estudiante: ', res.rows)
    } catch (error) {
      console.log(error)
    }
    pool.end()
  })
}

// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const todosEstudiantes = async () => {
  pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) return console.error(errorConexion.code)
    const SQLQuery = {
      rowMode: 'array',
      name: 'todosEstudiante',
      text: 'SELECT * FROM estudiante',
    }
    try {
      const res = await client.query(SQLQuery)
      release()
      console.log('Estudiante: ', res.rows)
    } catch (error) {
      console.log(error)
    }
    pool.end()
  })
}

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.

const actualizarEstudiante = async () => {
  pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) return console.error(errorConexion.code)
    const SQLQuery = {
      rowMode: 'array',
      name: 'actualizarEstudiante',
      text: 'UPDATE estudiante SET nombre  = $1 , rut = $2, curso = $3, nivel = $4 WHERE rut = $2  RETURNING *;',
      values: [nombre, rut, curso, nivel],
    }
    try {
      const res = await client.query(SQLQuery)
      release()
      console.log('Registro del Estuadiante modificado', res.rows[0])
      console.log('Cantidad de registros afectados', res.rowCount)
    } catch (error) {
      console.log(error)
    }
    pool.end()
  })
}
// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const eliminarEstudiante = () => {
  pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) return console.error(errorConexion.code)
    const SQLQuery = {
      rowMode: 'array',
      name: 'fetch-user',
      text: 'DELETE FROM estudiante WHERE rut = $1',
      values: [rut],
    }
    try {
      const res = await client.query(SQLQuery)
      release()
      console.log(`Registro de estudiante con rut ${rut} eliminado.`)
      console.log('Cantidad de registros eliminados', res.rowCount)
    } catch (error) {
      console.log(error)
    }
    pool.end()
  })
}

if (funcion == 'nuevo') {
  registrarEstudiante()
} else if (funcion == 'consulta') {
  estudianteRut()
} else if (funcion == 'todos') {
  todosEstudiantes()
} else if (funcion == 'actualizar') {
  actualizarEstudiante()
} else if (funcion == 'eliminar') {
  eliminarEstudiante()
} else console.log('Consulta invalida')
