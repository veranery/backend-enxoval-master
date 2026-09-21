// Categorias da lista, na ordem em que devem aparecer na tela.
export const CATEGORIES = [
	'TODAS',
	'ROUPINHAS',
	'ENXOVAL',
	'HIGIENE',
	'ACESSÓRIO',
	'QUARTO',
	'PARA MÃE',
	'MALA DA MATERNIDADE',
];

// Cor de destaque de cada categoria (usada nos chips de filtro e na barrinha
// lateral colorida de cada item). Para trocar uma cor, é só editar o valor
// hexadecimal aqui — a mudança já reflete em toda a lista.
export const CATEGORY_COLORS = {
	ROUPINHAS: '#FF6B6B', // vermelho
	ENXOVAL: '#FFA500', // laranja
	HIGIENE: '#FFD93D', // amarelo
	ACESSÓRIO: '#6BCB77', // verde
	QUARTO: '#9D4EDD', // roxo
	'MALA DA MATERNIDADE': '#4D96FF', // azul
	'PARA MÃE': '#FF69B4', // rosa
};

export const getCategoryColor = (category) => CATEGORY_COLORS[category] || '#CCCCCC';
