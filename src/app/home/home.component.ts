import { Component, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ContactComponent } from '../sections/contact/contact.component';
import { HeroComponent } from '../sections/hero/hero.component';
import { LocationComponent } from '../sections/location/location.component';
import { ServicesComponent } from '../sections/services/services.component';
import { TimetableComponent } from '../sections/timetable/timetable.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    TimetableComponent,
    LocationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  data = signal({
    header: {
      name: 'VetCare',
      // logo: 'assets/images/logo.png',
      links: [
        { label: 'Inicio', url: '#inicio' },
        { label: 'Servicios', url: '#servicios' },
        { label: 'Ubicación', url: '#ubicacion' },
        { label: 'Contacto', url: '#contacto' },
      ],
      button: {
        label: 'Solicitar Cita',
        url: '#contacto',
      },
    },
    sections: {
      hero: {
        title: 'Clínica Veterinaria VetCare',
        subtitle: 'Cuidamos de tus mascotas como si fueran nuestras',
        button: {
          primary: {
            label: 'Pedir Cita',
            url: '#contacto',
          },
          secondary: {
            label: 'Nuestros Servicios',
            url: '#servicios',
          },
          moreInfo: {
            label: 'Descubre más',
            url: '#servicios',
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
            description: 'Protocolos vacunales y antiparasitarios completos siguiendo las directrices de AVEPA y ESCCAP',
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
            hours: '18:00 - 21:00',
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
      location: {
        title: 'Nuestra Ubicación',
        subtitle: 'Estamos ubicados en una zona de fácil acceso con amplio aparcamiento.',
        items: [
          {
            icon: 'place',
            label: 'Dirección:',
            value: 'Calle Anita Martínez nº8',
          },
          {
            icon: 'phone',
            label: 'Teléfono:',
            value: '+34 123 456 789',
          },
        ],
        button: {
          label: 'Cómo llegar',
          url: '',
        },
      },
      contact: {
        title: 'Contáctanos',
        subtitle: 'Estamos aquí para responder a tus preguntas. No dudes en contactarnos.',
        items: [
          {
            icon: 'phone',
            value: '+34 123 456 789',
          },
          {
            icon: 'email',
            value: 'email@vetcare.com',
          },
          {
            icon: 'place',
            value: 'Calle Veterinaria, 123, Ciudad, País',
          },
          {
            icon: 'clock',
            value: 'Lunes a Viernes: 9:00 AM - 8:00 PM, Sábado: 10:00 AM - 4:00 PM, Domingo: Cerrado',
          },
        ],
        socialMedia: [
          {
            icon: 'facebook-f',
            link: 'https://www.facebook.com/',
          },
          {
            icon: 'instagram',
            link: 'https://www.instagram.com/',
          },
          {
            icon: 'tiktok',
            link: 'https://tiktok.com/',
          },
          {
            icon: 'whatsapp',
            // link: ' https://wa.me/123456789',
            link: '',
          },
        ],
      },
    },
    footer: {
      message: '© 2025 Clínica Veterinaria VetCare. Todos los derechos reservados.',
      links: [
        { label: 'Política de Privacidad', url: '#' },
        { label: 'Términos y Condiciones', url: '#' },
        { label: 'Cookies', url: '#' },
      ],
    },
  });
}
