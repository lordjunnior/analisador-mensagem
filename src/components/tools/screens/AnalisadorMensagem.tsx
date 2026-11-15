import { useState } from 'react';
import { SuiteCover, Faq } from './SovereignKit';
import { SupportFuel } from '@/components/SupportFuel';
import { analisarMensagem } from '../lib/analisador-mensagem';

const botao = { minHeight: 48, flex: '1 1 180px', justifyContent: 'center' } as const;
export default function AnalisadorMensagem() {
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState<ReturnType<typeof analisarMensagem> | null>(null);
  function apagar() { setTexto(''); setErro(''); setResultado(null); }
  function analisar() {
    setErro(''); setResultado(null);
    try { setResultado(analisarMensagem(texto)); }
    catch (e) { setErro(e instanceof Error ? e.message : 'Não foi possível analisar. Confira o texto colado.'); }
  }
  return <div className="ss-root">
    <SuiteCover src="/paginas/analisador-mensagem.jpg" alt="Analisador de mensagens" kicker="Prevenção a fraudes" title="Analisador de" accent="mensagens" lead="Examine palavras e padrões comuns em mensagens suspeitas." badges={['Análise local', 'Sem envio do conteúdo', 'Sem abrir links']} />
    <div className="ss-wrap"><section className="ss-plate">
      <h2>Confira antes de agir</h2>
      <p className="ss-sub">O conteúdo é analisado neste navegador, sem upload ou consulta a um servidor. Não cole senhas nem códigos de confirmação. Esta análise não comprova autenticidade.</p>
      
      <form onSubmit={e => { e.preventDefault(); analisar(); }}>
        <label className="ss-label" htmlFor="analisador-mensagem-entrada">Mensagem para analisar</label>
        <textarea id="analisador-mensagem-entrada" className="ss-input" value={texto} maxLength={30000} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="Cole a mensagem recebida" onChange={e => { setTexto(e.target.value); setErro(''); setResultado(null); }} />
        <div className="ss-row"><button className="ss-btn" style={botao} type="submit" disabled={!texto.trim()}>Analisar</button><button className="ss-btn ghost" style={botao} type="button" onClick={apagar}>Apagar conteúdo</button></div>
      </form>
      <div aria-live="polite" aria-atomic="true">{erro && <p className="ss-warn" role="alert">{erro}</p>}{resultado && <section style={{ marginTop: 24, overflowWrap: 'anywhere' }} aria-label="Resultado da análise"><h3>{resultado.resumo}</h3>{resultado.sinais.map(s => <section key={s.nome}><h4>{s.nome}</h4><p style={{ overflowWrap: 'anywhere' }}>Trechos encontrados: {s.trechos.map(t => <mark key={t} style={{ marginRight: 8 }}>{t}</mark>)}</p><p>{s.orientacao}</p></section>)}<p className="ss-warn">{resultado.orientacao}</p></section>}</div>
    </section>
    <Faq items={[{ q: 'Posso confiar só neste resultado?', a: 'Não. Golpes podem passar por estas verificações. Confirme a situação pelo aplicativo ou endereço oficial, sem usar contatos enviados na mensagem.' }, { q: 'O que acontece ao apagar?', a: 'O texto e o resultado são removidos desta tela. A ferramenta não grava o conteúdo. Isso não apaga a área de transferência nem dados que você tenha salvo em outros aplicativos.' }]} />
    <SupportFuel /></div>
  </div>;
}
