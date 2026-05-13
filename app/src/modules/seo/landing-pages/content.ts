import type { Metadata } from 'next';
import type { AppLocale } from '@/i18n/routing';

export type LandingPageKey =
  | 'smjestaj-plitvicka-jezera'
  | 'kuca-za-odmor-plitvice'
  | 'villa-jacuzzi-plitvice'
  | 'smjestaj-za-9-osoba-plitvice';

type LandingPageContent = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  ctaLabel: string;
  breadcrumbLabel: string;
};

type LocalizedLandingContent = Record<AppLocale, LandingPageContent>;

const LANDING_PAGE_CONTENT: Record<LandingPageKey, LocalizedLandingContent> = {
  'smjestaj-plitvicka-jezera': {
    hr: {
      seoTitle: 'Smjestaj blizu Plitvickih jezera | Villa Velebita',
      metaDescription:
        'Traziš smjestaj blizu Plitvickih jezera? Villa Velebita u Lici nudi privatnost, jacuzzi, mir i odlicnu lokaciju za aktivan i opušten odmor.',
      h1: 'Smjestaj blizu Plitvickih jezera za miran odmor u prirodi',
      intro:
        'Villa Velebita je baza za goste koji zele prirodu, privatnost i brz pristup Plitvicama. Smjestena je u mirnom dijelu Like, idealna za parove, obitelji i manje grupe.',
      sections: [
        {
          heading: 'Zasto odabrati smjestaj u blizini Plitvickih jezera',
          body: 'Lokacija skracuje vrijeme putovanja do najatraktivnijih ruta i ostavlja vise vremena za odmor. Umjesto urbanog tempa dobivas mir, tisinu i autentičan doživljaj Like.',
        },
        {
          heading: 'Sto vas ceka u Villa Velebita',
          body: 'Gostima su na raspolaganju privatni jacuzzi, opremljena kuhinja, udobne spavace sobe i prostor za druzenje. Kombinacija komfora i prirode posebno odgovara gostima koji traze direktnu rezervaciju bez provizije.',
        },
        {
          heading: 'Lokacija i jednodnevni izleti po Lici',
          body: 'Uz NP Plitvicka jezera lako planiras izlete kroz prirodu i lokalne atrakcije. Smjestaj u Lici daje fleksibilnost za krace i dulje itinerare tijekom cijele godine.',
        },
      ],
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
      sections: [
        {
          heading: 'Why stay near Plitvice Lakes',
          body: 'A nearby location gives you more time outdoors and less time in transit. You can visit the park early and return to a peaceful setting.',
        },
        {
          heading: 'What to expect at Villa Velebita',
          body: 'Guests enjoy a private jacuzzi, comfortable interiors, and direct booking with no third-party commissions.',
        },
        {
          heading: 'Lika trips and local experiences',
          body: 'From national park routes to countryside day trips, the villa location supports flexible travel plans for couples, families, and groups.',
        },
      ],
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
      sections: [
        {
          heading: 'Warum eine Unterkunft nahe Plitvice sinnvoll ist',
          body: 'Kurze Wege zum Nationalpark bedeuten mehr Zeit fur Erlebnisse und weniger Reiseaufwand am Tag.',
        },
        {
          heading: 'Was Villa Velebita bietet',
          body: 'Privater Jacuzzi, komfortable Ausstattung und direkte Buchung ohne Vermittler machen den Aufenthalt planbar und entspannt.',
        },
        {
          heading: 'Ausfluge in Lika',
          body: 'Die Region rund um Plitvice bietet Natur, Ruhe und vielseitige Tagesausfluge fur Familien und Gruppen.',
        },
      ],
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
      sections: [
        {
          heading: 'Perche scegliere un alloggio vicino a Plitvice',
          body: 'Una posizione vicina riduce gli spostamenti e lascia piu tempo per vivere la natura e le escursioni.',
        },
        {
          heading: 'Cosa offre Villa Velebita',
          body: 'Jacuzzi privato, ambienti confortevoli e prenotazione diretta senza commissioni di piattaforma.',
        },
        {
          heading: 'Escursioni in Lika',
          body: 'Dalla visita al parco nazionale a itinerari giornalieri nei dintorni, la zona offre molte opzioni durante tutto l anno.',
        },
      ],
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
      sections: [
        {
          heading: 'Privatna kuca za odmor s punim komforom',
          body: 'Dobivas cijeli objekt za sebe, bez dijeljenja prostora s drugim gostima. To olaksava planiranje boravka za obitelj i prijatelje.',
        },
        {
          heading: 'Idealno za obiteljski i grupni boravak',
          body: 'Raspored i oprema prilagodeni su visednevnom boravku, uz dovoljno prostora za zajednicko druzenje i privatni odmor.',
        },
        {
          heading: 'Direktna rezervacija bez provizija',
          body: 'Rezervacijom direktno preko sluzbene stranice imas jasnu komunikaciju i transparentne uvjete.',
        },
      ],
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
      sections: [
        {
          heading: 'Private holiday house with full comfort',
          body: 'You book the entire property, giving your group privacy and flexibility throughout the stay.',
        },
        {
          heading: 'Great fit for families and friends',
          body: 'The layout and amenities support shared travel while keeping enough space for rest and downtime.',
        },
        {
          heading: 'Direct booking benefits',
          body: 'Book directly for transparent terms, faster communication, and no platform commission.',
        },
      ],
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
      sections: [
        {
          heading: 'Privates Ferienhaus mit Komfort',
          body: 'Das gesamte Haus steht nur deiner Gruppe zur Verfugung, was Planung und Erholung deutlich erleichtert.',
        },
        {
          heading: 'Passend fur Familien und Gruppen',
          body: 'Raumaufteilung und Ausstattung sind auf mehrtagige Aufenthalte und gemeinsame Reisen ausgelegt.',
        },
        {
          heading: 'Direkte Buchung mit klaren Konditionen',
          body: 'Direkt uber die Website buchen bedeutet klare Preise und schnelle Abstimmung zum Aufenthalt.',
        },
      ],
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
      sections: [
        {
          heading: 'Casa vacanze privata e confortevole',
          body: 'Prenoti l intera struttura e gestisci il soggiorno con massima privacy e flessibilita.',
        },
        {
          heading: 'Perfetta per gruppi e famiglie',
          body: 'Spazi e servizi sono pensati per soggiorni di piu giorni con organizzazione semplice.',
        },
        {
          heading: 'Vantaggi della prenotazione diretta',
          body: 'Prezzi chiari, comunicazione rapida e nessuna commissione di intermediazione.',
        },
      ],
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
      sections: [
        {
          heading: 'Jacuzzi i privatnost u srcu Like',
          body: 'Privatni vanjski jacuzzi dostupan je samo gostima vile. To je idealna kombinacija za opustanje tijekom cijele godine.',
        },
        {
          heading: 'Aktivan dan na Plitvicama, opustanje navecer',
          body: 'Plitvicka jezera i okolne staze daju aktivan dio dana, dok vecernji odmor u vili zatvara puni dnevni ritam bez zurbe.',
        },
        {
          heading: 'Sadrzaji koje gosti najcesce traze',
          body: 'Direktni gosti najvise cijene komfor, privatnost i dostupnost booking termina bez posrednika.',
        },
      ],
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
      sections: [
        {
          heading: 'Private jacuzzi and peaceful location',
          body: 'A private outdoor jacuzzi gives your trip an added comfort layer, especially after hiking and sightseeing.',
        },
        {
          heading: 'Balanced schedule: nature and relaxation',
          body: 'Explore Plitvice during the day and unwind in privacy in the evening.',
        },
        {
          heading: 'Amenities that matter most',
          body: 'Guests choosing direct booking value comfort, flexibility, and clear reservation terms.',
        },
      ],
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
      sections: [
        {
          heading: 'Privater Jacuzzi in ruhiger Lage',
          body: 'Nach einem aktiven Tag sorgt der private Jacuzzi fur Entspannung ohne Kompromisse.',
        },
        {
          heading: 'Tagsuber aktiv, abends erholen',
          body: 'Plitvice und Lika bieten viele Naturerlebnisse, die sich ideal mit einem ruhigen Abend in der Villa verbinden lassen.',
        },
        {
          heading: 'Warum Gaste direkt buchen',
          body: 'Transparente Konditionen, direkte Kommunikation und komfortable Ausstattung bieten planbare Vorteile.',
        },
      ],
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
      sections: [
        {
          heading: 'Jacuzzi privato e atmosfera tranquilla',
          body: 'Il jacuzzi privato rende il soggiorno piu rilassante e valorizza ogni giornata trascorsa nella zona di Plitvice.',
        },
        {
          heading: 'Natura di giorno, relax la sera',
          body: 'Visita il parco e i dintorni durante il giorno, poi goditi il comfort della villa nelle ore serali.',
        },
        {
          heading: 'Servizi piu richiesti dai viaggiatori',
          body: 'Prenotazione diretta, privacy e comfort sono tra i motivi principali per scegliere questa struttura.',
        },
      ],
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
      sections: [
        {
          heading: 'Prostor i raspored za vece grupe',
          body: 'Smjestaj je organiziran tako da vise gostiju moze boraviti udobno i funkcionalno, uz dovoljno privatnosti i zajednickog prostora.',
        },
        {
          heading: 'Prakticna lokacija za grupni odmor',
          body: 'Blizina Plitvica i glavnih tocaka u Lici olaksava dnevne planove bez dugih voznji.',
        },
        {
          heading: 'Kako organizirati termin i budzet',
          body: 'Kod grupnih putovanja kljucni su jasni troskovi i rana rezervacija termina. Direktan booking ubrzava dogovor i planiranje.',
        },
      ],
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
      sections: [
        {
          heading: 'Space and layout for group stays',
          body: 'The interior setup supports shared travel while maintaining enough room for comfort and privacy.',
        },
        {
          heading: 'Location benefits for larger groups',
          body: 'Staying near Plitvice helps reduce travel time and keeps day plans manageable for everyone.',
        },
        {
          heading: 'Booking and budget planning tips',
          body: 'Direct booking makes coordination easier, especially when organizing dates and costs for multiple guests.',
        },
      ],
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
      sections: [
        {
          heading: 'Raumaufteilung fur groBere Gruppen',
          body: 'Die Unterkunft bietet eine Struktur, die gemeinsames Reisen angenehm macht und gleichzeitig Erholung ermoglicht.',
        },
        {
          heading: 'Vorteilhafte Lage nahe Plitvice',
          body: 'Kurze Wege zu den wichtigsten Ausflugszielen erleichtern die Tagesplanung fur alle Mitreisenden.',
        },
        {
          heading: 'Tipps fur Buchung und Planung',
          body: 'Fruhzeitig buchen und direkt abstimmen hilft, Termine und Budget effizient zu koordinieren.',
        },
      ],
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
      sections: [
        {
          heading: 'Spazi adatti a gruppi numerosi',
          body: 'La disposizione interna facilita la convivenza del gruppo mantenendo comfort e praticita durante il soggiorno.',
        },
        {
          heading: 'Posizione pratica vicino a Plitvice',
          body: 'Una base vicina permette di organizzare meglio le giornate e ridurre i tempi di spostamento.',
        },
        {
          heading: 'Come pianificare date e budget',
          body: 'Con la prenotazione diretta e piu semplice coordinare costi, disponibilita e dettagli del viaggio.',
        },
      ],
      ctaLabel: 'Invia richiesta e prenota',
      breadcrumbLabel: 'Alloggio per 9 persone vicino a Plitvice',
    },
  },
};

export function getLandingPageContent(
  key: LandingPageKey,
  locale: AppLocale,
): LandingPageContent {
  return LANDING_PAGE_CONTENT[key][locale];
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
