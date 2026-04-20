import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { salas, camas } from '../data';
import ProductCard from '../components/ProductCard';

const WA_NUMBER = '57TUNUMEROWSP';
const MARQUEE = ['Fabricantes Directos','Diseño Colombiano','A Tu Medida','Entrega en Medellín','Sin Intermediarios','Telas Premium'];

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

export default function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const fadeRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const addRef = el => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  const destacadas = salas.slice(0, isMobile ? 2 : 4);
  const camasDestacadas = camas.slice(0, 2);

  const NAV_H = isMobile ? '70px' : 'var(--nav-h)';

  return (
    <div style={{ paddingTop: NAV_H, overflowX:'hidden', maxWidth:'100vw' }}>

      {/* HERO */}
      <section style={{
        minHeight: isMobile ? 'auto' : 'calc(100vh - var(--nav-h))',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      }}>
        <div ref={addRef} className="fade-in" style={{
          display:'flex', flexDirection:'column', justifyContent:'center',
          padding: isMobile ? '3rem 1.5rem' : '5rem 4rem 5rem 5rem',
          background:'var(--cream)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.6rem', fontSize:'.72rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'1.8rem' }}>
            <span style={{ display:'inline-block', width:28, height:1, background:'var(--clay)' }}></span>
            Fabricantes directos · Medellín
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize: isMobile ? '3rem' : 'clamp(3rem,5vw,5rem)', fontWeight:300, lineHeight:1.05, marginBottom:'1.4rem' }}>
            Muebles que<br/>
            <em style={{ fontStyle:'italic', color:'var(--blue-dark)' }}>transforman</em><br/>
            tu espacio
          </h1>
          <p style={{ fontSize:'.95rem', fontWeight:300, lineHeight:1.8, color:'#5A5047', maxWidth:400, marginBottom:'2.5rem' }}>
            Diseñamos y fabricamos cada pieza a tu medida. Sin intermediarios, sin sobrecostos.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/salas" className="btn-primary">
              Ver catálogo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20cotizar`} target="_blank" rel="noreferrer" className="btn-secondary">
              Cotizar ahora
            </a>
          </div>
          <div style={{ display:'flex', gap: isMobile ? '1.5rem' : '3rem', marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid var(--warm)', flexWrap:'wrap' }}>
            {[['10+','Años fabricando'],['500+','Clientes felices'],['100%','A tu medida']].map(([n,l]) => (
              <div key={l}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:400, display:'block' }}>{n}</span>
                <span style={{ fontSize:'.72rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--clay)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <div style={{ position:'relative', overflow:'hidden', background:'var(--warm)' }}>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80" alt="Sala" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', bottom:'2.5rem', left:'2.5rem', background:'rgba(247,244,239,.95)', backdropFilter:'blur(8px)', padding:'1.2rem 1.8rem', borderRadius:2, borderLeft:'3px solid var(--blue)' }}>
              <p style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'.2rem' }}>⭐ La más pedida</p>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', fontWeight:400 }}>Sala Nórbita — $4.400.000</h4>
            </div>
          </div>
        )}
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE,...MARQUEE].map((t,i) => (
            <span key={i}>{t}{i < MARQUEE.length*2-1 && <span className="dot"> ✦ </span>}</span>
          ))}
        </div>
      </div>

      {/* CATEGORÍAS */}
      <section>
        <div className="section-header">
          <div className="section-tag">Nuestro catálogo</div>
          <h2 className="section-title">Diseñado para <em>tu estilo</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'1.5rem', padding: isMobile ? '0 1.5rem 3rem' : '0 3rem 5rem' }}>
          {[
            { to:'/salas', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', label:'Colección 2026', name:'Salas & Sofás' },
            { to:'/camas', img:'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80', label:'Colección 2026', name:'Camas & Alcobas' },
          ].map(cat => (
            <Link key={cat.to} to={cat.to} style={{ position:'relative', overflow:'hidden', borderRadius:3, aspectRatio:'4/3', display:'block' }}>
              <img src={cat.img} alt={cat.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s' }}
                onMouseEnter={e => e.target.style.transform='scale(1.06)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(42,37,32,.7) 0%, rgba(42,37,32,.1) 60%, transparent 100%)' }}></div>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem' }}>
                <span style={{ display:'block', fontSize:'.7rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--blue)', marginBottom:'.5rem' }}>{cat.label}</span>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight:300, color:'white', marginBottom:'1rem' }}>{cat.name}</h3>
                <span style={{ color:'white', fontSize:'.75rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', borderBottom:'1px solid rgba(255,255,255,.4)', paddingBottom:2 }}>
                  Explorar colección →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <div style={{ background:'var(--charcoal)', display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)' }}>
        {[
          ['✦','Fabricantes directos','Sin galerías intermediarias. Ahorras hasta el 40%.'],
          ['◈','100% a tu medida','Elige tela, color y dimensiones para tu espacio.'],
          ['⬡','Entrega en Medellín','Entregamos e instalamos. Listo para disfrutar.'],
        ].map(([icon,title,desc],i) => (
          <div key={i} style={{ padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem', borderBottom: isMobile ? '1px solid rgba(255,255,255,.08)' : 'none', borderRight: !isMobile && i<2 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
            <div style={{ width:44, height:44, border:'1px solid var(--blue)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem', color:'var(--blue)', fontSize:'1.1rem' }}>{icon}</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', fontWeight:400, color:'white', marginBottom:'.7rem' }}>{title}</h3>
            <p style={{ fontSize:'.85rem', fontWeight:300, lineHeight:1.75, color:'rgba(255,255,255,.55)' }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* SALAS DESTACADAS */}
      <section style={{ padding: isMobile ? '2rem 1.5rem 3rem' : '2rem 3rem 5rem' }}>
        <div className="section-header">
          <div className="section-tag">Lo más pedido</div>
          <h2 className="section-title">Salas & <em>Sofás</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap:'1.5rem', marginBottom:'2rem' }}>
          {destacadas.map(p => <ProductCard key={p.id} producto={p} />)}
        </div>
        <div style={{ textAlign:'center' }}>
          <Link to="/salas" className="btn-secondary">Ver toda la colección →</Link>
        </div>
      </section>

      {/* CAMAS DESTACADAS */}
      <section style={{ padding: isMobile ? '2rem 1.5rem 3rem' : '0 3rem 5rem', background:'var(--warm)' }}>
        <div className="section-header">
          <div className="section-tag">Descanso premium</div>
          <h2 className="section-title">Camas & <em>Alcobas</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap:'1.5rem', maxWidth: isMobile ? '100%' : 800, margin:'0 auto 2rem' }}>
          {camasDestacadas.map(p => <ProductCard key={p.id} producto={p} />)}
        </div>
        <div style={{ textAlign:'center' }}>
          <Link to="/camas" className="btn-secondary">Ver toda la colección →</Link>
        </div>
      </section>

      {/* PROCESO */}
      <section style={{ background:'var(--cream)', padding: isMobile ? '3rem 1.5rem' : '6rem 5rem', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '6rem', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--clay)', marginBottom:'1rem' }}>Cómo trabajamos</div>
          <h2 className="section-title" style={{ textAlign:'left' }}>Tu mueble ideal<br/><em>en 4 pasos</em></h2>
          <div style={{ marginTop:'2rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
            {[
              ['01','Cotiza por WhatsApp','Cuéntanos qué necesitas — medidas, tela, color.'],
              ['02','Apruebas el diseño','Te enviamos referencia visual para confirmar.'],
              ['03','Fabricamos tu pieza','Nuestros artesanos fabrican en Itagüí.'],
              ['04','Entregamos e instalamos','Llegamos y nos aseguramos que quedes feliz.'],
            ].map(([n,t,d]) => (
              <div key={n} style={{ display:'flex', gap:'1.2rem' }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:300, color:'var(--sand)', lineHeight:1, minWidth:36 }}>{n}</span>
                <div>
                  <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', fontWeight:500, marginBottom:'.3rem' }}>{t}</h4>
                  <p style={{ fontSize:'.83rem', fontWeight:300, lineHeight:1.7, color:'#6A5A4E' }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80" alt="Fábrica" style={{ width:'100%', borderRadius:2, objectFit:'cover', aspectRatio:'16/9', gridColumn:'1/-1' }} />
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" alt="Sala" style={{ width:'100%', borderRadius:2, objectFit:'cover', aspectRatio:'1' }} />
            <img src="https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=400&q=80" alt="Cama" style={{ width:'100%', borderRadius:2, objectFit:'cover', aspectRatio:'1' }} />
          </div>
        )}
      </section>

      {/* TESTIMONIOS */}
      <section style={{ padding: isMobile ? '2rem 1.5rem 3rem' : '5rem 3rem', background:'var(--warm)' }}>
        <div className="section-header">
          <div className="section-tag">Clientes felices</div>
          <h2 className="section-title">Lo que dicen de <em>nosotros</em></h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:'1.5rem', marginTop:'1.5rem' }}>
          {[
            ['María Camila R.','Envigado','Quedé enamorada de mi sala. La calidad es increíble y el precio mucho mejor que en cualquier almacén.'],
            ['Andrés Felipe M.','Medellín','Pedí la cama King a medida. La entregaron perfecta, en el tiempo prometido y la instalación fue impecable.'],
            ['Valentina S.','Bello','El esquinero es exactamente lo que soñé. Elegí la tela, el color y las medidas. ¡Súper recomendados!'],
          ].map(([name,city,text]) => (
            <div key={name} style={{ background:'white', padding:'2rem', borderRadius:3, borderBottom:'3px solid var(--blue)' }}>
              <div style={{ color:'var(--blue)', marginBottom:'1rem', letterSpacing:2 }}>★★★★★</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', fontStyle:'italic', fontWeight:300, lineHeight:1.7, marginBottom:'1.5rem' }}>"{text}"</p>
              <div style={{ fontSize:'.82rem', fontWeight:600 }}>{name}</div>
              <div style={{ fontSize:'.75rem', color:'var(--clay)' }}>{city}, Antioquia</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ background:'var(--charcoal)', padding: isMobile ? '3rem 1.5rem' : '6rem 5rem', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', alignItems:'center', gap:'2rem' }}>
        <div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? '2rem' : 'clamp(2rem,4vw,3.2rem)', fontWeight:300, color:'white', lineHeight:1.15 }}>
            ¿Listo para <em style={{ color:'var(--blue)' }}>transformar</em><br/>tu espacio?
          </h2>
          <p style={{ fontSize:'.88rem', fontWeight:300, color:'rgba(255,255,255,.5)', marginTop:'.8rem' }}>
            Escríbenos y recibe tu cotización en menos de 30 minutos.
          </p>
        </div>
        <a href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20cotizar%20un%20mueble`} target="_blank" rel="noreferrer" className="btn-wa">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.875L0 24l6.272-1.516A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.671-.5-5.21-1.373l-.374-.222-3.724.9.936-3.613-.244-.387A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Cotizar por WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      <footer style={{ background:'#1A1613', padding: isMobile ? '2rem 1.5rem' : '2.5rem 5rem', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontWeight:300, color:'rgba(255,255,255,.6)' }}>
          <strong style={{ color:'white', fontWeight:400 }}>On a Cloud</strong> · Diseñando espacios, creando sueños
        </div>
        <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
          <Link to="/salas" style={{ fontSize:'.75rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.4)' }}>Salas</Link>
          <Link to="/camas" style={{ fontSize:'.75rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.4)' }}>Camas</Link>
          <a href="https://www.instagram.com/mueblesonacloud" target="_blank" rel="noreferrer" style={{ fontSize:'.75rem', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.4)' }}>Instagram</a>
        </div>
        <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.25)', width:'100%' }}>
          © 2026 On a Cloud · Itagüí, Antioquia, Colombia
        </div>
      </footer>
    </div>
  );
}
