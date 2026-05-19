import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/routing';
import { LANDING_ENRICHED } from './landing-enriched-data';
import type {
  LandingMergedContent,
  LandingPageBase,
  LandingPageKey,
} from './landing-enriched-types';

export type { LandingMergedContent, LandingPageKey } from './landing-enriched-types';

type LandingPageContent = LandingPageBase;

const LANDING_PAGE_CONTENT: Record<LandingPageKey, Record<AppLocale, LandingPageContent>> = {
  'smjestaj-plitvicka-jezera': {
    hr: {
      seoTitle: 'Smjestaj blizu Plitvickih jezera | Villa Velebita',
      metaDescription:
        'Traziš smjestaj blizu Plitvickih jezera? Villa Velebita u Lici nudi privatnost, jacuzzi, mir i odlicnu lokaciju za aktivan i opušten odmor.',
      h1: 'Smjestaj blizu Plitvickih jezera za miran odmor u prirodi',
      intro:
        'Villa Velebita je baza za goste koji zele prirodu, privatnost i brz pristup Plitvicama. Smjestena je u mirnom dijelu Like, idealna za parove, obitelji i manje grupe.',
      ctaLabel: 'Provjeri dostupnost termina',
      breadcrumbLabel: 'Smjestaj blizu Plitvickih jezera',
    },
    en: {
      seoTitle: 'Accommodation Near Plitvice Lakes | Villa Velebita',
      metaDescription:
        'Looking for accommodation near Plitvice Lakes? Villa Velebita offers privacy, jacuzzi comfort, and a peaceful Lika location for direct bookings.',
      h1: 'Accommodation Near Plitvice Lakes for a Relaxing Nature Stay',
      intro:
        'Villa Velebita is designed for guests who want quick access to Plitvice while staying in a calm and private part of Lika.',
      ctaLabel: 'Check availability',
      breadcrumbLabel: 'Accommodation near Plitvice Lakes',
    },
    de: {
      seoTitle: 'Unterkunft nahe Plitvicer Seen | Villa Velebita',
      metaDescription:
        'Unterkunft nahe den Plitvicer Seen mit direkter Buchung. Villa Velebita bietet Ruhe, Privatsphäre, Jacuzzi und eine starke Lage in Lika.',
      h1: 'Unterkunft nahe den Plitvicer Seen fur erholsame Naturtage',
      intro:
        'Villa Velebita ist ideal fur Gaste, die Natur, Komfort und eine ruhige Lage nahe den Plitvicer Seen suchen.',
      ctaLabel: 'Verfugbarkeit prufen',
      breadcrumbLabel: 'Unterkunft nahe Plitvicer Seen',
    },
    it: {
      seoTitle: 'Alloggio vicino ai Laghi di Plitvice | Villa Velebita',
      metaDescription:
        'Cerchi un alloggio vicino ai Laghi di Plitvice? Villa Velebita offre privacy, jacuzzi e prenotazione diretta in una posizione tranquilla in Lika.',
      h1: 'Alloggio vicino ai Laghi di Plitvice per un soggiorno nella natura',
      intro:
        'Villa Velebita e una base ideale per chi vuole visitare Plitvice e allo stesso tempo rilassarsi in un ambiente tranquillo.',
      ctaLabel: 'Controlla disponibilita',
      breadcrumbLabel: 'Alloggio vicino ai Laghi di Plitvice',
    },
  },
  'kuca-za-odmor-plitvice': {
    hr: {
      seoTitle: 'Kuca za odmor blizu Plitvica | Villa Velebita',
      metaDescription:
        'Villa Velebita je kuca za odmor blizu Plitvica, idealna za obitelji i grupe koje žele privatnost, prirodu i direktnu rezervaciju.',
      h1: 'Kuca za odmor blizu Plitvica za obitelji i grupe',
      intro:
        'Ako trazis kucu za odmor u blizini Plitvickih jezera, ova lokacija kombinira komfor, prostor i prakticnu povezanost s prirodnim atrakcijama Like.',
      ctaLabel: 'Rezerviraj direktno',
      breadcrumbLabel: 'Kuca za odmor blizu Plitvica',
    },
    en: {
      seoTitle: 'Holiday House Near Plitvice | Villa Velebita',
      metaDescription:
        'Villa Velebita is a holiday house near Plitvice, ideal for families and groups seeking comfort, privacy, and direct booking.',
      h1: 'Holiday House Near Plitvice for Families and Groups',
      intro:
        'This house near Plitvice combines practical location, private space, and full-stay comfort for multi-day travel plans.',
      ctaLabel: 'Book directly',
      breadcrumbLabel: 'Holiday house near Plitvice',
    },
    de: {
      seoTitle: 'Ferienhaus nahe Plitvice | Villa Velebita',
      metaDescription:
        'Ferienhaus nahe Plitvice fur Familien und Gruppen. Villa Velebita bietet Komfort, Privatsphäre und direkte Buchung ohne Vermittler.',
      h1: 'Ferienhaus nahe Plitvice fur Familien und Gruppen',
      intro:
        'Diese Unterkunft verbindet naturnahe Lage, ausreichend Platz und Direktbuchung fur einen stressfreien Aufenthalt.',
      ctaLabel: 'Direkt buchen',
      breadcrumbLabel: 'Ferienhaus nahe Plitvice',
    },
    it: {
      seoTitle: 'Casa vacanze vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Casa vacanze vicino a Plitvice ideale per famiglie e gruppi. Villa Velebita offre comfort, privacy e prenotazione diretta.',
      h1: 'Casa vacanze vicino a Plitvice per famiglie e gruppi',
      intro:
        'Una soluzione completa per chi cerca natura, comodita e una posizione pratica per visitare i Laghi di Plitvice.',
      ctaLabel: 'Prenota direttamente',
      breadcrumbLabel: 'Casa vacanze vicino a Plitvice',
    },
  },
  'villa-jacuzzi-plitvice': {
    hr: {
      seoTitle: 'Villa s jacuzzijem blizu Plitvica | Villa Velebita',
      metaDescription:
        'Uživaj u odmoru u vili s jacuzzijem blizu Plitvica. Villa Velebita spaja prirodu, privatnost i opuštanje uz direktnu rezervaciju.',
      h1: 'Villa s jacuzzijem blizu Plitvica za potpuni odmor',
      intro:
        'Nakon aktivnog dana u prirodi, privatni jacuzzi i mirna atmosfera pruzaju iskustvo odmora koje gosti najvise traze.',
      ctaLabel: 'Provjeri termine',
      breadcrumbLabel: 'Villa s jacuzzijem blizu Plitvica',
    },
    en: {
      seoTitle: 'Villa With Jacuzzi Near Plitvice | Villa Velebita',
      metaDescription:
        'Stay in a villa with jacuzzi near Plitvice Lakes. Villa Velebita combines privacy, comfort, and direct booking for nature-focused trips.',
      h1: 'Villa With Jacuzzi Near Plitvice for Full Relaxation',
      intro:
        'This stay pairs active days in nature with private evening relaxation in a peaceful Lika setting.',
      ctaLabel: 'Check dates',
      breadcrumbLabel: 'Villa with jacuzzi near Plitvice',
    },
    de: {
      seoTitle: 'Villa mit Jacuzzi nahe Plitvice | Villa Velebita',
      metaDescription:
        'Villa mit Jacuzzi nahe Plitvice fur einen entspannten Natururlaub. Direkte Buchung, Privatsphäre und komfortable Ausstattung.',
      h1: 'Villa mit Jacuzzi nahe Plitvice fur erholsamen Urlaub',
      intro:
        'Die Kombination aus Naturerlebnis und privater Erholung macht diese Unterkunft besonders attraktiv fur Direktbucher.',
      ctaLabel: 'Termine prufen',
      breadcrumbLabel: 'Villa mit Jacuzzi nahe Plitvice',
    },
    it: {
      seoTitle: 'Villa con jacuzzi vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Soggiorna in una villa con jacuzzi vicino a Plitvice. Villa Velebita offre privacy, natura e prenotazione diretta senza intermediari.',
      h1: 'Villa con jacuzzi vicino a Plitvice per un relax completo',
      intro:
        'Una proposta ideale per unire giornate attive nella natura e momenti di puro relax in un ambiente riservato.',
      ctaLabel: 'Verifica disponibilita',
      breadcrumbLabel: 'Villa con jacuzzi vicino a Plitvice',
    },
  },
  'smjestaj-za-9-osoba-plitvice': {
    hr: {
      seoTitle: 'Smjestaj za 9 osoba blizu Plitvica | Villa Velebita',
      metaDescription:
        'Tražiš smještaj za 9 osoba kod Plitvica? Villa Velebita je odlican izbor za obitelji i grupe koje zele komfor i direktnu rezervaciju.',
      h1: 'Smjestaj za 9 osoba blizu Plitvica',
      intro:
        'Za vecu obitelj ili grupu prijatelja važno je imati dovoljno prostora, jasne uvjete i lokaciju koja pojednostavljuje plan puta.',
      ctaLabel: 'Posalji upit i rezerviraj',
      breadcrumbLabel: 'Smjestaj za 9 osoba blizu Plitvica',
    },
    en: {
      seoTitle: 'Accommodation for 9 People Near Plitvice | Villa Velebita',
      metaDescription:
        'Need accommodation for 9 people near Plitvice? Villa Velebita is a practical choice for larger families and groups with direct booking.',
      h1: 'Accommodation for 9 People Near Plitvice',
      intro:
        'For larger groups, comfort and logistics matter most. This property supports multi-person stays with direct booking and flexible planning.',
      ctaLabel: 'Send request and book',
      breadcrumbLabel: 'Accommodation for 9 people near Plitvice',
    },
    de: {
      seoTitle: 'Unterkunft fur 9 Personen nahe Plitvice | Villa Velebita',
      metaDescription:
        'Unterkunft fur 9 Personen nahe Plitvice. Ideal fur Familien und Gruppen mit klaren Konditionen und direkter Buchung.',
      h1: 'Unterkunft fur 9 Personen nahe Plitvice',
      intro:
        'Fur Gruppenreisen sind ausreichend Platz, gute Lage und transparente Buchung entscheidend. Genau darauf ist diese Unterkunft ausgerichtet.',
      ctaLabel: 'Anfrage senden und buchen',
      breadcrumbLabel: 'Unterkunft fur 9 Personen nahe Plitvice',
    },
    it: {
      seoTitle: 'Alloggio per 9 persone vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Alloggio per 9 persone vicino a Plitvice, ideale per gruppi e famiglie con prenotazione diretta e organizzazione semplice.',
      h1: 'Alloggio per 9 persone vicino a Plitvice',
      intro:
        'Per i gruppi numerosi servono spazio, comodita e logistica efficiente. Questa soluzione risponde a queste esigenze.',
      ctaLabel: 'Invia richiesta e prenota',
      breadcrumbLabel: 'Alloggio per 9 persone vicino a Plitvice',
    },
  },
};

export function getLandingPageContent(
  key: LandingPageKey,
  locale: AppLocale,
): LandingMergedContent {
  return {
    ...LANDING_PAGE_CONTENT[key][locale],
    ...LANDING_ENRICHED[key][locale],
  };
}

export function getLandingPageMetadata(
  key: LandingPageKey,
  locale: AppLocale,
): Metadata {
  const pathname = `/${key}`;
  const localizedPath = locale === 'hr' ? pathname : `/${locale}${pathname}`;
  const content = getLandingPageContent(key, locale);

  return {
    title: content.seoTitle,
    description: content.metaDescription,
    alternates: {
      canonical: localizedPath,
      languages: {
        hr: pathname,
        en: `/en${pathname}`,
        de: `/de${pathname}`,
        it: `/it${pathname}`,
        'x-default': pathname,
      },
    },
    openGraph: {
      type: 'article',
      url: localizedPath,
      title: content.seoTitle,
      description: content.metaDescription,
      images: ['/images/hero/exterior-08.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seoTitle,
      description: content.metaDescription,
      images: ['/images/hero/exterior-08.jpg'],
    },
  };
}
