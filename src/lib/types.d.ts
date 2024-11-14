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

type Cotizacion = {
	id: Number;
	materiales: string[];
	alto: Number;
	ancho: Number;
	colores: string[];
	precio: Number;
	fecha: string;
};
