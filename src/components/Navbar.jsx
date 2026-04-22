import { Link, useLocation } from 'react-router-dom';

const WA_NUMBER = '573246189514';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="On a Cloud" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/salas">Salas & Sofás</Link></li>
          <li><Link to="/camas">Camas & Alcobas</Link></li>
          <li><Link to="/#proceso">Proceso</Link></li>
          <li>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20cotizar%20un%20mueble`}
              className="nav-cta"
              target="_blank" rel="noreferrer"
            >
              Cotizar
            </a>
          </li>
        </ul>
      </nav>

      <a
        className="wa-float"
        href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20cotizar%20un%20mueble`}
        target="_blank" rel="noreferrer"
        title="Cotizar por WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.875L0 24l6.272-1.516A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.671-.5-5.21-1.373l-.374-.222-3.724.9.936-3.613-.244-.387A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </>
  );
}
