const regras: { nome: string; padrao: RegExp; orientacao: string }[] = [
  { nome: 'Urgência', padrao: /\b(?:urgente|imediatamente|agora|[uú]ltima chance|hoje|\d+ minutos)\b/giu, orientacao: 'Pare e confira por um canal que você já conhece, sem agir sob pressão.' },
  { nome: 'Prêmio ou vantagem', padrao: /(?:pr[eê]mio|sorteio|ganhou|contemplad[oa]|resgat[ea]|b[oô]nus)/giu, orientacao: 'Não pague taxa para receber um prêmio e confira a promoção no canal oficial.' },
  { nome: 'Ameaça de bloqueio', padrao: /(?:bloquead[oa]|bloqueio|suspens[aã]o|suspens[oa]|cancelamento)/giu, orientacao: 'Abra o aplicativo oficial para conferir se existe algum aviso.' },
  { nome: 'Encomenda ou taxa', padrao: /(?:encomenda|correios|alf[aâ]ndega|taxa de entrega|objeto retido)/giu, orientacao: 'Confira o rastreio digitando o endereço oficial da transportadora.' },
  { nome: 'Suposto suporte', padrao: /(?:suporte|central de atendimento|atendente|equipe de seguran[cç]a|acesso remoto)/giu, orientacao: 'Encerre o contato e procure o suporte pelo aplicativo oficial. Não instale acesso remoto.' },
  { nome: 'Código ou senha', padrao: /(?:senha|c[oó]digo|token|sms|autentica[cç][aã]o)/giu, orientacao: 'Não compartilhe senhas, códigos de confirmação ou tokens, mesmo com quem se apresenta como suporte.' },
  { nome: 'Pedido envolvendo Pix', padrao: /\bpix\b/giu, orientacao: 'Confirme o pedido por outro canal e confira nome e valor na tela do banco antes de pagar.' },
  { nome: 'Link na mensagem', padrao: /(?:https?:\/\/|www\.)[^\s<>]+|\b(?:[a-z0-9-]+\.)+(?:com(?:\.br)?|br|net|org|ly|xyz|top|click)(?:\/[^\s<>]*)?/giu, orientacao: 'Não abra o link recebido. Digite o endereço oficial ou use o aplicativo.' },
];
export function analisarMensagem(texto: string) {
  if (!texto.trim() || texto.length > 30000) throw new Error('Digite uma mensagem com até 30 mil caracteres.');
  const sinais = regras.flatMap(regra => {
    const trechos = Array.from(texto.matchAll(new RegExp(regra.padrao.source, regra.padrao.flags)), m => m[0]);
    return trechos.length ? [{ nome: regra.nome, trechos: [...new Set(trechos)].slice(0, 8), orientacao: regra.orientacao }] : [];
  });
  return { sinais, resumo: sinais.length ? `${sinais.length} tipos de sinal encontrados. Isso não prova que a mensagem é um golpe.` : 'Nenhum sinal encontrado. Isso não garante que a mensagem seja legítima.', orientacao: 'Confirme a história por um contato oficial obtido fora da mensagem. A análise é de palavras e padrões, não identifica o remetente.' };
}
