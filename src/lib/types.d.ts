import type { Material, Prisma, Tipo, Ventana, Color, Cristal, Cliente } from '@prisma/client';

type ConstantData = {
	materiales: Material[];
	colores: Color[];
	cristales: Cristal[];
	tipos: Tipo[];
}

type ClienteUI = {
	rut_cliente: string;
	nombre: string;
	direccion: string;
	email: string;
	telefono: string;
};

type OpcionUI = {
	material: string;
	color: string;
	ventanas: VentanaUI[];
};

type CotizacionUI = {
	id: Number;
	nombreCliente: string;
	rut: string;
	valor_total: Number;
	fechaCreacion: string;
};

type PresupuestoUI = {
	id_presupuesto?: number;
	id_usuario: number;
	fecha: string;
	cliente: ClienteUI;
	Opciones: OpcionUI[];
}

type PresupuestoModel = {
	id_presupuesto?: number;
	id_usuario: number;
	fecha: string;
	cliente: Cliente;
	Opciones: OpcionModel[];
};

type OpcionModel = {
	id_opcion?: number;
	Ventanas: VentanaModel[];
};

type VentanaUI = {
	id?: number;
	cantidad: number;
	material: string;
	tipo: string;
	item: string;
	color: string;
	cristal: string;
	alto: number;
	ancho: number;
	precio_unitario: number;
	precio_total: number;
}

type VentanaModel = {
	id_ventana?: number;
	cantidad: number;
	item: string;
	id_tipo: number;
	id_color: number;
	id_cristal: number;
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
