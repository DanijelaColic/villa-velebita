import type { AppLocale } from '@/i18n/routing';
import type { GuideEnrichedFields } from './guide-types';

export type NewGuideContentSlug =
  | 'kada-posjetiti-plitvicka-jezera'
  | 'ulaznice-plitvicka-jezera-cijene';

export const NEW_GUIDES_ENRICHED: Record<
  NewGuideContentSlug,
  Record<AppLocale, GuideEnrichedFields>
> = {
  'kada-posjetiti-plitvicka-jezera': {
    hr: {
      eyebrow: 'Vodič',
      coverImage: {
        src: '/images/seo/guides/plitvicka_jezera.png',
        alt: 'Plitvička jezera u sezoni — naslovna za vodič kada posjetiti park.',
      },
      activitiesSectionTitle: 'Sezona i tempo posjeta u praksi',
      activities: [
        {
          title: 'Proljeće i jesen',
          description: 'Ugodnije temperature i često manji pritisak gužve.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Pejzaž Like — proljeće i jesen oko Plitvica.',
        },
        {
          title: 'Ljeto — raniji start',
          description: 'Najpopularnije razdoblje; ulaz ujutro je ključan.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvička jezera ljeti — glavna sezona posjeta.',
        },
        {
          title: 'Vikend vs radni dan',
          description: 'Radni dan ujutro često je mirniji izbor.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Panoramski vlak u parku — gužve i tempo obilaska.',
        },
        {
          title: 'Odmor nakon dana u parku',
          description: 'Smještaj u Lici skraćuje vožnju i olakšava raniji izlazak.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Večernji odmor uz smještaj nakon dana na Plitvicama.',
        },
      ],
      midCtaTitle: 'Planirate posjet u sezoni gužve?',
      midCtaBody:
        'Rezervirajte smještaj unaprijed i uskladite termine s ranijim ulaskom u park.',
      midCtaBookingLabel: 'Rezervacija',
      midCtaGalleryLabel: 'Galerija',
      faqSectionTitle: 'Česta pitanja',
      faqs: [
        {
          question: 'Koji je najbolji mjesec za Plitvice?',
          answer:
            'Za manje gužve često su proljeće i rana jesen; ljeto je najpopularnije uz raniji dolazak.',
        },
        {
          question: 'Jesu li vikendi puno gužvastiji?',
          answer:
            'U ljetnoj sezoni obično jesu — radni dan ujutro je često bolji izbor.',
        },
        {
          question: 'Što ako pada kiša?',
          answer:
            'Park je posjetiv uz odgovarajuću obuću; provjerite prognozu i rad parka.',
        },
        {
          question: 'Gdje odsjesti za raniji start?',
          answer:
            'Smještaj u Lici blizu Plitvica skraćuje jutarnju vožnju prema ulazu.',
        },
        {
          question: 'Koliko dana planirati uz sezonu?',
          answer:
            'Za dublji doživljaj često su bolja 2–3 dana — pogledajte povezani vodič o duljini boravka.',
        },
      ],
      relatedLandingsTitle: 'Povezane stranice za rezervaciju',
      relatedLandingsIntro:
        'Odaberite smještaj koji odgovara vašem planu oko Plitvica.',
    },
    en: {
      eyebrow: 'Guide',
      coverImage: {
        src: '/images/seo/guides/plitvicka_jezera.png',
        alt: 'Plitvice Lakes in season — cover image for when to visit the park.',
      },
      activitiesSectionTitle: 'Season and visit pace in practice',
      activities: [
        {
          title: 'Spring and autumn',
          description: 'Pleasant temperatures and often lighter crowds.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Lika landscape — spring and autumn around Plitvice.',
        },
        {
          title: 'Summer — early start',
          description: 'Peak popularity; morning entry matters most.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvice Lakes in summer — main visitor season.',
        },
        {
          title: 'Weekend vs weekday',
          description: 'Weekday mornings are often calmer.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Panoramic train in the park — crowds and visit pace.',
        },
        {
          title: 'Rest after a park day',
          description: 'Staying in Lika shortens drives and helps early starts.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Evening rest at your stay after a day at Plitvice.',
        },
      ],
      midCtaTitle: 'Visiting during peak season?',
      midCtaBody:
        'Book accommodation early and align your dates with an early park entry.',
      midCtaBookingLabel: 'Booking',
      midCtaGalleryLabel: 'Gallery',
      faqSectionTitle: 'Frequently asked questions',
      faqs: [
        {
          question: 'What is the best month for Plitvice?',
          answer:
            'For fewer crowds, spring and early autumn are strong; summer is busiest—arrive early.',
        },
        {
          question: 'Are weekends much busier?',
          answer:
            'In summer they usually are—a weekday morning is often better.',
        },
        {
          question: 'What if it rains?',
          answer:
            'The park is still visitable with proper footwear; check forecast and park status.',
        },
        {
          question: 'Where to stay for an early start?',
          answer:
            'Accommodation in Lika near Plitvice shortens the morning drive to the entrance.',
        },
        {
          question: 'How many days to plan for the season?',
          answer:
            'For a deeper visit, 2–3 days often work best—see our guide on stay length.',
        },
      ],
      relatedLandingsTitle: 'Related pages for booking',
      relatedLandingsIntro:
        'Choose accommodation that matches your plan around Plitvice.',
    },
    de: {
      eyebrow: 'Reiseführer',
      coverImage: {
        src: '/images/seo/guides/plitvicka_jezera.png',
        alt: 'Plitvicer Seen in der Saison — Titelbild zum besten Besuchszeitpunkt.',
      },
      activitiesSectionTitle: 'Saison und Besuchstempo in der Praxis',
      activities: [
        {
          title: 'Frühling und Herbst',
          description: 'Angenehme Temperaturen, oft weniger Andrang.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Landschaft in der Lika — Frühling und Herbst nahe Plitvice.',
        },
        {
          title: 'Sommer — früh starten',
          description: 'Hochsaison; morgendlicher Eintritt ist entscheidend.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvicer Seen im Sommer — Hauptsaison.',
        },
        {
          title: 'Wochenende vs Werktag',
          description: 'Werktags vormittags oft ruhiger.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Panoramazug im Park — Andrang und Tempo.',
        },
        {
          title: 'Ruhe nach dem Parktag',
          description: 'Unterkunft in der Lika verkürzt Fahrten und erleichtert frühe Starts.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Abendruhe in der Unterkunft nach einem Parktag.',
        },
      ],
      midCtaTitle: 'Besuch in der Hochsaison?',
      midCtaBody:
        'Unterkunft früh buchen und Termine mit morgendlichem Parkeintritt abstimmen.',
      midCtaBookingLabel: 'Buchung',
      midCtaGalleryLabel: 'Galerie',
      faqSectionTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Welcher Monat ist am besten?',
          answer:
            'Weniger Andrang oft im Frühling und frühen Herbst; Sommer ist am beliebtesten—früh anreisen.',
        },
        {
          question: 'Sind Wochenenden viel voller?',
          answer:
            'Im Sommer meist ja—Werktag vormittags ist oft besser.',
        },
        {
          question: 'Was bei Regen?',
          answer:
            'Mit passenden Schuhen machbar—Wetter und Parkstatus prüfen.',
        },
        {
          question: 'Wo übernachten für frühen Start?',
          answer:
            'Unterkunft in der Lika nahe Plitvice verkürzt die Morgenfahrt.',
        },
        {
          question: 'Wie viele Tage zur Saison?',
          answer:
            'Für mehr Tiefe oft 2–3 Tage—siehe Guide zur Aufenthaltsdauer.',
        },
      ],
      relatedLandingsTitle: 'Verwandte Seiten zur Buchung',
      relatedLandingsIntro:
        'Unterkunft wählen, die zu Ihrem Plan rund um Plitvice passt.',
    },
    it: {
      eyebrow: 'Guida',
      coverImage: {
        src: '/images/seo/guides/plitvicka_jezera.png',
        alt: 'Laghi di Plitvice in stagione — copertina per quando visitare il parco.',
      },
      activitiesSectionTitle: 'Stagione e ritmo di visita',
      activities: [
        {
          title: 'Primavera e autunno',
          description: 'Temperature piacevoli e spesso meno affluenza.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Paesaggio della Lika — primavera e autunno vicino a Plitvice.',
        },
        {
          title: 'Estate — inizio presto',
          description: 'Picco di richiesta; ingresso mattutino fondamentale.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Laghi di Plitvice in estate — alta stagione.',
        },
        {
          title: 'Weekend vs feriale',
          description: 'Il mattino feriale è spesso più tranquillo.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Treno panoramico — affluenza e ritmo di visita.',
        },
        {
          title: 'Riposo dopo il parco',
          description: 'Alloggio in Lika accorcia i tragitti e aiuta le partenze mattutine.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Riposo serale dopo una giornata a Plitvice.',
        },
      ],
      midCtaTitle: 'Visita in alta stagione?',
      midCtaBody:
        'Prenotate l’alloggio in anticipo e allineate le date a un ingresso mattutino.',
      midCtaBookingLabel: 'Prenotazione',
      midCtaGalleryLabel: 'Galleria',
      faqSectionTitle: 'Domande frequenti',
      faqs: [
        {
          question: 'Qual è il mese migliore?',
          answer:
            'Meno affluenza spesso in primavera e inizio autunno; l’estate è la più richiesta—arrivo presto.',
        },
        {
          question: 'I weekend sono molto più affollati?',
          answer:
            'In estate di solito sì—mattina feriale spesso migliore.',
        },
        {
          question: 'E se piove?',
          answer:
            'Visitabile con scarpe adatte—controllate meteo e stato del parco.',
        },
        {
          question: 'Dove dormire per partenza presto?',
          answer:
            'Alloggio in Lika vicino a Plitvice accorcia il tragitto mattutino.',
        },
        {
          question: 'Quanti giorni in base alla stagione?',
          answer:
            'Per un’esperienza più profonda spesso 2–3 giorni—vedi la guida sulla durata.',
        },
      ],
      relatedLandingsTitle: 'Pagine collegate per la prenotazione',
      relatedLandingsIntro:
        'Scegliete l’alloggio in linea con il vostro piano intorno a Plitvice.',
    },
  },
  'ulaznice-plitvicka-jezera-cijene': {
    hr: {
      eyebrow: 'Vodič',
      coverImage: {
        src: '/images/seo/guides/obilazak_brodom.jpg',
        alt: 'Obilazak Plitvica — naslovna za vodič o ulaznicama i cijenama.',
      },
      activitiesSectionTitle: 'Prije kupnje ulaznice',
      activities: [
        {
          title: 'Službeni cjenik',
          description: 'Provjerite sezonu i kategoriju na np-plitvicka-jezera.hr.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvička jezera — ulaz u nacionalni park.',
        },
        {
          title: 'Online termin',
          description: 'U sezoni rezervirajte datum i vrijeme unaprijed.',
          image: '/images/seo/guides/voznja_brodom_na_plitvicama.jpg',
          imageAlt: 'Vožnja brodom na Plitvicama — planiranje posjeta.',
        },
        {
          title: 'Ulaz 1 ili 2',
          description: 'Odaberite ulaz prema smjeru dolaska i ruti.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Kretanje kroz park — izbor ulaza i rute.',
        },
        {
          title: 'Smještaj + ulaznica',
          description: 'Uskladite vožnju iz Like s rezerviranim terminom.',
          image: '/images/seo/guides/ranch_plitvice.jpg',
          imageAlt: 'Okolica parka — logistika dolaska iz smještaja.',
        },
      ],
      midCtaTitle: 'Kupili ste ulaznice — trebate i smještaj?',
      midCtaBody:
        'Provjerite dostupnost termina kod nas i rezervirajte direktno uz posjet parku.',
      midCtaBookingLabel: 'Rezervacija',
      midCtaGalleryLabel: 'Galerija',
      faqSectionTitle: 'Česta pitanja',
      faqs: [
        {
          question: 'Gdje kupiti ulaznice?',
          answer:
            'Preko službene web stranice i prodajnih kanala NP Plitvička jezera — izbjegavajte neovlaštene preprodavače.',
        },
        {
          question: 'Mijenja li se cijena tijekom godine?',
          answer:
            'Da — park koristi sezonski cjenik; provjerite aktualne cijene prije puta.',
        },
        {
          question: 'Treba li rezervirati termin?',
          answer:
            'U sezoni je preporučljivo radi planiranja i manjeg čekanja na ulazu.',
        },
        {
          question: 'Postoje li popusti za djecu?',
          answer:
            'Da, prema pravilima parka — provjerite uvjete na službenom cjeniku za dob i kategoriju.',
        },
        {
          question: 'Što ako kasnim na termin?',
          answer:
            'Pravila ovise o parku — dolazak ranije i kontakt sa službom parka ako kasnite.',
        },
      ],
      relatedLandingsTitle: 'Povezane stranice za rezervaciju',
      relatedLandingsIntro:
        'Smještaj blizu parka olakšava dolazak na rezervirani termin.',
    },
    en: {
      eyebrow: 'Guide',
      coverImage: {
        src: '/images/seo/guides/obilazak_brodom.jpg',
        alt: 'Visiting Plitvice by boat — cover for tickets and prices guide.',
      },
      activitiesSectionTitle: 'Before you buy tickets',
      activities: [
        {
          title: 'Official price list',
          description: 'Check season and category at np-plitvicka-jezera.hr.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvice Lakes — national park entrance.',
        },
        {
          title: 'Online time slot',
          description: 'In season, book date and time in advance.',
          image: '/images/seo/guides/voznja_brodom_na_plitvicama.jpg',
          imageAlt: 'Boat ride at Plitvice — planning your visit.',
        },
        {
          title: 'Entrance 1 or 2',
          description: 'Pick the entrance that matches your route.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Moving through the park — entrance and route choice.',
        },
        {
          title: 'Stay + ticket',
          description: 'Align your drive from Lika with your booked slot.',
          image: '/images/seo/guides/ranch_plitvice.jpg',
          imageAlt: 'Area near the park — arrival logistics from your stay.',
        },
      ],
      midCtaTitle: 'Tickets booked—need accommodation too?',
      midCtaBody:
        'Check our availability and book directly for your park visit dates.',
      midCtaBookingLabel: 'Booking',
      midCtaGalleryLabel: 'Gallery',
      faqSectionTitle: 'Frequently asked questions',
      faqs: [
        {
          question: 'Where should I buy tickets?',
          answer:
            'Through the official Plitvice Lakes National Park website and channels—avoid unauthorized resellers.',
        },
        {
          question: 'Do prices change during the year?',
          answer:
            'Yes—the park uses seasonal pricing; check current rates before you travel.',
        },
        {
          question: 'Do I need a time slot?',
          answer:
            'In season it is recommended for planning and shorter waits at the gate.',
        },
        {
          question: 'Are there child discounts?',
          answer:
            'Yes, under park rules—check the official price list for age categories.',
        },
        {
          question: 'What if I am late for my slot?',
          answer:
            'Rules depend on the park—arrive early and contact park staff if you are delayed.',
        },
      ],
      relatedLandingsTitle: 'Related pages for booking',
      relatedLandingsIntro:
        'Staying near the park makes it easier to reach your booked entry time.',
    },
    de: {
      eyebrow: 'Reiseführer',
      coverImage: {
        src: '/images/seo/guides/obilazak_brodom.jpg',
        alt: 'Bootsfahrt an den Plitvicer Seen — Titelbild zu Eintritt und Preisen.',
      },
      activitiesSectionTitle: 'Vor dem Ticketkauf',
      activities: [
        {
          title: 'Offizielle Preisliste',
          description: 'Saison und Kategorie auf np-plitvicka-jezera.hr prüfen.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvicer Seen — Eingang zum Nationalpark.',
        },
        {
          title: 'Online-Zeitfenster',
          description: 'In der Saison Datum und Uhrzeit vorab buchen.',
          image: '/images/seo/guides/voznja_brodom_na_plitvicama.jpg',
          imageAlt: 'Bootsfahrt — Besuch planen.',
        },
        {
          title: 'Eingang 1 oder 2',
          description: 'Eingang passend zur Anreise und Route wählen.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Bewegung im Park — Eingang und Route.',
        },
        {
          title: 'Unterkunft + Ticket',
          description: 'Fahrt aus der Lika mit gebuchtem Slot abstimmen.',
          image: '/images/seo/guides/ranch_plitvice.jpg',
          imageAlt: 'Umgebung des Parks — Anreise von der Unterkunft.',
        },
      ],
      midCtaTitle: 'Tickets gebucht—noch eine Unterkunft?',
      midCtaBody:
        'Verfügbarkeit bei uns prüfen und direkt für Ihre Parktage buchen.',
      midCtaBookingLabel: 'Buchung',
      midCtaGalleryLabel: 'Galerie',
      faqSectionTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Wo Tickets kaufen?',
          answer:
            'Über die offizielle Website und Kanäle des Parks—keine unautorisierten Wiederverkäufer.',
        },
        {
          question: 'Ändern sich die Preise im Jahr?',
          answer:
            'Ja—Saisonpreise; aktuelle Tarife vor der Reise prüfen.',
        },
        {
          question: 'Zeitfenster nötig?',
          answer:
            'In der Saison empfohlen für Planung und kürzeres Warten.',
        },
        {
          question: 'Ermäßigung für Kinder?',
          answer:
            'Ja, nach Parkregeln—offizielle Preisliste für Alterskategorien.',
        },
        {
          question: 'Was bei Verspätung?',
          answer:
            'Regeln je nach Park—früh anreisen und Park kontaktieren bei Verzug.',
        },
      ],
      relatedLandingsTitle: 'Verwandte Seiten zur Buchung',
      relatedLandingsIntro:
        'Nahe gelegene Unterkunft erleichtert die Einhaltung des gebuchten Termins.',
    },
    it: {
      eyebrow: 'Guida',
      coverImage: {
        src: '/images/seo/guides/obilazak_brodom.jpg',
        alt: 'Visita a Plitvice in barca — copertina per biglietti e prezzi.',
      },
      activitiesSectionTitle: 'Prima di acquistare il biglietto',
      activities: [
        {
          title: 'Listino ufficiale',
          description: 'Controllate stagione e categoria su np-plitvicka-jezera.hr.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Laghi di Plitvice — ingresso al parco nazionale.',
        },
        {
          title: 'Fascia oraria online',
          description: 'In stagione prenotate data e ora in anticipo.',
          image: '/images/seo/guides/voznja_brodom_na_plitvicama.jpg',
          imageAlt: 'Gita in barca — pianificare la visita.',
        },
        {
          title: 'Ingresso 1 o 2',
          description: 'Scegliete l’ingresso in base al percorso.',
          image: '/images/seo/guides/panoramski_vlak.jpg',
          imageAlt: 'Percorso nel parco — scelta ingresso e rotta.',
        },
        {
          title: 'Alloggio + biglietto',
          description: 'Allineate il tragitto dalla Lika allo slot prenotato.',
          image: '/images/seo/guides/ranch_plitvice.jpg',
          imageAlt: 'Zona del parco — logistica dall’alloggio.',
        },
      ],
      midCtaTitle: 'Biglietti pronti—serve anche l’alloggio?',
      midCtaBody:
        'Controllate la nostra disponibilità e prenotate direttamente per le date della visita.',
      midCtaBookingLabel: 'Prenotazione',
      midCtaGalleryLabel: 'Galleria',
      faqSectionTitle: 'Domande frequenti',
      faqs: [
        {
          question: 'Dove acquistare i biglietti?',
          answer:
            'Solo tramite sito e canali ufficiali del parco—evitate rivenditori non autorizzati.',
        },
        {
          question: 'Il prezzo cambia durante l’anno?',
          answer:
            'Sì—tariffe stagionali; verificate i prezzi attuali prima del viaggio.',
        },
        {
          question: 'Serve la fascia oraria?',
          answer:
            'In stagione è consigliata per pianificare e ridurre l’attesa.',
        },
        {
          question: 'Sconti per bambini?',
          answer:
            'Sì, secondo le regole del parco—listino ufficiale per le fasce d’età.',
        },
        {
          question: 'Se arrivo in ritardo?',
          answer:
            'Dipende dal parco—arrivo anticipato e contatto con il personale in caso di ritardo.',
        },
      ],
      relatedLandingsTitle: 'Pagine collegate per la prenotazione',
      relatedLandingsIntro:
        'Un alloggio vicino al parco facilita il rispetto dell’orario prenotato.',
    },
  },
};
