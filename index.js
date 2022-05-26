const pool = require('./db')
const { funcion, rut, nombre, curso, nivel } = require('./argumentos')

async function registrarEstudiante() {
  try {
    pool.connect(async (error_conexion, client, release) => {
      const SQLQuery = {
        name: 'fetch-user',
        text: 'insert into estudiante (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;',
        values: [nombre, rut, curso, nivel],
      }
      const res = await client.query(SQLQuery)
      release()
      console.log(`Estudiante ${nombre} Agregado con éxito`)
      pool.end()
    })
  } catch (error) {
    console.log(error)
  }
}

// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
async function estudianteRut() {
  try {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code)
      const SQLQuery = {
        name: 'fetch-user',
        rowMode: 'array',
        text: 'SELECT * FROM estudiante WHERE rut = $1',
        values: [rut],
      }
      const res = await client.query(SQLQuery)
      release()
      console.log('Estudiante: ', res.rows)
      pool.end()
    })
  } catch (error) {
    console.log(error)
  }
}

// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
async function todosEstudiantes() {
  try {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code)
      const SQLQuery = {
        rowMode: 'array',
        name: 'fetch-user',
        text: 'SELECT * FROM estudiante',
      }
      const res = await client.query(SQLQuery)
      release()
      console.log('Estudiante: ', res.rows)
      pool.end()
    })
  } catch (error) {
    console.log(error)
  }
}

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
async function actualizarEstudiante() {
  const res = await client.query(
    'UPDATE estudiante SET rut  = $1 , rut = $2, curso =$3, nivel=$4 WHERE rut = $2  RETURNING *;',
    [nombre, rut, curso, nivel]
  )
  console.log('Registro del Estuadiante modificado', res.rows[0])
  console.log('Cantidad de registros afectados', res.rowCount)
  client.end()
}

async function actualizarEstudiante() {
  try {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code)
      const SQLQuery = {
        rowMode: 'array',
        name: 'fetch-user',
        text: 'UPDATE estudiante SET nombre  = $1 , rut = $2, curso = $3, nivel = $4 WHERE rut = $2  RETURNING *;',
        values: [nombre, rut, curso, nivel],
      }
      const res = await client.query(SQLQuery)
      release()
      console.log('Registro del Estuadiante modificado', res.rows[0])
      console.log('Cantidad de registros afectados', res.rowCount)
      pool.end()
    })
  } catch (error) {
    console.log(error)
  }
}
// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
async function eliminarEstudiante() {
  try {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code)
      const SQLQuery = {
        rowMode: 'array',
        name: 'fetch-user',
        text: 'DELETE FROM estudiante WHERE rut = $1',
        values: [rut],
      }
      const res = await client.query(SQLQuery)
      release()
      console.log(`Registro de estudiante con rut ${rut} eliminado.`)
      console.log('Cantidad de registros eliminados', res.rowCount)
      pool.end()
    })
  } catch (error) {
    console.log(error)
  }
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
