type Cliente = {
	rut: string;
	nombre: string;
	direccion: string;
	email: string;
	telefono: string;
};

type Opcion = {
	material: string;
	color: string;
	ventanas: VentanaEntity[];
};

type Cotizacion = {
	id: Number;
	materiales: string[];
	alto: Number;
	ancho: Number;
	colores: string[];
	precio: Number;
	fecha: string;
};

type PresupuestoModel = {
	id_presupuesto: number;
	id_usuario: number;
	fecha: string;
	nombre_cliente: string;
	rut_cliente: string;
	opciones: OpcionModel[];
};

type OpcionModel = {
	id_opcion: number;
	ventanas: VentanaEntity[];
};

type JWTBody = {
	user_id: number;
	is_admin: number;
	email: string;
	exp: number;
};
