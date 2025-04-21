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
            title: 'Asesoría nutricional',
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
            description: 'Procedimientos quirúrgicos de rutina en clínica colaboradora y de urgencias en hospital colaborador.',
          },
          {
            icon: 'shield-dog',
            title: 'Seguros',
            description: 'Planes de salud anuales para perros y gatos cachorros, adultos, senior y con patologías crónicas.',
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
            hours: '16:00 - 20:30',
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
            value: 'C/ Anita Martínez, nº8 (Leganés, Madrid)',
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
            value: 'Lun-Vie: 10:00-13:00, 16:00-20:30',
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
        subtitle: 'Aprovecha nuestras ofertas exclusivas en prevención',
        items: [
          {
            title: 'Campaña de rabia',
            description: 'Vacuna antirrábica y desparasitación interna. Incluye revisión general.',
            offer: '18€',
            date: 'Válido hasta: 31/07/2025',
            label: 'Más información',
            image: 'rabia.webp',
          },
          {
            title: 'Familia numerosa',
            description: 'Descuentos en servicios habituales a partir de 3 mascotas registradas en el mismo microchip.',
            offer: 'hasta -20%',
            date: 'Válido hasta: 31/12/2025',
            label: 'Más información',
            image: 'familia-numerosa.webp',
          },
          {
            title: 'Campaña de leishmania',
            description: 'Test y vacuna frente a leishmaniosis. Incluye revisión general',
            offer: '88€',
            date: 'Válido hasta 31/06/2025',
            label: 'Más información',
            image: 'leishmania.webp',
          },
        ],
      },
      insurances: {
        title: 'Planes de salud anuales',
        subtitle: 'Cuida de tu mascota todo el año con nuestros seguros personalizados.',
        items: [
          {
            title: 'Seguro vacunal perro',
            description: 'Protocolo vacunal, antiparasitario interno y antiparasitario externo completo.',
            offer: '190€',
            label: 'Más información',
            image: 'seguro-vacunal.webp',
          },
          {
            title: 'Seguro sanitario perro',
            description: 'Seguro vacunal, consultas ilimitadas, analítica sanguínea y radiografía simple.',
            offer: '250€',
            label: 'Más información',
            image: 'seguro-sanitario-perro.webp',
          },
          {
            title: 'Seguro sanitario cachorro',
            description: 'Protocolo vacunal completo, microchip, tarjeta QR y descuentos en preoperatorio y alimentación.',
            offer: '210€',
            label: 'Más información',
            image: 'seguro-cachorro.webp',
          },
          {
            title: 'Seguro sanitario gato',
            description: 'Seguro vacunal, consultas ilimitadas, analítica sanguínea, analítica de orina y radiografía simple.',
            offer: '200€',
            label: 'Más información',
            image: 'seguro-sanitario-gato.webp',
          },
          {
            title: 'Seguro sanitario gatito',
            description: 'Protocolo vacunal completo, microchp, tarjeta QR y descuentos en preoperatorio y alimentación.',
            offer: '205€',
            label: 'Más información',
            image: 'seguro-gatito.webp',
          },
          {
            title: 'Seguro crónicos',
            description: 'Batería de pruebas a realizar según patología y consultas y revisiones ilimitadas.',
            offer: 'Precio a consultar',
            label: 'Más información',
            image: 'seguro-cronicos.webp',
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
