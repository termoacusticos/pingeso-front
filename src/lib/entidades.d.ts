type Usuario = {
	id: number;
	email: string;
	password: string;
	rol_id: number;
};

type Cliente = {
	rut: string;
	nombre: string;
	direccion: string;
	email: string;
	telefono: string;
};

type Quincalleria = {
	id: number;
	descripcion: string;
	formula: string;
	precio: number;
};

type Perfil = {
	id: number;
	codigo: number;
	formula: string;
	cantidad: number;
	kg_ml: number;
};

type Cristal = {
    formula: string;
    cantidad: number;
    valor_m2: number;
};

type Presupuesto = {
    id: number;
    rut_usuario: number;
    fecha: Date;
    data_json: string;
    nombre_cliente: string;
    rut_cliente: string;
};

type Opcion = {
    id: number;
    id_presupuesto: number;
};

type Ventana = {
    id: number;
    descripcion: string;
    alto: number;
    ancho: number;
    minimo: number;
    maximo: number;
    id_opcion: number;
};
