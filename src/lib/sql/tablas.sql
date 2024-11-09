-- Tabla: quincalleria
CREATE TABLE IF NOT EXISTS quincalleria (
  id_quincalleria INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion_quin TEXT,
  formula_quin TEXT,
  precio_unitario INTEGER
);

-- Tabla: perfil
CREATE TABLE IF NOT EXISTS perfil (
  id_perfil INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_per INTEGER,
  formula_per TEXT,
  cantidad INTEGER,
  kg_ml_per DECIMAL
);

-- Tabla: cristal
CREATE TABLE IF NOT EXISTS cristal (
  formula_cris TEXT NOT NULL PRIMARY KEY,
  cantidad INTEGER,
  valor_m2 INTEGER
);

-- Tabla: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  rol_id INTEGER
);

-- Tabla: presupuesto
CREATE TABLE IF NOT EXISTS presupuesto (
  id_presupuesto INTEGER PRIMARY KEY AUTOINCREMENT,
  rut_usuario INTEGER NOT NULL,
  fecha DATE NOT NULL,
  data_json TEXT NOT NULL,
  nombre_cliente TEXT NOT NULL,
  rut_cliente INTEGER,
  FOREIGN KEY (rut_usuario) REFERENCES usuario (rut_usuario),
  FOREIGN KEY (rut_cliente) REFERENCES cliente (rut_cliente)
);

-- Tabla: cliente
CREATE TABLE IF NOT EXISTS cliente (
  rut_cliente TEXT NOT NULL PRIMARY KEY,
  nombre_cliente TEXT NOT NULL,
  direccion TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT
);

-- Tabla: opcion
CREATE TABLE IF NOT EXISTS opcion (
  id_opcion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_presupuesto INTEGER,
  FOREIGN KEY (id_presupuesto) REFERENCES presupuesto (id_presupuesto)
);

-- Tabla: ventana
CREATE TABLE IF NOT EXISTS ventana (
  id_ventana INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion TEXT,
  alto DECIMAL,
  ancho DECIMAL,
  minimo INTEGER,
  maximo INTEGER,
  id_opcion INTEGER,
  FOREIGN KEY (id_opcion) REFERENCES opcion (id_opcion)
);
