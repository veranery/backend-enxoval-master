// ============================================================================
// AVISOS E OFERTAS
// ============================================================================
// Este arquivo controla o quadro de avisos que aparece no topo da lista
// (ofertas em andamento, promoções, informações de valores, etc.).
//
// Para adicionar uma nova oferta com IMAGEM:
//   1. Salve a imagem (jpg, png ou webp) dentro da pasta "public/avisos/"
//      do projeto. Ex: public/avisos/oferta-berco.jpg
//   2. Adicione um novo item na lista NOTICES abaixo, apontando "image"
//      para "/avisos/oferta-berco.jpg" (sempre começando com "/avisos/").
//
// Para adicionar um aviso só de TEXTO (sem imagem, ex: informação de preço):
//   1. Adicione um novo item na lista NOTICES sem o campo "image".
//
// Campos de cada aviso:
//   image (opcional)  -> caminho do arquivo dentro de public/avisos/
//   title (opcional)  -> título curto em destaque
//   description       -> texto do aviso
//   link  (opcional)  -> URL para "Saiba mais" (catálogo, WhatsApp, etc.)
//   linkLabel         -> texto do botão do link (padrão: "Saiba mais")
//
// Para remover um aviso, basta apagar (ou comentar com // na frente de cada
// linha) o bloco { ... } correspondente.
// ============================================================================

export const NOTICES = [
	// Exemplo de oferta com imagem. Troque a imagem e o texto pelos seus:
	// {
	// 	image: '/avisos/oferta-berco.jpg',
	// 	title: 'Oferta da semana',
	// 	description: 'Berço que vira cama ou mini sofá com condições especiais.',
	// 	link: 'https://wa.me/55SEUNUMEROAQUI',
	// 	linkLabel: 'Falar no WhatsApp',
	// },

	// Exemplo de aviso só de texto, com informação de valores:
	// {
	// 	title: 'Valores',
	// 	description: 'Peças a partir de R$ 29,90. Consulte condições especiais para compras em kit.',
	// },
];
