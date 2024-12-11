import type { Material, Prisma, Tipo, Ventana, Color, Cristal, Cliente } from '@prisma/client';

type ClienteUI = {
	rut: string;
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
	precio: Number;
	fechaCreacion: string;
};
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

type VentanaModel = {
	id_ventana?: number;
	cantidad: number;
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
