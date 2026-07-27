// studio-valdeoso/src/components/IconPicker.tsx
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {
  faFacebook as faFacebookBrand,
  faInstagram as faInstagramBrand,
  faLinkedin as faLinkedinBrand,
  faTiktok as faTiktokBrand,
  faWhatsapp as faWhatsappBrand,
  faXTwitter,
  faYoutube as faYoutubeBrand,
} from '@fortawesome/free-brands-svg-icons'
import {
  // Contacto / UI general
  faAt,
  // Comercio
  faBagShopping,
  faBandage,
  faBarcode,
  // Bar / hostelería
  faBeer,
  faBell,
  faBone,
  faBookmark,
  faBowlFood,
  faBox,
  faBurger,
  faCalendarDays,
  faCar,
  faCat,
  faChartLine,
  faCircleInfo,
  faClock,
  faCocktail,
  faCoffee,
  faComment,
  faDog,
  faDroplet,
  // Fisioterapia / salud
  faDumbbell,
  faEnvelope,
  faEye,
  faFish,
  faFlag,
  faFlask,
  faGift,
  faGlobe,
  faHashtag,
  faHeartCircleCheck,
  faHeartPulse,
  faHorse,
  faHouse,
  faIceCream,
  faImage,
  faKitchenSet,
  faLink,
  faLocationDot,
  faMap,
  faMartiniGlass,
  faMicroscope,
  faMobile,
  faMugHot,
  faPaperPlane,
  faPaw,
  faPercent,
  faPersonRunning,
  faPersonWalking,
  faPhone,
  faPills,
  faPizzaSlice,
  faQrcode,
  faRadiation,
  faReceipt,
  faScissors,
  faSearch,
  faShare,
  faShieldHeart,
  faShop,
  faSliders,
  faSprayCanSparkles,
  faStar,
  faStethoscope,
  faSyringe,
  faTag,
  faThumbsUp,
  faTooth,
  faTrash,
  faTruck,
  faUser,
  faUserDoctor,
  faUserNurse,
  faUsers,
  faUtensils,
  faVial,
  faVideo,
  faVirus,
  faWeightScale,
  faWheelchair,
  faWind,
  faWineBottle,
  faWineGlass,
  faXRay,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useMemo, useState} from 'react'
import {set, unset} from 'sanity'

// ─── Catálogo ────────────────────────────────────────────────────────────────

export type IconEntry = {
  value: string
  label: string
  icon: IconDefinition
  tags: string[]
}

