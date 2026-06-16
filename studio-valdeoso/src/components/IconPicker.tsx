// studio-valdeoso/src/components/IconPicker.tsx
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {
  faBandage,
  faBone,
  faCar,
  faClock,
  faEnvelope,
  faEye,
  faHeartPulse,
  faHouse,
  faLocationDot,
  faMicroscope,
  faPaw,
  faPhone,
  faScissors,
  faShieldHeart,
  faStethoscope,
  faSyringe,
  faTooth,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {set, unset} from 'sanity'

export const ICONS: {value: string; label: string; icon: IconDefinition}[] = [
  {value: 'fa-paw', label: 'Mascota', icon: faPaw},
  {value: 'fa-scissors', label: 'Peluquería', icon: faScissors},
  {value: 'fa-house', label: 'Hotel', icon: faHouse},
  {value: 'fa-syringe', label: 'Vacuna', icon: faSyringe},
  {value: 'fa-stethoscope', label: 'Consulta', icon: faStethoscope},
  {value: 'fa-shield-heart', label: 'Seguro', icon: faShieldHeart},
  {value: 'fa-bandage', label: 'Cura', icon: faBandage},
  {value: 'fa-microscope', label: 'Laboratorio', icon: faMicroscope},
  {value: 'fa-heart-pulse', label: 'Urgencias', icon: faHeartPulse},
  {value: 'fa-tooth', label: 'Dental', icon: faTooth},
  {value: 'fa-bone', label: 'Traumatología', icon: faBone},
  {value: 'fa-eye', label: 'Oftalmología', icon: faEye},
  {value: 'fa-weight-scale', label: 'Peso', icon: faWeightScale},
  {value: 'fa-car', label: 'Transporte', icon: faCar},
  {value: 'fa-phone', label: 'Teléfono', icon: faPhone},
  {value: 'fa-location-dot', label: 'Ubicación', icon: faLocationDot},
  {value: 'fa-clock', label: 'Horario', icon: faClock},
  {value: 'fa-envelope', label: 'Email', icon: faEnvelope},
]

export function IconPicker({value, onChange}: {value?: string; onChange: (val: any) => void}) {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, padding: '8px 0'}}>
      {ICONS.map(({value: v, label, icon}) => {
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
            }}
          >
            <FontAwesomeIcon icon={icon} size="lg" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
