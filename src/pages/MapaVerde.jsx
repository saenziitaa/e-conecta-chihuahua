import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import './mapaverde.css';

// =========================================================================
// DATOS DE CENTROS DE RECICLAJE EN CHIHUAHUA
// =========================================================================
const PUNTOS_INICIALES_CHIHUAHUA = [
  {
    id: "inst-down",
    nombre: "Centro de Acopio Instituto Down de Chihuahua",
    categoria: "especializado",
    tipoEtiqueta: "Acopio Social",
    estado: "Abierto",
    direccion: "Av. Mirador #4307, Campestre I Etapa",
    telefono: "614 413 4050",
    horario: "Lun - Vie 8:00 a 16:00",
    lat: 28.6425,
    lng: -106.0968,
    materiales: ["PET", "Cartón", "Papel", "Vidrio entero", "Aluminio"],
    descripcion: "Recibe PET, cartón, papel, vidrio (sin espejos) y aluminio. Los ingresos apoyan terapias para personas con síndrome de Down. Llevar separado y sin tapa.",
    reportesLleno: 0
  },
  {
    id: "silice-vidrio",
    nombre: "SÍLICE Recicladora de Vidrio",
    categoria: "especializado",
    tipoEtiqueta: "Especializado Vidrio",
    estado: "Cerrado",
    direccion: "Francisco Oro 15503, Valles de Chihuahua",
    telefono: "+52 614 188 2171",
    horario: "Lun - Vie 9:00 a 17:00",
    lat: 28.5912,
    lng: -106.0285,
    materiales: ["Vidrio alimenticio", "Latas", "Botellas plásticas"],
    descripcion: "Especializada en vidrio de grado alimenticio (botellas y frascos), latas y plástico. No recibe espejos, cristales de auto, focos ni cerámica.",
    reportesLleno: 0
  },
  {
    id: "tfu-residuo",
    nombre: "TFU Residuo Cero",
    categoria: "especializado",
    tipoEtiqueta: "Papel y Archivo",
    estado: "Abierto",
    direccion: "Zona Industrial / Chihuahua, Chih.",
    telefono: "+52 614 142 0797",
    horario: "Lun - Vie 8:30 a 17:30",
    lat: 28.6685,
    lng: -106.0912,
    materiales: ["Papel", "Archivo muerto", "Libros", "Revistas"],
    descripcion: "Recolección, destrucción segura y reciclado de papel, archivo muerto, libros, periódicos y revistas.",
    reportesLleno: 0
  },
  {
    id: "muni-rejon",
    nombre: "Estación Municipal - Presa El Rejón",
    categoria: "municipal",
    tipoEtiqueta: "Punto Municipal",
    estado: "Abierto",
    direccion: "Parque Metropolitano Presa El Rejón",
    telefono: "072 Atención Ciudadana",
    horario: "24 horas (Contenedores)",
    lat: 28.6228,
    lng: -106.1355,
    materiales: ["Plásticos", "Papel/Cartón", "Metal"],
    descripcion: "Punto de recolección municipal con contenedores clasificados por tipo de residuo.",
    reportesLleno: 1
  },
  {
    id: "muni-distrito1",
    nombre: "Estación Municipal - Distrito 1",
    categoria: "municipal",
    tipoEtiqueta: "Punto Municipal",
    estado: "Abierto",
    direccion: "Periférico de la Juventud / Distrito 1",
    telefono: "072 Atención Ciudadana",
    horario: "24 horas (Contenedores)",
    lat: 28.6602,
    lng: -106.1268,
    materiales: ["Plásticos", "Papel/Cartón", "Metal", "Pilas"],
    descripcion: "Estación ecológica municipal con contenedores separados y acopio de pilas domésticas.",
    reportesLleno: 0
  },
  {
    id: "muni-deportiva",
    nombre: "Estación Municipal - Ciudad Deportiva",
    categoria: "municipal",
    tipoEtiqueta: "Punto Municipal",
    estado: "Abierto",
    direccion: "Av. Tecnológico y División del Norte",
    telefono: "072 Atención Ciudadana",
    horario: "24 horas (Contenedores)",
    lat: 28.6548,
    lng: -106.0852,
    materiales: ["Plásticos", "Papel/Cartón", "Aluminio"],
    descripcion: "Contenedores municipales frente al DIF Estatal / Ciudad Deportiva.",
    reportesLleno: 0
  },
  {
    id: "muni-uach2",
    nombre: "Estación Municipal - UACH Campus II",
    categoria: "municipal",
    tipoEtiqueta: "Punto Municipal",
    estado: "Abierto",
    direccion: "Circuito Universitario, Campus II",
    telefono: "072 Atención Ciudadana",
    horario: "24 horas (Contenedores)",
    lat: 28.7052,
    lng: -106.1384,
    materiales: ["Plásticos", "Papel/Cartón", "Metal", "Pilas"],
    descripcion: "Punto universitario de reciclaje y acopio de baterías portátiles.",
    reportesLleno: 0
  },
  {
    id: "muni-palomar",
    nombre: "Estación Municipal - Parque El Palomar",
    categoria: "municipal",
    tipoEtiqueta: "Punto Municipal",
    estado: "Abierto",
    direccion: "Av. Ocampo y Teófilo Borunda, Centro",
    telefono: "072 Atención Ciudadana",
    horario: "24 horas (Contenedores)",
    lat: 28.6341,
    lng: -106.0815,
    materiales: ["Plásticos", "Papel/Cartón", "Metal"],
    descripcion: "Punto céntrico municipal para reciclables limpios.",
    reportesLleno: 0
  },
  {
    id: "metales-reciclados",
    nombre: "Metales Reciclados",
    categoria: "metales",
    tipoEtiqueta: "Compra de Metales",
    estado: "Cerrado",
    direccion: "Vialidad Ch-P 802, Desarrollo Urbano",
    telefono: "614 415 0000",
    horario: "Lun–Vie 9:30–17:00, Sáb 9:30–14:00",
    lat: 28.6152,
    lng: -106.0681,
    materiales: ["Cobre", "Aluminio", "Fierro", "Chatarra"],
    descripcion: "Centro de compra y reciclaje de metales ferrosos y no ferrosos.",
    reportesLleno: 0
  },
  {
    id: "comercial-recicladora",
    nombre: "Comercial Recicladora",
    categoria: "metales",
    tipoEtiqueta: "Compra de Metales",
    estado: "Abierto",
    direccion: "Av. de la Junta 510, Col. Popular",
    telefono: "614 416 2210",
    horario: "Lun–Vie 8:00–18:00, Sáb 8:00–13:00",
    lat: 28.6458,
    lng: -106.0695,
    materiales: ["Metales", "Cartón", "Plástico industrial"],
    descripcion: "Compra de materiales reciclables al público y negocios.",
    reportesLleno: 0
  },
  {
    id: "kalisch-esmeralda",
    nombre: "Kalisch Recycling (Suc. Esmeralda)",
    categoria: "metales",
    tipoEtiqueta: "Recicladora Metales",
    estado: "Abierto",
    direccion: "Vialidad Ch-P 7603, Col. Mármol",
    telefono: "+52 614 429 1620",
    horario: "Lun–Vie 8:00–17:30",
    lat: 28.5985,
    lng: -106.0452,
    materiales: ["Acero", "Aluminio", "Cobre", "Baterías de auto"],
    descripcion: "Reciclaje de metales y acumuladores. Se recomienda confirmar horarios por teléfono.",
    reportesLleno: 0
  },
  {
    id: "resesa-industrial",
    nombre: "RESESA - Manejo de Residuos Industriales",
    categoria: "industrial",
    tipoEtiqueta: "Residuos Especiales",
    estado: "Abierto",
    direccion: "Calle 11 No. 8003, Cerro Coronel II / Aeropuerto",
    telefono: "+52 614 452 2000",
    horario: "Lun–Vie 8:00–17:00",
    lat: 28.6285,
    lng: -106.0124,
    materiales: ["Residuos industriales", "Baterías", "Electrónicos"],
    descripcion: "Manejo integral y certificado de residuos industriales y peligrosos.",
    reportesLleno: 0
  },
  {
    id: "recilogic-planta",
    nombre: "Recilogic Planta Chihuahua",
    categoria: "industrial",
    tipoEtiqueta: "Planta Reciclaje",
    estado: "Cerrado",
    direccion: "C. 75a No. 9405, Zona Aeropuerto",
    telefono: "+52 614 412 1975",
    horario: "Lun–Vie 8:00–17:00",
    lat: 28.6510,
    lng: -105.9985,
    materiales: ["Electrónicos", "Plásticos", "Residuos empresariales"],
    descripcion: "Planta de valorización y reciclaje técnico en Chihuahua.",
    reportesLleno: 0
  },
  {
    id: "alerta-chuviscar",
    nombre: "Alerta Vecinal: Acumulación de Escombro y Pilas",
    categoria: "alerta",
    tipoEtiqueta: "Alerta Ambiental",
    estado: "Reporte Activo",
    direccion: "Cauce Río Chuvíscar (Altura Av. Mirador)",
    telefono: "Reporte Ciudadano",
    horario: "Reportado hoy",
    lat: 28.6380,
    lng: -106.0910,
    materiales: ["Reporte de contaminación", "Requiere limpieza"],
    descripcion: "Vecinos reportan llantas y bolsas con baterías tiradas cerca del cauce. Se solicita brigada de limpieza.",
    reportesLleno: 3
  }
];

