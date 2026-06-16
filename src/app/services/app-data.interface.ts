import { SafeUrl } from '@angular/platform-browser';

export interface AppData {
  warning?: string;
  header: Header;
  sections: Sections;
  footer: Footer;
}

export interface Header {
  name: string;
  logo: string;
  links: HeaderLink[];
  button: ButtonLink;
}

export interface HeaderLink {
  label: string;
  url: string;
}

export interface ButtonLink {
  label: string;
  url: string | SafeUrl;
  message?: string;
}

export interface Sections {
  hero: HeroSection;
  services: ServicesSection;
  timetable: TimetableSection;
  contact: ContactSection;
  promotions: PromotionsSection;
  insurances: InsurancesSection;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  banner?: string;
  button: {
    primary: ButtonLink;
    secondary: {
      label: string;
      url: string;
    };
    moreInfo: {
      label: string;
      url: string;
    };
  };
}

export interface ServicesSection {
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface TimetableSection {
  title: string;
  items: TimetableItem[];
  recomendation: {
    icon: string;
    text: string;
  };
}

export interface TimetableItem {
  day: string;
  hours: string;
}

export interface ContactSection {
  title: string;
  subtitle?: string;
  items: ContactItem[];
  socialMedia?: SocialMediaItem[];
}

export interface ContactItem {
  icon: string;
  value: string;
}

export interface SocialMediaItem {
  icon: string;
  url: string | SafeUrl;
  message?: string;
}

export interface PromotionsSection {
  title: string;
  subtitle?: string;
  items: PromotionItem[];
}

export interface PromotionItem {
  title: string;
  description?: string;
  offer?: string;
  initDate?: string;
  endDate?: string;
  label?: string;
  image?: string;
}

export interface InsurancesSection {
  title: string;
  subtitle?: string;
  items: InsuranceItem[];
}

export interface InsuranceItem {
  title: string;
  description?: string;
  offer?: string;
  label?: string;
  image?: string;
}

export interface Footer {
  message: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  url: string;
}
