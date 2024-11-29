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
	fecha: string;
	cliente: ClienteEntity;
	opciones: OpcionModel[];
};

type OpcionModel = {
	ventanas: VentanaModel[];
};

type VentanaModel = {
	item: string;
	cantidad: number;
	material: string;
	tipe: string;
	color: string;
	alto: number;
	ancho: number;
	precio_unitario: number;
	precio_total: number;
};

type JWTBody = {
	user_id: number;
	is_admin: number;
	email: string;
	exp: number;
};
