import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProducto, salas, camas } from '../data';

const WA_NUMBER = '57TUNUMEROWSP';

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = getProducto(id);
  const [imgActiva, setImgActiva] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setImgActiva(0);
  }, [id]);

  if (!producto) return (
    <div style={{ paddingTop:'var(--nav-h)', textAlign:'center', padding:'10rem 2rem' }}>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem' }}>Producto no encontrado</h2>
      <br/>
      <Link to="/" className="btn-primary" style={{ display:'inline-flex', marginTop:'1rem' }}>← Volver al inicio</Link>
    </div>
  );

  const fmt = (n) => '$' + n.toLocaleString('es-CO');
  const esCama = producto.categoria === 'cama';
  const relacionados = (esCama ? camas : salas).filter(p => p.id !== producto.id).slice(0, 3);
  const coleccionPath = esCama ? '/camas' : '/salas';
  const coleccionLabel = esCama ? 'Camas & Alcobas' : 'Salas & Sofás';

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>

      {/* BREADCRUMB */}
      <div style={{ padding:'1.2rem 3rem', borderBottom:'1px solid var(--warm)', display:'flex', gap:'.6rem', alignItems:'center', fontSize:'.75rem', color:'var(--clay)' }}>
        <Link to="/" style={{ color:'var(--clay)' }}>Inicio</Link>
        <span>›</span>
        <Link to={coleccionPath} style={{ color:'var(--clay)' }}>{coleccionLabel}</Link>
        <span>›</span>
        <span style={{ color:'var(--charcoal)', fontWeight:500 }}>{producto.nombre}</span>
      </div>

      {/* DETALLE PRINCIPAL */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', padding:'4rem 5rem', alignItems:'start' }}>

        {/* GALERÍA IZQUIERDA */}
        <div>
          {/* IMAGEN PRINCIPAL */}
          <div style={{ position:'relative', overflow:'hidden', borderRadius:3, marginBottom:'1rem', aspectRatio:'4/3', background:'var(--warm)' }}>
            {producto.tag && (
              <span style={{ position:'absolute', top:'1rem', left:'1rem', background:'var(--blue)', color:'var(--white)', fontSize:'.65rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', padding:'.3rem .8rem', borderRadius:2, zIndex:1 }}>
                {producto.tag}
              </span>
            )}
            <img
              src={producto.imagenes[imgActiva]}
              alt={producto.nombre}
              style={{ width:'100%', height:'100%', objectFit:'cover', transition:'opacity .3s' }}
            />
          </div>
          {/* THUMBNAILS */}
          <div style={{ display:'flex', gap:'.8rem' }}>
            {producto.imagenes.map((img, i) => (
              <div
                key={i}
                onClick={() => setImgActiva(i)}
                style={{
                  flex:1, aspectRatio:'4/3', overflow:'hidden', borderRadius:2, cursor:'pointer',
                  border: imgActiva === i ? '2px solid var(--blue-dark)' : '2px solid transparent',
                  transition:'border-color .2s', background:'var(--warm)'
                }}
              >
                <img src={img} alt={`Vista ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* INFO DERECHA */}
        <div style={{ position:'sticky', top:'calc(var(--nav-h) + 2rem)' }}>
          <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'1rem' }}>
            {coleccionLabel}
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:300, lineHeight:1.1, marginBottom:'1.5rem' }}>
            {producto.nombre}
          </h1>

          {/* PRECIO Y ENTREGA */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', padding:'1.5rem', background:'var(--warm)', borderRadius:3 }}>
            <div>
              <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'.2rem' }}>Precio</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:400 }}>{fmt(producto.precio)}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'.2rem' }}>Entrega</div>
              <div style={{ fontSize:'.9rem', fontWeight:500 }}>{producto.entrega}</div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <p style={{ fontSize:'.92rem', fontWeight:300, lineHeight:1.8, color:'#5A5047', marginBottom:'2rem' }}>
            {producto.descripcion}
          </p>

          {/* CARACTERÍSTICAS */}
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ fontSize:'.75rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--charcoal)', marginBottom:'1rem' }}>
              Incluye / Características
            </div>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'.6rem' }}>
              {producto.detalles.map((d, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:'.8rem', fontSize:'.85rem', fontWeight:300, color:'#5A5047' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', flexShrink:0, display:'inline-block' }}></span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* BOTONES CTA */}
          <div style={{ display:'flex', flexDirection:'column', gap:'.8rem' }}>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Me%20interesa%20${encodeURIComponent(producto.nombre)}%20%E2%80%94%20precio%20${encodeURIComponent(fmt(producto.precio))}`}
              target="_blank" rel="noreferrer"
              className="btn-wa"
              style={{ justifyContent:'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.875L0 24l6.272-1.516A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.671-.5-5.21-1.373l-.374-.222-3.724.9.936-3.613-.244-.387A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Cotizar este producto
            </a>
            <button
              onClick={() => navigate(coleccionPath)}
              className="btn-secondary"
              style={{ justifyContent:'center' }}
            >
              Ver más {esCama ? 'camas' : 'salas'} →
            </button>
          </div>

          {/* GARANTÍA */}
          <div style={{ marginTop:'1.5rem', padding:'1rem 1.2rem', border:'1px solid var(--warm)', borderRadius:2, display:'flex', gap:'.8rem', alignItems:'center' }}>
            <span style={{ fontSize:'1.2rem' }}>🛡️</span>
            <span style={{ fontSize:'.78rem', fontWeight:300, color:'var(--clay)' }}>
              Garantía 1 año en estructura · Fabricación artesanal colombiana · Entrega e instalación incluida
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCTOS RELACIONADOS */}
      <section style={{ padding:'4rem 3rem 6rem', background:'var(--warm)' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.8rem', fontSize:'.72rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'.8rem' }}>
            También te puede gustar
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:300 }}>
            Otros <em style={{ fontStyle:'italic', color:'var(--blue-dark)' }}>productos</em>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2rem' }}>
          {relacionados.map(p => {
            const fmt2 = (n) => '$' + n.toLocaleString('es-CO');
            return (
              <div key={p.id} className="product-card" onClick={() => navigate(`/producto/${p.id}`)}>
                <div className="product-img-wrap">
                  <img src={p.imagenes[0]} alt={p.nombre} loading="lazy" />
                  {p.tag && <span className="product-badge">{p.tag}</span>}
                </div>
                <h3 className="product-name">{p.nombre}</h3>
                <p className="product-desc-short">{p.entrega}</p>
                <div className="product-footer">
                  <div className="product-price">
                    <span>Precio</span>{fmt2(p.precio)}
                  </div>
                  <button
                    className="product-quote-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${WA_NUMBER}?text=Hola!%20Me%20interesa%20${encodeURIComponent(p.nombre)}`,'_blank');
                    }}
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
