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
        'Looking for accommodation near Plitvice Lakes? Villa Velebita in Lika offers privacy, a private jacuzzi, calm surroundings, and a strong base for an active yet relaxed stay.',
      h1: 'Accommodation near Plitvice Lakes for a calm nature getaway',
      intro:
        'Villa Velebita is a base for guests who want nature, privacy, and quick access to Plitvice. It sits in a quiet part of Lika—ideal for couples, families, and small groups.',
      ctaLabel: 'Check availability',
      breadcrumbLabel: 'Accommodation near Plitvice Lakes',
    },
    de: {
      seoTitle: 'Unterkunft nahe Plitvicer Seen | Villa Velebita',
      metaDescription:
        'Unterkunft nahe den Plitvicer Seen gesucht? Villa Velebita in Lika bietet Privatsphäre, privaten Jacuzzi, Ruhe und eine ideale Basis für aktive und entspannte Tage.',
      h1: 'Unterkunft nahe den Plitvicer Seen für erholsame Tage in der Natur',
      intro:
        'Villa Velebita ist die Basis für Gäste, die Natur, Privatsphäre und schnellen Zugang zu Plitvice wünschen. In einem ruhigen Teil der Lika—ideal für Paare, Familien und kleine Gruppen.',
      ctaLabel: 'Verfügbarkeit prüfen',
      breadcrumbLabel: 'Unterkunft nahe Plitvicer Seen',
    },
    it: {
      seoTitle: 'Alloggio vicino ai Laghi di Plitvice | Villa Velebita',
      metaDescription:
        'Cerchi un alloggio vicino ai Laghi di Plitvice? Villa Velebita in Lika offre privacy, jacuzzi privata, tranquillità e una base ideale per un soggiorno attivo e rilassato.',
      h1: 'Alloggio vicino ai Laghi di Plitvice per una vacanza tranquilla nella natura',
      intro:
        'Villa Velebita è la base per chi cerca natura, privacy e accesso rapido a Plitvice. Si trova in una zona tranquilla della Lika—ideale per coppie, famiglie e piccoli gruppi.',
      ctaLabel: 'Controlla disponibilità',
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
        'Villa Velebita is a holiday house near Plitvice, ideal for families and groups who want privacy, nature, and direct booking.',
      h1: 'Holiday house near Plitvice for families and groups',
      intro:
        'If you are looking for a holiday house close to Plitvice Lakes, this location combines comfort, space, and practical access to Lika’s natural highlights.',
      ctaLabel: 'Book directly',
      breadcrumbLabel: 'Holiday house near Plitvice',
    },
    de: {
      seoTitle: 'Ferienhaus nahe Plitvice | Villa Velebita',
      metaDescription:
        'Villa Velebita ist ein Ferienhaus nahe Plitvice—ideal für Familien und Gruppen mit Privatsphäre, Natur und Direktbuchung.',
      h1: 'Ferienhaus nahe Plitvice für Familien und Gruppen',
      intro:
        'Wer ein Ferienhaus in der Nähe der Plitvicer Seen sucht, findet hier Komfort, Platz und praktischen Zugang zu den Naturhighlights der Lika.',
      ctaLabel: 'Direkt buchen',
      breadcrumbLabel: 'Ferienhaus nahe Plitvice',
    },
    it: {
      seoTitle: 'Casa vacanze vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Villa Velebita è una casa vacanze vicino a Plitvice, ideale per famiglie e gruppi che cercano privacy, natura e prenotazione diretta.',
      h1: 'Casa vacanze vicino a Plitvice per famiglie e gruppi',
      intro:
        'Se cercate una casa vacanze vicino ai Laghi di Plitvice, questa location unisce comfort, spazio e accesso pratico alle attrazioni naturali della Lika.',
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
        'Enjoy a stay in a villa with jacuzzi near Plitvice. Villa Velebita blends nature, privacy, and relaxation with direct booking.',
      h1: 'Villa with jacuzzi near Plitvice for a full reset',
      intro:
        'After an active day in nature, a private jacuzzi and a calm atmosphere deliver the kind of rest guests look for most.',
      ctaLabel: 'Check dates',
      breadcrumbLabel: 'Villa with jacuzzi near Plitvice',
    },
    de: {
      seoTitle: 'Villa mit Jacuzzi nahe Plitvice | Villa Velebita',
      metaDescription:
        'Urlaub in einer Villa mit Jacuzzi nahe Plitvice. Villa Velebita verbindet Natur, Privatsphäre und Entspannung mit Direktbuchung.',
      h1: 'Villa mit Jacuzzi nahe Plitvice für vollständige Erholung',
      intro:
        'Nach einem aktiven Tag in der Natur liefern privater Jacuzzi und ruhige Atmosphäre genau die Erholung, die Gäste am meisten suchen.',
      ctaLabel: 'Termine prüfen',
      breadcrumbLabel: 'Villa mit Jacuzzi nahe Plitvice',
    },
    it: {
      seoTitle: 'Villa con jacuzzi vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Soggiornate in una villa con jacuzzi vicino a Plitvice. Villa Velebita unisce natura, privacy e relax con prenotazione diretta.',
      h1: 'Villa con jacuzzi vicino a Plitvice per un vero reset',
      intro:
        'Dopo una giornata attiva nella natura, la jacuzzi privata e l’atmosfera tranquilla offrono proprio il riposo che gli ospiti cercano di più.',
      ctaLabel: 'Verifica date',
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
        'Looking for accommodation for 9 near Plitvice? Villa Velebita suits families and groups who want comfort and direct booking.',
      h1: 'Accommodation for 9 people near Plitvice',
      intro:
        'For a larger family or group of friends, enough space, clear terms, and a location that simplifies the trip plan matter most.',
      ctaLabel: 'Send inquiry and book',
      breadcrumbLabel: 'Accommodation for 9 people near Plitvice',
    },
    de: {
      seoTitle: 'Unterkunft für 9 Personen nahe Plitvice | Villa Velebita',
      metaDescription:
        'Unterkunft für 9 Personen nahe Plitvice gesucht? Villa Velebita eignet sich für Familien und Gruppen mit Komfort und Direktbuchung.',
      h1: 'Unterkunft für 9 Personen nahe Plitvice',
      intro:
        'Für eine größere Familie oder Freundesgruppe zählen genug Platz, klare Konditionen und eine Lage, die die Reiseplanung vereinfacht.',
      ctaLabel: 'Anfrage senden und buchen',
      breadcrumbLabel: 'Unterkunft für 9 Personen nahe Plitvice',
    },
    it: {
      seoTitle: 'Alloggio per 9 persone vicino a Plitvice | Villa Velebita',
      metaDescription:
        'Cercate alloggio per 9 persone vicino a Plitvice? Villa Velebita è adatta a famiglie e gruppi con comfort e prenotazione diretta.',
      h1: 'Alloggio per 9 persone vicino a Plitvice',
      intro:
        'Per una famiglia numerosa o un gruppo di amici contano spazio sufficiente, condizioni chiare e una posizione che semplifichi il piano di viaggio.',
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