// Distancia y tiempos estimados desde el centro de Chihuahua
function calcularTiemposTraslado(latDestino, lngDestino) {
  const latOrigen = 28.6353; // Centro / Plaza de Armas Chihuahua
  const lngOrigen = -106.0889;
  const R = 6371;
  const dLat = ((latDestino - latOrigen) * Math.PI) / 180;
  const dLng = ((lngDestino - lngOrigen) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latOrigen * Math.PI) / 180) *
      Math.cos((latDestino * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanciaKm = Math.max(0.8, R * c * 1.25); // Factor urbano de calles

  return {
    distancia: `${distanciaKm.toFixed(1)} km`,
    carro: `${Math.max(4, Math.round((distanciaKm / 35) * 60))} min`,
    camion: `${Math.max(10, Math.round((distanciaKm / 18) * 60 + 6))} min`,
    bici: `${Math.max(6, Math.round((distanciaKm / 15) * 60))} min`,
    caminando: `${Math.max(12, Math.round((distanciaKm / 4.8) * 60))} min`
  };
}

// =========================================================================
// MAPA LEAFLET CON CÍRCULOS INTERACTIVOS
// =========================================================================
function MapaLeafletChihuahua({ puntos, puntoSeleccionado, onSeleccionarPunto }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current).setView([28.6353, -106.0889], 12);

    // Capa pública de ArcGIS World Street Map (calles y colonias de Chihuahua sin bloqueo 403)
    const streetLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Chihuahua, Chih.",
        maxZoom: 19
      }
    );

    streetLayer.on("tileerror", () => {
      // Respaldo limpio en tono verde grisáceo si falla algún cuadro
      if (mapContainerRef.current) {
        mapContainerRef.current.style.backgroundColor = "#E8F0EC";
      }
    });

    streetLayer.addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const layerGroup = markersLayerRef.current;
    layerGroup.clearLayers();

    puntos.forEach((punto) => {
      let colorCirculo = "#2E7D32";
      if (punto.categoria === "municipal") colorCirculo = "#4CAF50";
      if (punto.categoria === "metales" || punto.categoria === "industrial") colorCirculo = "#4A635D";
      if (punto.categoria === "alerta") colorCirculo = "#DC2626";

      const iconoCirculo = L.divIcon({
        className: "custom-div-icon",
        html: `<div class="eco-circle-marker" style="width: 22px; height: 22px; background-color: ${colorCirculo};"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([punto.lat, punto.lng], { icon: iconoCirculo });
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 180px;">
          <strong style="color: ${colorCirculo}; font-size: 13px;">${punto.nombre}</strong>
          <p style="margin: 4px 0; font-size: 11px; color: #475569;">${punto.direccion}</p>
          <span style="display:inline-block; background:#E8F0EC; color:#2E7D32; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px;">
            ${punto.tipoEtiqueta}
          </span>
        </div>
      `);

      marker.on("click", () => {
        onSeleccionarPunto(punto);
      });

      marker.addTo(layerGroup);
    });
  }, [puntos]);

  useEffect(() => {
    if (puntoSeleccionado && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([puntoSeleccionado.lat, puntoSeleccionado.lng], 14, {
        duration: 0.8
      });
    }
  }, [puntoSeleccionado]);

  return <div ref={mapContainerRef} className="leafletWrapper" />;
}

