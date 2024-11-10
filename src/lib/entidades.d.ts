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
