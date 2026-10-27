import {defineField, defineType} from 'sanity'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Puntuación',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: 'text',
      title: 'Texto de la reseña',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publicada',
      type: 'boolean',
      initialValue: true,
      description: 'Desmarca para ocultar esta reseña de la web sin borrarla.',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      rating: 'rating',
    },
    prepare: ({title, subtitle, rating}) => ({
      title: `${title} — ${'⭐'.repeat(rating ?? 0)}`,
      subtitle,
    }),
  },
})