import type {
	Material,
	Tipo,
	Color,
	Cristal,
	Cliente,
	Imagen,
	Perfil,
	Constantes
} from '@prisma/client';

type ConstantData = {
	imagenes: ImageGroup[];
	materiales: Material[];
	colores: Color[];
	cristales: Cristal[];
	tipos: Tipo[];
	perfiles: Perfil[];
	quincallerias: Quincalleria[];
	constantes_pdf: Constantes;
};

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
	id: number;
	nombreCliente: string;
	rut: string;
	valor_total: number;
	fechaCreacion: string;
};

type PresupuestoUI = {
	id_presupuesto?: number;
	id_usuario: number;
	fecha: string;
	cliente: ClienteUI;
	Opciones: OpcionUI[];
};

type PresupuestoModel = {
	id_presupuesto?: number;
	id_usuario: number;
	fecha: string;
	valor_despacho: number;
	valor_instalacion: number;
	texto_libre: string;
	Cliente: Cliente;
	nombre_cliente: string;
	Opciones: OpcionModel[];
	ganancia_global: number;
	estado: string;
};

type DatosAdicionales = {
	id_datos?: number;
	costo_despacho?: number;
	costo_instalacion?: number;
	ganancia_global?: number;
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
	color: string;
	cristal: string;
	item: string;
	alto?: number;
	ancho?: number;
	precio_unitario: number;
	precio_total: number;
	ganancia?: number;
};

type VentanaModel = {
	id_ventana?: number;
	cantidad: number;
	id_tipo: number;
	id_color: number;
	id_cristal: number;
	id_material: number;
	item: string;
	ganancia: number;
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

type ImageGroup = {
	img_group: number;
	imagenes: Imagen[];
	height: number;
};
