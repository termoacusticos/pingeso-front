// place files you want to import through the `$lib` alias in this folder.
export const init = [
	'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);',
	'INSERT INTO usuarios (email, password) VALUES ("HOLA2", "13278621783862187");',
	'INSERT INTO usuarios (email, password) VALUES ("HOLA", "132411478621783862187");'
];
