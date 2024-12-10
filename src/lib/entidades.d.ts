type UsuarioEntity = {
	id_usuario: number;
	email: string;
	password: string;
	is_admin: number;
};

type ClienteEntity = {
	rut: string;
	nombre: string;
	direccion: string;
	email: string;
	telefono: string;
};

type QuincalleriaEntity = {
	id: number;
	descripcion: string;
	formula: string;
	precio: number;
};

type PerfilEntity = {
	codigo: number;
	formula_dim: string;
	formula_cant: string;
	kg_ml: number;
	valor: number;
};

type CristalEntity = {
	id_cristal: number;
	descripcion: string;
	precio: number;
};

type PresupuestoEntity = {
	id_presupuesto: number;
	id_usuario: number;
	fecha: string;
	data_json: string;
	nombre_cliente: string;
	rut_cliente: string;
};

type OpcionEntity = {
	id_opcion: number;
	id_presupuesto: number;
};

type VentanaEntity = {
	id?: number;
	id_opcion?: number;
	cantidad: number;
	id_material: number;
	id_tipo: number;
	id_color: number;
	id_cristal: number;
	alto: number;
	ancho: number;
	precio_unitario: number;
	precio_total: number;
};

type TipoEntity = {
	id_tipo: number;
	descripcion_tipo: string;
	minimo: number;
	maximo: number;
};

type MaterialEntity = {
	id_material: number;
	nombre: string;
};

type ColorEntity = {
	id_color: number;
	nombre: string;
};