import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { salas, camas } from '../data';
import ProductCard from '../components/ProductCard';

export default function Coleccion({ tipo }) {
  const isSalas = tipo === 'salas';
  const productos = isSalas ? salas : camas;
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    window.scrollTo(0, 0);
    setFiltro('todos');
  }, [tipo]);

  const categorias = isSalas
    ? [['todos','Todos'],['sala','Salas'],['sofa','Sofás']]
    : [['todos','Todos'],['cama','Camas']];

  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>

      {/* HEADER */}
      <div style={{
        background: isSalas ? 'var(--warm)' : 'var(--charcoal)',
        padding:'5rem 5rem 4rem', position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', top:0, right:0, width:'40%', height:'100%', opacity:.08 }}>
          <img
            src={isSalas
              ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=60'
              : 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=600&q=60'}
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
          />
        </div>
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color: isSalas ? 'var(--clay)' : 'var(--blue)', marginBottom:'1rem' }}>
            Colección 2026
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:300, lineHeight:1.05, color: isSalas ? 'var(--charcoal)' : 'var(--white)', marginBottom:'1rem' }}>
            {isSalas
              ? <><span>Salas & </span><em style={{ fontStyle:'italic', color:'var(--blue-dark)' }}>Sofás</em></>
              : <><span>Camas & </span><em style={{ fontStyle:'italic', color:'var(--blue)' }}>Alcobas</em></>
            }
          </h1>
          <p style={{ fontSize:'.95rem', fontWeight:300, lineHeight:1.8, color: isSalas ? '#5A5047' : 'rgba(255,255,255,.65)', maxWidth:500 }}>
            {isSalas
              ? 'Cada sala fabricada a tu medida, con la tela que elijas. Entrega en 15 días hábiles en Medellín y área metropolitana.'
              : 'Camas tapizadas a tu medida. Elige el cabecero, la tela, el color y las dimensiones exactas para tu habitación.'
            }
          </p>
          <div style={{ marginTop:'2rem' }}>
            <Link to="/" style={{ fontSize:'.78rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color: isSalas ? 'var(--clay)' : 'rgba(255,255,255,.5)', borderBottom:'1px solid currentColor', paddingBottom:2 }}>
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div style={{ padding:'2rem 3rem 0', display:'flex', gap:'.8rem', flexWrap:'wrap', alignItems:'center' }}>
        {categorias.map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFiltro(val)}
            style={{
              padding:'.5rem 1.4rem', borderRadius:2,
              fontFamily:"'Jost',sans-serif", fontSize:'.75rem',
              fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase',
              cursor:'pointer', transition:'all .2s',
              background: filtro === val ? 'var(--charcoal)' : 'transparent',
              color: filtro === val ? 'var(--white)' : 'var(--clay)',
              border: filtro === val ? '1px solid var(--charcoal)' : '1px solid var(--sand)',
            }}
          >
            {label}
          </button>
        ))}
        <span style={{ marginLeft:'auto', fontSize:'.82rem', color:'var(--clay)', alignSelf:'center' }}>
          {filtrados.length} productos
        </span>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div style={{ padding:'2rem 3rem 6rem', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2rem' }}>
        {filtrados.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>

    </div>
  );
}
