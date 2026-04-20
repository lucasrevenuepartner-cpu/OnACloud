import { useNavigate } from 'react-router-dom';

const WA_NUMBER = '57TUNUMEROWSP';

export default function ProductCard({ producto }) {
  const navigate = useNavigate();
  const fmt = (n) => '$' + n.toLocaleString('es-CO');

  return (
    <div className="product-card" onClick={() => navigate(`/producto/${producto.id}`)}>
      <div className="product-img-wrap">
        <img src={producto.imagenes[0]} alt={producto.nombre} loading="lazy" />
        {producto.tag && <span className="product-badge">{producto.tag}</span>}
      </div>
      <h3 className="product-name">{producto.nombre}</h3>
      <p className="product-desc-short">{producto.entrega}</p>
      <div className="product-footer">
        <div className="product-price">
          <span>Precio</span>
          {fmt(producto.precio)}
        </div>
        <button
          className="product-quote-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `https://wa.me/${WA_NUMBER}?text=Hola!%20Me%20interesa%20${encodeURIComponent(producto.nombre)}`,
              '_blank'
            );
          }}
        >
          Cotizar
        </button>
      </div>
    </div>
  );
}
