-- DropIndex
DROP INDEX IF EXISTS "Ventana_id_tipo_idx";
DROP INDEX IF EXISTS "Ventana_id_opcion_idx";
DROP INDEX IF EXISTS "Ventana_id_cristal_idx";
DROP INDEX IF EXISTS "Ventana_id_color_idx";
DROP INDEX IF EXISTS "Opcion_id_presupuesto_idx";
DROP INDEX IF EXISTS "Presupuesto_rut_cliente_idx";
DROP INDEX IF EXISTS "Presupuesto_id_usuario_idx";
DROP INDEX IF EXISTS "Usuario_email_key";

-- DropTable
DROP TABLE IF EXISTS "TipoQuincalleria";
DROP TABLE IF EXISTS "TipoPerfil";
DROP TABLE IF EXISTS "Ventana";
DROP TABLE IF EXISTS "Opcion";
DROP TABLE IF EXISTS "Presupuesto";
DROP TABLE IF EXISTS "Cliente";
DROP TABLE IF EXISTS "Tipo";
DROP TABLE IF EXISTS "Material";
DROP TABLE IF EXISTS "Cristal";
DROP TABLE IF EXISTS "Perfil";
DROP TABLE IF EXISTS "Quincalleria";
DROP TABLE IF EXISTS "Usuario";
DROP TABLE IF EXISTS "Color";
DROP TABLE IF EXISTS "Imagen";
DROP TABLE IF EXISTS "constantes";
