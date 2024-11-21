type Ventana = {
	material: string;
	tipo: string;
	item: string;
	cantidad: number;
	color: string;
	alto: number;
	ancho: number;
	precio_unitario: number;
	precio_total: number;
};

type Opcion = {
	material: string;
	color: string;
	ventanas: Ventana[];
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

type Presupuesto = {
	id_presupuesto: number;
	id_usuario: number;
	fecha: string;
	nombre_cliente: string;
	rut_cliente: string;
	opciones: Opcion[];
};

type Opcion = {
	id_opcion: number;
	ventanas: VentanaEntity[];
};

type JWTBody = {
	user_id: number;
	is_admin: number;
	email: string;
	exp: number;
};
