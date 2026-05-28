// ── Header ──────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  url: string;
}

export interface WhatsAppButton {
  label: string;
  url: string;
  message: string;
}

export interface Header {
  name: string;
  logo: string;
  links: NavLink[];
  button: WhatsAppButton;
  warning?: string;
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroActionButton {
  label: string;
  url: string;
  message?: string;
}

export interface HeroButtons {
  primary: HeroActionButton;
  secondary: HeroActionButton;
  moreInfo: HeroActionButton;
}

export interface Hero {
  title: string;
  subtitle: string;
  banner: string;
  button: HeroButtons;
}

// ── Services ─────────────────────────────────────────────────────────────────

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface Services {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

// ── Timetable ────────────────────────────────────────────────────────────────

export interface TimetableItem {
  day: string;
  hours: string;
}

export interface TimetableRecommendation {
  icon: string;
  text: string;
}

export interface Timetable {
  title: string;
  items: TimetableItem[];
  recomendation: TimetableRecommendation;
}

// ── Contact ──────────────────────────────────────────────────────────────────

export interface ContactItem {
  icon: string;
  value: string;
}

export interface SocialMedia {
  icon: string;
  url: string;
  message?: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  items: ContactItem[];
  socialMedia: SocialMedia[];
}

// ── Promotions ───────────────────────────────────────────────────────────────

export interface Promotion {
  title: string;
  description: string;
  offer: string;
  date: string;
  label: string;
  image: string;
}

export interface Promotions {
  title: string;
  subtitle: string;
  items: Promotion[];
}

// ── Insurances ───────────────────────────────────────────────────────────────

export interface Insurance {
  title: string;
  description: string;
  offer: string;
  label: string;
  image: string;
}

export interface Insurances {
  title: string;
  subtitle: string;
  items: Insurance[];
}

// ── Footer ───────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  url: string;
}

export interface Footer {
  message: string;
  links: FooterLink[];
}

// ── App Data (root shape) ─────────────────────────────────────────────────────

export interface AppSections {
  hero: Hero;
  services: Services;
  timetable: Timetable;
  contact: Contact;
  promotions: Promotions;
  insurances: Insurances;
}

export interface AppData {
  header: Header;
  sections: AppSections;
  footer: Footer;
}
