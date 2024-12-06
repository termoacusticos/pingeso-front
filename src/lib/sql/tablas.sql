-- Tabla: quincalleria
CREATE TABLE IF NOT EXISTS quincalleria (
  id_quincalleria INTEGER PRIMARY KEY AUTOINCREMENT,
  desc_quin TEXT,
  formula_quin TEXT,
  precio_quin INTEGER
);

-- Tabla: perfil
CREATE TABLE IF NOT EXISTS perfil (
  codigo_per INTEGER PRIMARY KEY,
  formula_dim TEXT,
  formula_cant TEXT,
  kg_ml_per DECIMAL
);

-- Tabla: cristal
CREATE TABLE IF NOT EXISTS cristal (
  id_cristal INTEGER PRIMARY KEY AUTOINCREMENT,
  desc_cristal TEXT,
  precio_cristal INTEGER
);

-- Tabla: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  is_admin INTEGER
);

-- Tabla: presupuesto
CREATE TABLE IF NOT EXISTS presupuesto (
  id_presupuesto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  fecha DATE NOT NULL,
  data_json TEXT NOT NULL,
  rut_cliente INTEGER,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (rut_cliente) REFERENCES cliente (rut_cliente)
);

-- Tabla: cliente
CREATE TABLE IF NOT EXISTS cliente (
  rut_cliente TEXT NOT NULL PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT
);

-- Tabla: opcion
CREATE TABLE IF NOT EXISTS opcion (
  id_opcion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_presupuesto INTEGER,
  FOREIGN KEY (id_presupuesto) REFERENCES presupuesto (id_presupuesto) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: ventana
CREATE TABLE IF NOT EXISTS ventana (
  id_ventana INTEGER PRIMARY KEY AUTOINCREMENT,
  cantidad INTEGER,
  material TEXT,
  color TEXT,
  id_tipo INTEGER,
  alto DECIMAL,
  ancho DECIMAL,
  id_opcion INTEGER,
	precio_unitario DECIMAL,
	precio_total DECIMAL,
  FOREIGN KEY (id_opcion) REFERENCES opcion (id_opcion) ON DELETE CASCADE ON UPDATE CASCADE
  FOREIGN KEY (id_tipo) REFERENCES tipo (id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tipo (
  id_tipo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  descripcion_tipo TEXT NOT NULL,
  minimo INTEGER,
  maximo INTEGER
);


CREATE TABLE IF NOT EXISTS tipo_perfil (
  id_tipo INTEGER NOT NULL,
  id_perfil INTEGER NOT NULL,
  FOREIGN KEY (id_tipo) REFERENCES tipo (id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
  FOREIGN KEY (id_perfil) REFERENCES perfil (id_perfil) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS tipo_quincalleria (
  id_tipo INTEGER NOT NULL,
  id_quincalleria INTEGER NOT NULL,
  FOREIGN KEY (id_tipo) REFERENCES tipo (id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
  FOREIGN KEY (id_quincalleria) REFERENCES quincalleria (id_quincalleria) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS material (
  id_material INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre_material TEXT NOT NULL
);