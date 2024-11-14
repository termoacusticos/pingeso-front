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
	id: number;
	codigo: number;
	formula: string;
	cantidad: number;
	kg_ml: number;
};

type CristalEntity = {
	formula: string;
	cantidad: number;
	valor_m2: number;
};

type PresupuestoEntity = {
	id: number;
	rut_usuario: number;
	fecha: Date;
	data_json: string;
	nombre_cliente: string;
	rut_cliente: string;
};

type OpcionEntity = {
	id: number;
	id_presupuesto: number;
};

type VentanaEntity = {
	id: number;
	descripcion: string;
	alto: number;
	ancho: number;
	minimo: number;
	maximo: number;
	id_opcion: number;
};