export const ICONS: IconEntry[] = [
  // Veterinaria
  {
    value: 'fa-paw',
    label: 'Mascota',
    icon: faPaw,
    tags: ['veterinaria', 'animal', 'mascota', 'huella'],
  },
  {value: 'fa-dog', label: 'Perro', icon: faDog, tags: ['veterinaria', 'animal', 'perro', 'can']},
  {value: 'fa-cat', label: 'Gato', icon: faCat, tags: ['veterinaria', 'animal', 'gato', 'felino']},
  {value: 'fa-fish', label: 'Pez', icon: faFish, tags: ['veterinaria', 'animal', 'pez', 'acuario']},
  {
    value: 'fa-horse',
    label: 'Caballo',
    icon: faHorse,
    tags: ['veterinaria', 'animal', 'caballo', 'equino'],
  },
  {
    value: 'fa-scissors',
    label: 'Peluquería',
    icon: faScissors,
    tags: ['veterinaria', 'peluquería', 'corte', 'grooming'],
  },
  {
    value: 'fa-house',
    label: 'Hotel / Residencia',
    icon: faHouse,
    tags: ['veterinaria', 'hotel', 'residencia', 'alojamiento'],
  },
  {
    value: 'fa-syringe',
    label: 'Vacuna',
    icon: faSyringe,
    tags: ['veterinaria', 'vacuna', 'inyección', 'inmunización'],
  },
  {
    value: 'fa-stethoscope',
    label: 'Consulta',
    icon: faStethoscope,
    tags: ['veterinaria', 'consulta', 'diagnóstico', 'médico'],
  },
  {
    value: 'fa-shield-heart',
    label: 'Seguro',
    icon: faShieldHeart,
    tags: ['veterinaria', 'seguro', 'protección', 'cobertura'],
  },
  {
    value: 'fa-bandage',
    label: 'Cura',
    icon: faBandage,
    tags: ['veterinaria', 'cura', 'herida', 'vendaje'],
  },
  {
    value: 'fa-microscope',
    label: 'Laboratorio',
    icon: faMicroscope,
    tags: ['veterinaria', 'laboratorio', 'análisis', 'microscopio'],
  },
  {
    value: 'fa-heart-pulse',
    label: 'Urgencias',
    icon: faHeartPulse,
    tags: ['veterinaria', 'urgencias', 'corazón', 'emergencia'],
  },
  {
    value: 'fa-tooth',
    label: 'Dental',
    icon: faTooth,
    tags: ['veterinaria', 'dental', 'diente', 'odontología'],
  },
  {
    value: 'fa-bone',
    label: 'Traumatología',
    icon: faBone,
    tags: ['veterinaria', 'traumatología', 'hueso', 'ortopedia'],
  },
  {
    value: 'fa-eye',
    label: 'Oftalmología',
    icon: faEye,
    tags: ['veterinaria', 'oftalmología', 'ojo', 'visión'],
  },
  {
    value: 'fa-weight-scale',
    label: 'Peso',
    icon: faWeightScale,
    tags: ['veterinaria', 'peso', 'báscula', 'control'],
  },
  {
    value: 'fa-x-ray',
    label: 'Radiología',
    icon: faXRay,
    tags: ['veterinaria', 'radiología', 'rayos x', 'diagnóstico'],
  },
  {
    value: 'fa-user-doctor',
    label: 'Veterinario',
    icon: faUserDoctor,
    tags: ['veterinaria', 'veterinario', 'médico', 'doctor'],
  },
  {
    value: 'fa-droplet',
    label: 'Análisis sangre',
    icon: faDroplet,
    tags: ['veterinaria', 'sangre', 'análisis', 'hematología'],
  },
  {
    value: 'fa-virus',
    label: 'Enfermedades',
    icon: faVirus,
    tags: ['veterinaria', 'virus', 'enfermedad', 'infección'],
  },
  {
    value: 'fa-radiation',
    label: 'Tratamiento',
    icon: faRadiation,
    tags: ['veterinaria', 'tratamiento', 'oncología', 'radioterapia'],
  },
  {
    value: 'fa-flask',
    label: 'Química',
    icon: faFlask,
    tags: ['veterinaria', 'química', 'laboratorio', 'prueba'],
  },
  {
    value: 'fa-wind',
    label: 'Respiratorio',
    icon: faWind,
    tags: ['veterinaria', 'respiratorio', 'pulmón', 'aire'],
  },
  {
    value: 'fa-bowl-food',
    label: 'Alimentación',
    icon: faBowlFood,
    tags: ['veterinaria', 'alimentación', 'nutrición', 'comida'],
  },

  // Bar / Hostelería
  {
    value: 'fa-utensils',
    label: 'Restaurante',
    icon: faUtensils,
    tags: ['hostelería', 'bar', 'restaurante', 'cubiertos'],
  },
  {
    value: 'fa-beer',
    label: 'Cerveza',
    icon: faBeer,
    tags: ['hostelería', 'bar', 'cerveza', 'bebida'],
  },
  {
    value: 'fa-wine-glass',
    label: 'Vino',
    icon: faWineGlass,
    tags: ['hostelería', 'bar', 'vino', 'copa'],
  },
  {
    value: 'fa-wine-bottle',
    label: 'Botella',
    icon: faWineBottle,
    tags: ['hostelería', 'bar', 'botella', 'vino'],
  },
  {
    value: 'fa-cocktail',
    label: 'Cóctel',
    icon: faCocktail,
    tags: ['hostelería', 'bar', 'cóctel', 'bebida'],
  },
  {
    value: 'fa-martini-glass',
    label: 'Martini',
    icon: faMartiniGlass,
    tags: ['hostelería', 'bar', 'martini', 'copa'],
  },
  {
    value: 'fa-coffee',
    label: 'Café',
    icon: faCoffee,
    tags: ['hostelería', 'bar', 'café', 'cafetería'],
  },
  {
    value: 'fa-mug-hot',
    label: 'Infusión',
    icon: faMugHot,
    tags: ['hostelería', 'bar', 'infusión', 'té', 'taza'],
  },
  {
    value: 'fa-pizza-slice',
    label: 'Pizza',
    icon: faPizzaSlice,
    tags: ['hostelería', 'restaurante', 'pizza', 'comida'],
  },
  {
    value: 'fa-burger',
    label: 'Hamburguesa',
    icon: faBurger,
    tags: ['hostelería', 'restaurante', 'hamburguesa', 'comida'],
  },
  {
    value: 'fa-ice-cream',
    label: 'Helado',
    icon: faIceCream,
    tags: ['hostelería', 'heladería', 'helado', 'postre'],
  },
  {
    value: 'fa-kitchen-set',
    label: 'Cocina',
    icon: faKitchenSet,
    tags: ['hostelería', 'cocina', 'chef', 'restaurante'],
  },

  // Fisioterapia / Salud
  {
    value: 'fa-dumbbell',
    label: 'Ejercicio',
    icon: faDumbbell,
    tags: ['fisio', 'salud', 'ejercicio', 'gym', 'fitness'],
  },
  {
    value: 'fa-person-running',
    label: 'Deporte',
    icon: faPersonRunning,
    tags: ['fisio', 'salud', 'deporte', 'correr', 'running'],
  },
  {
    value: 'fa-person-walking',
    label: 'Rehabilitación',
    icon: faPersonWalking,
    tags: ['fisio', 'salud', 'rehabilitación', 'andar'],
  },
  {
    value: 'fa-wheelchair',
    label: 'Accesibilidad',
    icon: faWheelchair,
    tags: ['fisio', 'salud', 'accesibilidad', 'silla de ruedas'],
  },
  {
    value: 'fa-heart-circle-check',
    label: 'Cardio',
    icon: faHeartCircleCheck,
    tags: ['fisio', 'salud', 'corazón', 'cardio', 'bienestar'],
  },
  {
    value: 'fa-pills',
    label: 'Medicación',
    icon: faPills,
    tags: ['fisio', 'salud', 'medicación', 'pastillas', 'farmacia'],
  },
  {
    value: 'fa-vial',
    label: 'Análisis',
    icon: faVial,
    tags: ['fisio', 'salud', 'análisis', 'prueba', 'laboratorio'],
  },
  {
    value: 'fa-user-nurse',
    label: 'Enfermería',
    icon: faUserNurse,
    tags: ['fisio', 'salud', 'enfermería', 'enfermero', 'cuidados'],
  },
  {
    value: 'fa-spray-can-sparkles',
    label: 'Terapia',
    icon: faSprayCanSparkles,
    tags: ['fisio', 'salud', 'terapia', 'tratamiento', 'bienestar'],
  },

  // Comercio / Tienda
  {
    value: 'fa-shop',
    label: 'Tienda',
    icon: faShop,
    tags: ['comercio', 'tienda', 'local', 'negocio'],
  },
  {
    value: 'fa-bag-shopping',
    label: 'Compras',
    icon: faBagShopping,
    tags: ['comercio', 'compras', 'bolsa', 'shopping'],
  },
  {
    value: 'fa-tag',
    label: 'Etiqueta',
    icon: faTag,
    tags: ['comercio', 'etiqueta', 'precio', 'oferta'],
  },
  {
    value: 'fa-percent',
    label: 'Descuento',
    icon: faPercent,
    tags: ['comercio', 'descuento', 'oferta', 'promoción'],
  },
  {
    value: 'fa-box',
    label: 'Producto',
    icon: faBox,
    tags: ['comercio', 'producto', 'caja', 'pedido'],
  },
  {
    value: 'fa-truck',
    label: 'Envío',
    icon: faTruck,
    tags: ['comercio', 'envío', 'entrega', 'logística'],
  },
  {
    value: 'fa-barcode',
    label: 'Código de barras',
    icon: faBarcode,
    tags: ['comercio', 'código', 'barras', 'escáner'],
  },
  {
    value: 'fa-receipt',
    label: 'Ticket',
    icon: faReceipt,
    tags: ['comercio', 'ticket', 'factura', 'recibo'],
  },
  {
    value: 'fa-gift',
    label: 'Regalo',
    icon: faGift,
    tags: ['comercio', 'regalo', 'presente', 'obsequio'],
  },
  {
    value: 'fa-star',
    label: 'Destacado',
    icon: faStar,
    tags: ['comercio', 'destacado', 'favorito', 'valoración'],
  },

  // Contacto / UI
  {
    value: 'fa-phone',
    label: 'Teléfono',
    icon: faPhone,
    tags: ['contacto', 'teléfono', 'llamada', 'ui'],
  },
  {
    value: 'fa-envelope',
    label: 'Email',
    icon: faEnvelope,
    tags: ['contacto', 'email', 'correo', 'mensaje', 'ui'],
  },
  {
    value: 'fa-location-dot',
    label: 'Ubicación',
    icon: faLocationDot,
    tags: ['contacto', 'ubicación', 'mapa', 'dirección', 'ui'],
  },
  {
    value: 'fa-clock',
    label: 'Horario',
    icon: faClock,
    tags: ['contacto', 'horario', 'tiempo', 'hora', 'ui'],
  },
  {
    value: 'fa-car',
    label: 'Transporte',
    icon: faCar,
    tags: ['contacto', 'transporte', 'coche', 'ui'],
  },
  {value: 'fa-globe', label: 'Web', icon: faGlobe, tags: ['contacto', 'web', 'internet', 'ui']},
  {
    value: 'fa-mobile',
    label: 'Móvil',
    icon: faMobile,
    tags: ['contacto', 'móvil', 'smartphone', 'ui'],
  },
  {value: 'fa-map', label: 'Mapa', icon: faMap, tags: ['contacto', 'mapa', 'localización', 'ui']},
  {value: 'fa-at', label: 'Arroba', icon: faAt, tags: ['contacto', 'arroba', 'email', 'ui']},
  {
    value: 'fa-paper-plane',
    label: 'Enviar',
    icon: faPaperPlane,
    tags: ['contacto', 'enviar', 'mensaje', 'ui'],
  },
  {
    value: 'fa-comment',
    label: 'Comentario',
    icon: faComment,
    tags: ['contacto', 'comentario', 'chat', 'ui'],
  },
  {
    value: 'fa-calendar-days',
    label: 'Calendario',
    icon: faCalendarDays,
    tags: ['contacto', 'calendario', 'cita', 'agenda', 'ui'],
  },
  {
    value: 'fa-bell',
    label: 'Notificación',
    icon: faBell,
    tags: ['contacto', 'notificación', 'alerta', 'ui'],
  },
  {
    value: 'fa-users',
    label: 'Equipo',
    icon: faUsers,
    tags: ['contacto', 'equipo', 'personas', 'grupo', 'ui'],
  },
  {
    value: 'fa-user',
    label: 'Persona',
    icon: faUser,
    tags: ['contacto', 'persona', 'usuario', 'ui'],
  },
  {
    value: 'fa-chart-line',
    label: 'Estadísticas',
    icon: faChartLine,
    tags: ['ui', 'estadísticas', 'gráfico', 'datos'],
  },
  {
    value: 'fa-bookmark',
    label: 'Guardar',
    icon: faBookmark,
    tags: ['ui', 'guardar', 'marcar', 'favorito'],
  },
  {
    value: 'fa-share',
    label: 'Compartir',
    icon: faShare,
    tags: ['ui', 'compartir', 'enviar', 'social'],
  },
  {
    value: 'fa-thumbs-up',
    label: 'Me gusta',
    icon: faThumbsUp,
    tags: ['ui', 'me gusta', 'aprobación', 'social'],
  },
  {value: 'fa-flag', label: 'Bandera', icon: faFlag, tags: ['ui', 'bandera', 'marcar', 'señal']},
  {
    value: 'fa-circle-info',
    label: 'Información',
    icon: faCircleInfo,
    tags: ['ui', 'información', 'ayuda', 'datos'],
  },
  {value: 'fa-link', label: 'Enlace', icon: faLink, tags: ['ui', 'enlace', 'url', 'link']},
  {value: 'fa-image', label: 'Imagen', icon: faImage, tags: ['ui', 'imagen', 'foto', 'galería']},
  {value: 'fa-video', label: 'Vídeo', icon: faVideo, tags: ['ui', 'vídeo', 'video', 'multimedia']},
  {value: 'fa-qrcode', label: 'QR', icon: faQrcode, tags: ['ui', 'qr', 'código', 'escanear']},
  {
    value: 'fa-hashtag',
    label: 'Hashtag',
    icon: faHashtag,
    tags: ['ui', 'hashtag', 'etiqueta', 'social'],
  },
  {
    value: 'fa-sliders',
    label: 'Filtros',
    icon: faSliders,
    tags: ['ui', 'filtros', 'ajustes', 'configuración'],
  },
  {
    value: 'fa-trash',
    label: 'Eliminar',
    icon: faTrash,
    tags: ['ui', 'eliminar', 'borrar', 'papelera'],
  },
  {value: 'fa-search', label: 'Buscar', icon: faSearch, tags: ['ui', 'buscar', 'búsqueda', 'lupa']},

  // Redes sociales (brands)
  {
    value: 'fa-instagram',
    label: 'Instagram',
    icon: faInstagramBrand,
    tags: ['redes', 'social', 'instagram', 'foto'],
  },
  {
    value: 'fa-facebook',
    label: 'Facebook',
    icon: faFacebookBrand,
    tags: ['redes', 'social', 'facebook', 'meta'],
  },
  {
    value: 'fa-x-twitter',
    label: 'X / Twitter',
    icon: faXTwitter,
    tags: ['redes', 'social', 'twitter', 'x'],
  },
  {
    value: 'fa-tiktok',
    label: 'TikTok',
    icon: faTiktokBrand,
    tags: ['redes', 'social', 'tiktok', 'vídeo'],
  },
  {
    value: 'fa-youtube',
    label: 'YouTube',
    icon: faYoutubeBrand,
    tags: ['redes', 'social', 'youtube', 'vídeo'],
  },
  {
    value: 'fa-whatsapp',
    label: 'WhatsApp',
    icon: faWhatsappBrand,
    tags: ['redes', 'social', 'whatsapp', 'mensaje', 'chat'],
  },
  {
    value: 'fa-linkedin',
    label: 'LinkedIn',
    icon: faLinkedinBrand,
    tags: ['redes', 'social', 'linkedin', 'profesional'],
  },
]

