import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {
  basicLink,
  buttonLink,
  contactSchema,
  headerSchema,
  heroSchema,
  insurancesSchema,
  promotionsSchema,
  servicesSchema,
  timetableSchema,
} from './schemaTypes/appData'

const SINGLETONS = [
  'header',
  'hero',
  'servicesSection',
  'timetableSection',
  'contactSection',
  'promotionsSection',
  'insurancesSection',
]

export default defineConfig({
  name: 'default',
  title: 'Valdeoso',

  projectId: '4e4zozm9',
  dataset: 'production',

  schema: {
    types: [
      // Objetos reutilizables
      basicLink,
      buttonLink,
      // Documentos (singletons)
      headerSchema,
      heroSchema,
      servicesSchema,
      timetableSchema,
      contactSchema,
      promotionsSchema,
      insurancesSchema,
    ],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('⚠️ Cabecera — Aviso')
              .child(S.document().schemaType('header').documentId('header')),
            S.listItem()
              .title('🖼️ Hero — Banner')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.divider(),
            S.listItem()
              .title('🐾 Servicios')
              .child(S.document().schemaType('servicesSection').documentId('servicesSection')),
            S.listItem()
              .title('🕐 Horarios')
              .child(S.document().schemaType('timetableSection').documentId('timetableSection')),
            S.listItem()
              .title('📞 Contacto')
              .child(S.document().schemaType('contactSection').documentId('contactSection')),
            S.listItem()
              .title('🏷️ Promociones')
              .child(S.document().schemaType('promotionsSection').documentId('promotionsSection')),
            S.listItem()
              .title('🛡️ Seguros')
              .child(S.document().schemaType('insurancesSection').documentId('insurancesSection')),
          ]),
    }),
  ],

  document: {
    // Elimina el botón "Crear nuevo" para los singletons
    newDocumentOptions: (prev) => prev.filter((option) => !SINGLETONS.includes(option.templateId)),

    // Solo permite publicar y descartar cambios (sin duplicar ni eliminar)
    actions: (prev, {schemaType}) => {
      if (SINGLETONS.includes(schemaType)) {
        return prev.filter(
          ({action}) =>
            action === 'publish' || action === 'discardChanges' || action === 'unpublish',
        )
      }
      return prev
    },
  },
})