// =========================================================================
// MAPA VERDE COMPLETO (filtros, mapa, detalle, lista y reportes)
// =========================================================================
export default function MapaVerde() {
  const [puntos, setPuntos] = useState(PUNTOS_INICIALES_CHIHUAHUA);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [puntoSeleccionado, setPuntoSeleccionado] = useState(PUNTOS_INICIALES_CHIHUAHUA[0]);

  // Modal "Nuevo reporte / punto"
  const [modalReporteAbierto, setModalReporteAbierto] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('alerta');
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');

  const puntosFiltrados = puntos.filter((p) => {
    const coincideCat = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      p.nombre.toLowerCase().includes(texto) ||
      p.direccion.toLowerCase().includes(texto) ||
      p.materiales.some((m) => m.toLowerCase().includes(texto));
    return coincideCat && coincideTexto;
  });

  const tiemposSeleccionado = puntoSeleccionado
    ? calcularTiemposTraslado(puntoSeleccionado.lat, puntoSeleccionado.lng)
    : null;

  const handleAgregarPunto = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevaDireccion.trim()) return;

    const latOffset = (Math.random() - 0.5) * 0.04;
    const lngOffset = (Math.random() - 0.5) * 0.04;

    const nuevoPunto = {
      id: `custom-${Date.now()}`,
      nombre: nuevoNombre.trim(),
      categoria: nuevaCategoria,
      tipoEtiqueta: nuevaCategoria === 'alerta' ? 'Alerta Ambiental' : 'Nuevo Punto Verde',
      estado: nuevaCategoria === 'alerta' ? 'Reporte Activo' : 'Abierto',
      direccion: nuevaDireccion.trim(),
      telefono: 'Reportado por comunidad',
      horario: 'Recién agregado',
      lat: 28.6353 + latOffset,
      lng: -106.0889 + lngOffset,
      materiales: nuevaCategoria === 'alerta' ? ['Accidente Ambiental', 'Atención requerida'] : ['PET', 'Pilas', 'Cartón'],
      descripcion: nuevaDesc.trim() || 'Punto reportado por un ciudadano en E-Conecta Chihuahua.',
      reportesLleno: 0,
    };

    setPuntos((prev) => [nuevoPunto, ...prev]);
    setPuntoSeleccionado(nuevoPunto);
    setNuevoNombre('');
    setNuevaDireccion('');
    setNuevaDesc('');
    setModalReporteAbierto(false);
  };

  const handleReportarLleno = (idPunto) => {
    setPuntos((prev) => prev.map((p) => (p.id === idPunto ? { ...p, reportesLleno: p.reportesLleno + 1 } : p)));
    if (puntoSeleccionado && puntoSeleccionado.id === idPunto) {
      setPuntoSeleccionado((prev) => ({ ...prev, reportesLleno: prev.reportesLleno + 1 }));
    }
  };

  return (
    <div className="mv">
      <section className="animateFadeUp">
        {/* Barra superior de filtros + botón reporte */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", marginBottom: "0.65rem" }}>
          <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--green-primary)" }}>
            🗺️ Mapa Verde de Chihuahua
          </h1>
          <button className="btnPrimary" onClick={() => setModalReporteAbierto(true)}>
            + Reportar Punto o Alerta
          </button>
        </div>

        <div className="filterBar">
          <button
            className={`filterChip ${filtroCategoria === "todos" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("todos")}
          >
            Todos ({puntos.length})
          </button>
          <button
            className={`filterChip ${filtroCategoria === "especializado" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("especializado")}
          >
            <span className="dotLegend" style={{ backgroundColor: "#2E7D32" }}></span>
            Centros Especializados
          </button>
          <button
            className={`filterChip ${filtroCategoria === "municipal" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("municipal")}
          >
            <span className="dotLegend" style={{ backgroundColor: "#4CAF50" }}></span>
            Estaciones Municipales
          </button>
          <button
            className={`filterChip ${filtroCategoria === "metales" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("metales")}
          >
            <span className="dotLegend" style={{ backgroundColor: "#4A635D" }}></span>
            Metales y Recicladoras
          </button>
          <button
            className={`filterChip ${filtroCategoria === "industrial" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("industrial")}
          >
            <span className="dotLegend" style={{ backgroundColor: "#4A635D" }}></span>
            Industriales
          </button>
          <button
            className={`filterChip ${filtroCategoria === "alerta" ? "filterChipActive" : ""}`}
            onClick={() => setFiltroCategoria("alerta")}
          >
            <span className="dotLegend" style={{ backgroundColor: "#DC2626" }}></span>
            Alertas Ambientales
          </button>
        </div>

        {/* 1. PRIMERO EL MAPA VERDE INTERACTIVO */}
        <div className="mapCard">
          <MapaLeafletChihuahua
            puntos={puntosFiltrados}
            puntoSeleccionado={puntoSeleccionado}
            onSeleccionarPunto={setPuntoSeleccionado}
          />
          <div className="mapLegendOverlay">
            <div className="legendGroup">
              <span className="legendItem">
                <span className="dotLegend" style={{ backgroundColor: "#2E7D32" }}></span>
                Especializado
              </span>
              <span className="legendItem">
                <span className="dotLegend" style={{ backgroundColor: "#4CAF50" }}></span>
                Municipal / Pilas
              </span>
              <span className="legendItem">
                <span className="dotLegend" style={{ backgroundColor: "#4A635D" }}></span>
                Metales / Industrial
              </span>
              <span className="legendItem">
                <span className="dotLegend" style={{ backgroundColor: "#DC2626" }}></span>
                Alerta
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              Toca cualquier círculo verde para ver tiempos de ruta
            </span>
          </div>
        </div>

        {/* 2. ABAJO DEL MAPA: DETALLE CON TIEMPOS TIPO GOOGLE MAPS */}
        {puntoSeleccionado && tiemposSeleccionado && (
          <div className="detailBox">
            <div className="placeHeader">
              <div>
                <span className="odsPill" style={{ display: "inline-block", marginBottom: "0.3rem" }}>
                  Punto Seleccionado · A {tiemposSeleccionado.distancia} del Centro CUU
                </span>
                <h2 className="placeTitle" style={{ fontSize: "1.12rem" }}>
                  {puntoSeleccionado.nombre}
                </h2>
              </div>
              <span
                className={`statusBadge ${
                  puntoSeleccionado.categoria === "alerta"
                    ? "statusAlert"
                    : puntoSeleccionado.estado === "Abierto"
                    ? "statusOpen"
                    : "statusClosed"
                }`}
              >
                {puntoSeleccionado.estado}
              </span>
            </div>

            <p className="placeMeta">📍 {puntoSeleccionado.direccion}</p>
            <p className="placeMeta">🕒 {puntoSeleccionado.horario} · 📞 {puntoSeleccionado.telefono}</p>
            <p style={{ fontSize: "0.86rem", marginBottom: "0.6rem" }}>
              {puntoSeleccionado.descripcion}
            </p>

            {/* Tiempos estimados tipo Google Maps */}
            <div className="travelModesGrid">
              <div className="travelBadge">
                <span className="travelIcon">🚗</span>
                <span className="travelTime">{tiemposSeleccionado.carro}</span>
                <span className="travelLabel">En carro</span>
              </div>
              <div className="travelBadge">
                <span className="travelIcon">🚌</span>
                <span className="travelTime">{tiemposSeleccionado.camion}</span>
                <span className="travelLabel">En camión</span>
              </div>
              <div className="travelBadge">
                <span className="travelIcon">🚲</span>
                <span className="travelTime">{tiemposSeleccionado.bici}</span>
                <span className="travelLabel">En bicicleta</span>
              </div>
              <div className="travelBadge">
                <span className="travelIcon">🚶</span>
                <span className="travelTime">{tiemposSeleccionado.caminando}</span>
                <span className="travelLabel">Caminando</span>
              </div>
            </div>

            <div className="tagsRow" style={{ marginBottom: "0.85rem" }}>
              {puntoSeleccionado.materiales.map((mat, idx) => (
                <span key={idx} className="materialTag">{mat}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${puntoSeleccionado.lat},${puntoSeleccionado.lng}`}
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
                style={{ textDecoration: "none", fontSize: "0.84rem" }}
              >
                🧭 Cómo llegar en Google Maps
              </a>
              <button
                className="btnSecondary"
                style={{ fontSize: "0.84rem" }}
                onClick={() => handleReportarLleno(puntoSeleccionado.id)}
              >
                ⚠️ Reportar contenedor lleno ({puntoSeleccionado.reportesLleno})
              </button>
            </div>
          </div>
        )}

        {/* 3. ABAJO: BUSCADOR Y LISTA DE CENTROS DE RECICLAJE */}
        <div>
          <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
            Centros de Reciclaje y Puntos de Acopio ({puntosFiltrados.length})
          </h3>
          <input
            type="text"
            className="searchInput"
            placeholder="Buscar centro por nombre, colonia, vidrio, pilas, PET..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {puntosFiltrados.length > 0 ? (
            <div className="placesGrid">
              {puntosFiltrados.map((punto) => {
                const t = calcularTiemposTraslado(punto.lat, punto.lng);
                return (
                  <article
                    key={punto.id}
                    className={`placeCard ${
                      puntoSeleccionado?.id === punto.id ? "placeCardSelected" : ""
                    }`}
                    onClick={() => {
                      setPuntoSeleccionado(punto);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                  >
                    <div>
                      <div className="placeHeader">
                        <h4 className="placeTitle">{punto.nombre}</h4>
                        <span
                          className={`statusBadge ${
                            punto.categoria === "alerta"
                              ? "statusAlert"
                              : punto.estado === "Abierto"
                              ? "statusOpen"
                              : "statusClosed"
                          }`}
                        >
                          {punto.estado}
                        </span>
                      </div>
                      <p className="placeMeta">{punto.direccion}</p>
                    </div>
                    <div>
                      <div className="tagsRow" style={{ marginBottom: "0.5rem" }}>
                        {punto.materiales.slice(0, 3).map((m, i) => (
                          <span key={i} className="materialTag">{m}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--green-primary)", fontWeight: 700 }}>
                        🚗 {t.carro} · 🚌 {t.camion} · 🚲 {t.bici}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="card">
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                No se encontraron puntos con ese filtro. Prueba con otro término o agrega un nuevo reporte.
              </p>
            </div>
          )}
        </div>
      </section>

      {modalReporteAbierto && (
        <div className="modalBackdrop" onClick={() => setModalReporteAbierto(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.15rem", color: "var(--green-primary)", marginBottom: "0.75rem" }}>
              + Agregar Punto Verde o Reporte Ambiental
            </h3>
            <form onSubmit={handleAgregarPunto}>
              <div className="formGroup">
                <label className="formLabel">Tipo de registro</label>
                <select
                  className="formControl"
                  value={nuevaCategoria}
                  onChange={(e) => setNuevaCategoria(e.target.value)}
                >
                  <option value="alerta">🚨 Accidente / Contaminación Ambiental</option>
                  <option value="municipal">🟢 Nuevo Punto de Reciclaje / Pilas</option>
                  <option value="especializado">♻️ Centro de Acopio Comunitario</option>
                </select>
              </div>
              <div className="formGroup">
                <label className="formLabel">Título del lugar o incidente</label>
                <input
                  type="text"
                  className="formControl"
                  placeholder="Ej. Contenedor de pilas Plaza Sendero / Quema de basura"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label className="formLabel">Ubicación / Colonia en Chihuahua</label>
                <input
                  type="text"
                  className="formControl"
                  placeholder="Ej. Col. San Felipe, Calle Trasviña y Retes"
                  value={nuevaDireccion}
                  onChange={(e) => setNuevaDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label className="formLabel">Descripción y materiales</label>
                <textarea
                  className="formControl"
                  rows="3"
                  placeholder="Describe qué se recibe o qué está pasando en el lugar..."
                  value={nuevaDesc}
                  onChange={(e) => setNuevaDesc(e.target.value)}
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" className="btnSecondary" onClick={() => setModalReporteAbierto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btnPrimary">
                  Publicar en el Mapa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}