// ─── Categorías ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  {id: 'all', label: 'Todos'},
  {id: 'veterinaria', label: '🐾 Veterinaria'},
  {id: 'hostelería', label: '🍺 Bar / Hostelería'},
  {id: 'fisio', label: '💪 Fisio / Salud'},
  {id: 'comercio', label: '🛒 Comercio'},
  {id: 'contacto', label: '📍 Contacto'},
  {id: 'redes', label: '📱 Redes'},
  {id: 'ui', label: '⚙️ UI General'},
]

// ─── Componente ──────────────────────────────────────────────────────────────

export function IconPicker({value, onChange}: {value?: string; onChange: (val: any) => void}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return ICONS.filter((entry) => {
      const matchesCategory = category === 'all' || entry.tags.includes(category)
      const matchesSearch =
        !q ||
        entry.label.toLowerCase().includes(q) ||
        entry.value.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0'}}>
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar icono... (ej: pata, beer, instagram)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Filtro por categoría */}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            style={{
              padding: '4px 12px',
              border: category === cat.id ? '2px solid #2563eb' : '1px solid #d1d5db',
              borderRadius: 99,
              background: category === cat.id ? '#eff6ff' : 'white',
              color: category === cat.id ? '#2563eb' : '#6b7280',
              fontSize: 12,
              fontWeight: category === cat.id ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Contador */}
      <div style={{fontSize: 12, color: '#9ca3af'}}>
        {filtered.length} icono{filtered.length !== 1 ? 's' : ''}
        {value && (
          <button
            type="button"
            onClick={() => onChange(unset())}
            style={{
              marginLeft: 12,
              fontSize: 12,
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Quitar selección
          </button>
        )}
      </div>

      {/* Grid de iconos */}
      {filtered.length === 0 ? (
        <div style={{fontSize: 13, color: '#9ca3af', padding: '16px 0'}}>
          No se encontraron iconos para &quot;{search}&quot;
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
          {filtered.map(({value: v, label, icon}) => {
            const isSelected = value === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => onChange(isSelected ? unset() : set(v))}
                title={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '10px 14px',
                  border: isSelected ? '2px solid #2563eb' : '1px solid #d1d5db',
                  borderRadius: 8,
                  background: isSelected ? '#eff6ff' : 'white',
                  cursor: 'pointer',
                  minWidth: 72,
                  fontSize: 11,
                  color: isSelected ? '#2563eb' : '#374151',
                  transition: 'all 0.1s ease',
                }}
              >
                <FontAwesomeIcon icon={icon} size="lg" />
                {label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
