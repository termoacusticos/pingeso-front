-- CreateTable
CREATE TABLE "Quincalleria" (
    "id_quincalleria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc_quin" TEXT NOT NULL,
    "formula_quin" TEXT NOT NULL,
    "precio_quin" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id_perfil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_per" INTEGER NOT NULL,
    "formula_dim" TEXT NOT NULL,
    "formula_cant" TEXT NOT NULL,
    "kg_ml_per" REAL NOT NULL,
    "valor" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cristal" (
    "id_cristal" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc_cristal" TEXT NOT NULL,
    "precio_cristal" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Presupuesto" (
    "id_presupuesto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "rut_cliente" TEXT NOT NULL,
    CONSTRAINT "Presupuesto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Presupuesto_rut_cliente_fkey" FOREIGN KEY ("rut_cliente") REFERENCES "Cliente" ("rut_cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "rut_cliente" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Opcion" (
    "id_opcion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_presupuesto" INTEGER NOT NULL,
    CONSTRAINT "Opcion_id_presupuesto_fkey" FOREIGN KEY ("id_presupuesto") REFERENCES "Presupuesto" ("id_presupuesto") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ventana" (
    "id_ventana" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" INTEGER NOT NULL,
    "alto" REAL NOT NULL,
    "ancho" REAL NOT NULL,
    "item" TEXT NOT NULL,
    "precio_unitario" REAL NOT NULL,
    "precio_total" REAL NOT NULL,
    "id_color" INTEGER NOT NULL,
    "id_material" INTEGER NOT NULL,
    "id_cristal" INTEGER NOT NULL,
    "id_opcion" INTEGER NOT NULL,
    "id_tipo" INTEGER NOT NULL,
    CONSTRAINT "Ventana_id_opcion_fkey" FOREIGN KEY ("id_opcion") REFERENCES "Opcion" ("id_opcion") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ventana_id_tipo_fkey" FOREIGN KEY ("id_tipo") REFERENCES "Tipo" ("id_tipo") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ventana_id_color_fkey" FOREIGN KEY ("id_color") REFERENCES "Color" ("id_color") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ventana_id_cristal_fkey" FOREIGN KEY ("id_cristal") REFERENCES "Cristal" ("id_cristal") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ventana_id_material_fkey" FOREIGN KEY ("id_material") REFERENCES "Material" ("id_material") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id_tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion_tipo" TEXT NOT NULL,
    "id_material" INTEGER NOT NULL,
    "formula_ancho" TEXT NOT NULL,
    "formula_alto" TEXT NOT NULL,
    "cantidad_cristal" TEXT NOT NULL,
    "minimo" INTEGER,
    "maximo" INTEGER,
    CONSTRAINT "Tipo_id_material_fkey" FOREIGN KEY ("id_material") REFERENCES "Material" ("id_material") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Material" (
    "id_material" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_material" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TipoPerfil" (
    "id_tipo" INTEGER NOT NULL,
    "id_perfil" INTEGER NOT NULL,

    PRIMARY KEY ("id_tipo", "id_perfil"),
    CONSTRAINT "TipoPerfil_id_tipo_fkey" FOREIGN KEY ("id_tipo") REFERENCES "Tipo" ("id_tipo") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TipoPerfil_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "Perfil" ("id_perfil") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoQuincalleria" (
    "id_tipo" INTEGER NOT NULL,
    "id_quincalleria" INTEGER NOT NULL,

    PRIMARY KEY ("id_tipo", "id_quincalleria"),
    CONSTRAINT "TipoQuincalleria_id_tipo_fkey" FOREIGN KEY ("id_tipo") REFERENCES "Tipo" ("id_tipo") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TipoQuincalleria_id_quincalleria_fkey" FOREIGN KEY ("id_quincalleria") REFERENCES "Quincalleria" ("id_quincalleria") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Color" (
    "id_color" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Presupuesto_id_usuario_idx" ON "Presupuesto"("id_usuario");

-- CreateIndex
CREATE INDEX "Presupuesto_rut_cliente_idx" ON "Presupuesto"("rut_cliente");

-- CreateIndex
CREATE INDEX "Opcion_id_presupuesto_idx" ON "Opcion"("id_presupuesto");

-- CreateIndex
CREATE INDEX "Ventana_id_color_idx" ON "Ventana"("id_color");

-- CreateIndex
CREATE INDEX "Ventana_id_cristal_idx" ON "Ventana"("id_cristal");

-- CreateIndex
CREATE INDEX "Ventana_id_opcion_idx" ON "Ventana"("id_opcion");

-- CreateIndex
CREATE INDEX "Ventana_id_tipo_idx" ON "Ventana"("id_tipo");
