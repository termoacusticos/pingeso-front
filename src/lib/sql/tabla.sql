CREATE TABLE "Presupuesto" (
    "id_presupuesto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "rut_cliente" TEXT NOT NULL,
    "valor_despacho" INTEGER NOT NULL,
    "valor_instalacion" INTEGER NOT NULL,
    "texto_libre" TEXT NOT NULL,
    CONSTRAINT "Presupuesto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Presupuesto_rut_cliente_fkey" FOREIGN KEY ("rut_cliente") REFERENCES "Cliente" ("rut_cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);