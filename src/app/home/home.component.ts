import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../sections/hero/hero.component';
import { ContactComponent } from '../sections/contact/contact.component';
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
      name: 'VerCare',
      // logo: 'assets/images/logo.png',
      links: [
        { label: 'Inicio', link: '/#inicio' },
        { label: 'Servicios', link: '/#servicios' },
        { label: 'Equipo', link: '/#equipo' },
        { label: 'Ubicación', link: '/#ubicacion' },
        { label: 'Contacto', link: '/#contacto' },
      ],
      button: {
        name: 'Solicitar Cita',
        link: '/#contacto',
      },
    },
    sections: {
      hero: {
        title: 'Clinica Veterinaria VetCare',
        subtitle: 'Cuidamos de tus mascotas como si fueran nuestras',
        button: {
          primary: {
            label: 'Pedir Cita',
            link: '/#contacto',
          },
          secondary: {
            label: 'Nuestros Servicios',
            link: '/#servicios',
          },
          moreInfo: {
            label: 'Descubre más',
            link: '/#servicios',
          },
        },
      },
      services: {
        title: 'Nuestros Servicios',
        subtitle:
          'Ofrecemos una amplia gama de servicios para el cuidado de tu mascota.',
        items: [
          {
            icon: 'pets',
            title: 'Consulta Veterinaria',
            description: 'Consulta veterinaria general y especializada.',
          },
          {
            icon: 'vaccines',
            title: 'Vacunación',
            description: 'Vacunación y desparasitacion de mascotas.',
          },
          {
            icon: 'sick',
            title: 'Urgencias',
            description: 'Atención de urgencias y emergencias veterinarias.',
          },
          {
            icon: 'local_hospital',
            title: 'Hospitalización',
            description: 'Hospitalización y cuidados intensivos.',
          },
        ],
      },
      timetable: {
        title: 'Horario de Atención',
        subtitle: 'Estamos aquí para cuidar de tus mascotas.',
        items: [
          {
            day: 'Lunes a Viernes',
            hours: '9:00 AM - 8:00 PM',
          },
          {
            day: 'Sábado',
            hours: '10:00 AM - 4:00 PM',
          },
          {
            day: 'Domingo',
            hours: 'Cerrado',
          },
        ],
        recomendation: {
          icon: 'info',
          text: 'Recomendamos pedir cita previa para evitar esperas.',
        },
      },
      location: {
        title: 'Nuestra Ubicación',
        subtitle: 'Visítanos en nuestra clínica veterinaria.',
        address: {
          icon: 'place',
          label: 'Dirección:',
          value: 'Calle Veterinaria, 123, Ciudad, País',
        },
        phone: {
          icon: 'phone',
          label: 'Teléfono:',
          value: '+34 123 456 789',
        },
        email: {
          icon: 'email',
          label: 'Email:',
          value: 'info@vetcare.com',
        },
        button: {
          label: 'Cómo llegar',
          link: '',
        },
      },
      contact:{
        title: 'Contáctanos',
        subtitle: 'Estamos aquí para responder a tus preguntas. No dudes en contactarnos.',
        phone: {
          icon: 'phone',
          value: '+34 123 456 789',
        },
        email: {
          icon: 'email',
          value: 'email@vetcare.com'
        },
        location: {
          icon: 'place',
          value: 'Calle Veterinaria, 123, Ciudad, País',
        },
        timetable:{
          icon: 'access_time',
          value: 'Lunes a Viernes: 9:00 AM - 8:00 PM, Sábado: 10:00 AM - 4:00 PM, Domingo: Cerrado',
        },
        socialMedia: [
          {
            icon: 'facebook',
            link: 'https://www.facebook.com/',
          },
          {
            icon: 'instagram',
            link: 'https://www.instagram.com/',
          },
          {
            icon: 'tikTok',
            link: 'https://tiktok.com/',
          },
        ]
      }
    },
    footer: {
      message:
        '&copy; 2025 Clínica Veterinaria VetCare. Todos los derechos reservados.',
      links: [
        { label: 'Política de Privacidad', link: '/#' },
        { label: 'Términos y Condiciones', link: '/#' },
        { label: 'Cookies', link: '/#' },
      ],
    },
  });
}
