import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {IconPicker, ICONS} from '../src/components/IconPicker'

// ==========================================
// OBJETOS REUTILIZABLES
// ==========================================

export const basicLink = defineType({
  name: 'basicLink',
  title: 'Enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'url', title: 'URL', type: 'string', validation: (Rule) => Rule.required()}),
  ],
})

export const buttonLink = defineType({
  name: 'buttonLink',
  title: 'Botón Enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL o teléfono',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'message', title: 'Mensaje (WhatsApp)', type: 'string'}),
  ],
})

// ==========================================
// SECCIONES DINÁMICAS (van a Sanity)
// Solo los items son editables, título y subtítulo son opcionales
// para sobreescribir el default de la app
// ==========================================

// AppConfig — configuración global de la app (avisos, etc.)
export const appConfigSchema = defineType({
  name: 'appConfig',
  title: 'Configuración',
  type: 'document',
  fields: [
    defineField({
      name: 'warning',
      title: 'Aviso global',
      type: 'string',
      description:
        'Mensaje de aviso visible en toda la app (cierres, urgencias…). Déjalo vacío si no hay aviso activo.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la aplicación',
      type: 'image',
      options: {hotspot: true},
      description:
        'Logo que se mostrará en la barra de navegación y en la pantalla de inicio. Si se deja vacío se usa el logo por defecto.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Configuración'}),
  },
})

// Hero — solo el banner es dinámico
export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'banner',
      title: 'Imagen de fondo',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen principal del hero. Si se deja vacío se usa la imagen por defecto.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Hero'}),
  },
})

// Servicios — items completamente editables
export const servicesSchema = defineType({
  name: 'servicesSection',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Servicios',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              components: {input: IconPicker},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', icon: 'icon'},
          },
          components: {
            preview: (props: any) => {
              const found = ICONS.find((i) => i.value === props?.icon)
              return (
                <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px'}}>
                  {found ? (
                    <FontAwesomeIcon icon={found.icon} size="lg" style={{width: 24}} />
                  ) : (
                    <span style={{width: 24}}>?</span>
                  )}
                  <div>
                    <div style={{fontWeight: 600}}>{props?.title ?? 'Sin título'}</div>
                    <div style={{fontSize: 12, color: '#6b7280'}}>{props?.subtitle}</div>
                  </div>
                </div>
              )
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Servicios'}),
  },
})

// Horarios — items completamente editables
export const timetableSchema = defineType({
  name: 'timetableSection',
  title: 'Horarios',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Horarios',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Día',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hours',
              title: 'Horas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'day', subtitle: 'hours'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Horarios'}),
  },
})

// Contacto — items y redes sociales editables
export const contactSchema = defineType({
  name: 'contactSection',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Datos de contacto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              components: {input: IconPicker},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'value', icon: 'icon'},
          },
          components: {
            preview: (props: any) => {
              const found = ICONS.find((i) => i.value === props?.icon)
              return (
                <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px'}}>
                  {found ? (
                    <FontAwesomeIcon icon={found.icon} size="lg" style={{width: 24}} />
                  ) : (
                    <span style={{width: 24}}>?</span>
                  )}
                  <div style={{fontWeight: 600}}>{props?.title ?? 'Sin valor'}</div>
                </div>
              )
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Redes sociales',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              components: {input: IconPicker},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL o teléfono',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'message', title: 'Mensaje (WhatsApp)', type: 'string'}),
          ],
          preview: {
            select: {title: 'url', icon: 'icon'},
          },
          components: {
            preview: (props: any) => {
              const found = ICONS.find((i) => i.value === props?.icon)
              return (
                <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px'}}>
                  {found ? (
                    <FontAwesomeIcon icon={found.icon} size="lg" style={{width: 24}} />
                  ) : (
                    <span style={{width: 24}}>?</span>
                  )}
                  <div style={{fontWeight: 600}}>{props?.title ?? 'Sin URL'}</div>
                </div>
              )
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Contacto'}),
  },
})

// Promociones — items completamente editables
export const promotionsSchema = defineType({
  name: 'promotionsSection',
  title: 'Promociones',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Promociones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Descripción', type: 'text'}),
            defineField({
              name: 'offer',
              title: 'Oferta',
              type: 'string',
              description: 'Ej: 20% descuento',
            }),
            defineField({name: 'initDate', title: 'Fecha de inicio', type: 'date'}),
            defineField({name: 'endDate', title: 'Fecha de fin', type: 'date'}),
            defineField({
              name: 'label',
              title: 'Etiqueta',
              type: 'string',
              description: 'Ej: Nuevo, Limitado...',
            }),
            defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'offer'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Promociones'}),
  },
})

// Seguros — items completamente editables
export const insurancesSchema = defineType({
  name: 'insurancesSection',
  title: 'Seguros',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Seguros',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Descripción', type: 'text'}),
            defineField({name: 'offer', title: 'Oferta', type: 'string'}),
            defineField({name: 'label', title: 'Etiqueta', type: 'string'}),
            defineField({name: 'image', title: 'Imagen', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'offer'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Seguros'}),
  },
})
