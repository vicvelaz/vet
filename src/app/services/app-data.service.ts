import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  data = signal({
    header: {
      name: 'Valdeoso',
      // logo: 'assets/images/logo.png',
      links: [
        { label: 'Servicios', url: 'servicios' },
        { label: 'Promociones', url: 'promociones' },
        { label: 'Horario', url: 'horario' },
        { label: 'Planes', url: 'seguros' },
        { label: 'Contacto', url: 'contacto' },
      ],
      button: {
        label: 'Solicitar Cita',
        url: '#contacto',
      },
    },
    sections: {
      hero: {
        title: 'Centro Veterinario Valdeoso',
        subtitle: 'Cuidamos de tus mascotas como si fueran nuestras',
        button: {
          primary: {
            label: 'Pedir Cita',
            url: 'contacto',
          },
          secondary: {
            label: 'Nuestros Servicios',
            url: 'servicios',
          },
          moreInfo: {
            label: 'Descubre más',
            url: 'promociones',
          },
        },
      },
      services: {
        title: 'Nuestros Servicios',
        subtitle: 'Atención profesional y especializada para el bienestar de tu mascota.',
        items: [
          {
            icon: 'stethoscope',
            title: 'Medicina interna',
            description:
              'Servicio de consulta, diagnóstico, tratamiento y seguimiento de las patologías que afectan a nuestras mascotas.',
          },
          {
            icon: 'syringe',
            title: 'Medicina preventiva',
            description: 'Protocolos vacunales y antiparasitarios completos siguiendo las directrices de AVEPA y ESCCAP.',
          },
          {
            icon: 'bone',
            title: 'Asesoramiento nutricional',
            description:
              'Recomendaciones dietéticas personalizadas en función de edad, metabolismo, condición corporal y estado de salud.',
          },
          {
            icon: 'heartPulse',
            title: 'Diagnóstico por imagen',
            description: 'Pruebas radiológicas y ecográficas interpretadas por especialistas en imagen.',
          },
          {
            icon: 'faCut',
            title: 'Cirugía',
            description: 'Procedimientos quirúrgicos de rutina en Clínica colaboradora y de urgencias en Hospital colaborador.',
          },
          {
            icon: 'shield-dog',
            title: 'Seguros',
            description: 'Planes de salud para perros y gatos cachorros, adultos, seniors y con patologías crónicas anuales.',
          },
        ],
      },
      timetable: {
        title: 'Horario de Atención',
        items: [
          {
            day: 'Lunes a Viernes',
            hours: '10:00 - 13:00 ',
          },
          {
            day: '',
            hours: '16:00 - 21:00',
          },
          {
            day: 'Sabado y Domingo',
            hours: 'Cerrado',
          },
          {
            day: 'Urgencias',
            hours: 'Hospital Veterinario Europeo',
          },
          {
            day: '',
            hours: 'Hospital Vetsia',
          },
        ],
        recomendation: {
          icon: 'fa-clock',
          text: 'Recomendamos pedir cita previa para evitar esperas.',
        },
      },
      contact: {
        title: 'Dónde Estamos',
        subtitle: 'Encuentra fácilmente nuestra clínica y las formas de ponerte en contacto con nosotros.',
        items: [
          {
            icon: 'place',
            value: 'Calle Anita Martinez nº 8',
          },
          {
            icon: 'phone',
            value: '+34123456789',
          },
          {
            icon: 'email',
            value: 'info@centroveterinariovaldeoso.com',
          },
          {
            icon: 'clock',
            value: 'Lun-Vie: 10:00-13:00, 16:00-21:00',
          },
        ],
        socialMedia: [
          // {
          //   icon: 'facebook-f',
          //   link: 'https://www.facebook.com/',
          // },
          {
            icon: 'instagram',
            link: 'https://www.instagram.com/',
          },
          // {
          //   icon: 'tiktok',
          //   link: 'https://tiktok.com/',
          // },
          {
            icon: 'whatsapp',
            // link: ' https://wa.me/123456789',
            link: '',
          },
        ],
      },
      promotions: {
        title: 'Promociones Especiales',
        subtitle: 'Aprovecha nuestras ofertas exclusivas para el cuidado de tus mascotas',
        items: [
          {
            title: 'Primera Consulta',
            description: '20% de descuento en tu primera visita. Incluye revisión completa y asesoramiento personalizado.',
            offer: '-20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Primera Consulta',
            description: '20% de descuento en tu primera visita. Incluye revisión completa y asesoramiento personalizado.',
            offer: '-20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Primera Consulta',
            description: '20% de descuento en tu primera visita. Incluye revisión completa y asesoramiento personalizado.',
            offer: '-20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Primera Consulta',
            description: '20% de descuento en tu primera visita. Incluye revisión completa y asesoramiento personalizado.',
            offer: '-20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Primera Consulta',
            description: '20% de descuento en tu primera visita. Incluye revisión completa y asesoramiento personalizado.',
            offer: '-20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'banner.png',
          },
        ],
      },
      insurances: {
        title: 'Planes y Seguros Veterinarios',
        subtitle: 'Cuida de tu mascota todo el año con nuestros planes personalizados y seguros veterinarios accesibles',
        items: [
          {
            title: 'Seguro Anti Borrado de Web',
            description: 'Incluye un certificado en el que aseguro que no te borraré la web :)',
            offer: '999€',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Plan Anual de Salud',
            description: 'Revisiones periódicas, vacunación, desparasitaciones y descuentos en tratamientos durante todo el año.',
            offer: '290€',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Seguro Dental Felino',
            description: 'Cobertura para limpiezas dentales, revisiones y diagnóstico bucal especializado en gatos.',
            offer: '120€',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Plan Senior para Mascotas Mayores',
            description:
              'Chequeos geriátricos, analíticas preventivas y seguimiento clínico especializado para mascotas mayores de 8 años.',
            offer: '210€',
            label: 'Más información',
            image: 'banner.png',
          },
          {
            title: 'Seguro de Emergencias',
            description: 'Cobertura básica para consultas urgentes, estabilización y cuidados iniciales en caso de accidente.',
            offer: 'desde 9€/mes',
            label: 'Más información',
            image: 'banner.png',
          },
        ],
      },
    },
    footer: {
      message: '© 2025 Centro Veterinario Valdeoso. Todos los derechos reservados.',
      links: [
        // { label: 'Términos y Condiciones', url: '/terminos-condiciones' },
        // { label: 'Aviso legal', url: '/legal' },
      ],
    },
  });

}
