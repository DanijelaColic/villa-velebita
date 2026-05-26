import type { AppLocale } from '@/i18n/routing';
import type { GuideEnrichedFields } from './guide-types';

export type NewGuideContentSlugBatch2 =
  | 'kako-doci-do-plitvickih-jezera-parkiranje'
  | 'vikend-plan-plitvice';

export const NEW_GUIDES_ENRICHED_BATCH_2: Record<
  NewGuideContentSlugBatch2,
  Record<AppLocale, GuideEnrichedFields>
> = {
  'kako-doci-do-plitvickih-jezera-parkiranje': {
    hr: {
      eyebrow: 'Vodič',
      coverImage: {
        src: '/images/seo/guides/ranch_plitvice.jpg',
        alt: 'Cesta i okolica Plitvica — naslovna za vodič o dolasku i parkiranju.',
      },
      activitiesSectionTitle: 'Dolazak i dan u parku — ukratko',
      activities: [
        {
          title: 'Auto iz Zagreba',
          description: 'Najčešća ruta — planiraj 2–2,5 h i raniji polazak.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Ceste i krajolik Like prema Plitvicama.',
        },
        {
          title: 'Zračne luke Zadar / Rijeka',
          description: 'Kraća vožnja ovisno o letu i sezoni.',
          image: '/images/seo/guides/quard_ture.jpg',
          imageAlt: 'Okolica Plitvica — dolazak iz smjera obale.',
        },
        {
          title: 'Parking na ulazu',
          description: 'U sezoni stigni ranije; provjeri službene informacije.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Ulaz i šetnje u NP Plitvička jezera.',
        },
        {
          title: 'Baza u Lici',
          description: 'Kraća jutarnja vožnja iz smještaja prema parku.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Smještaj u Lici kao baza za dnevne izlete.',
        },
      ],
      midCtaTitle: 'Stižete autom — trebate smještaj?',
      midCtaBody:
        'Provjerite lokaciju, dostupnost i rezervirajte direktno prije vikenda ili sezone.',
      midCtaBookingLabel: 'Rezervacija',
      midCtaGalleryLabel: 'Galerija',
      faqSectionTitle: 'Česta pitanja',
      faqs: [
        {
          question: 'Je li auto nužan?',
          answer:
            'Za većinu gostiju da — park i okolica su praktičnije vlastitim prijevozom.',
        },
        {
          question: 'Koliko traje vožnja iz Zagreba?',
          answer:
            'Obično oko 2 do 2,5 sata, ovisno o polasku i gužvama.',
        },
        {
          question: 'Gdje parkirati?',
          answer:
            'Kod ulaza u park postoje parkirališta — u sezoni dolazi ranije.',
        },
        {
          question: 'Koji ulaz odabrati?',
          answer:
            'Ovisi o ruti i smjeru dolaska — provjeri službene informacije parka.',
        },
        {
          question: 'Ima li smisla noćiti u Lici?',
          answer:
            'Da — kraća vožnja ujutro i mirniji povratak nakon šetnje.',
        },
      ],
      relatedLandingsTitle: 'Povezane stranice za rezervaciju',
      relatedLandingsIntro:
        'Odaberite smještaj koji odgovara vašem planu dolaska autom.',
    },
    en: {
      eyebrow: 'Guide',
      coverImage: {
        src: '/images/seo/guides/ranch_plitvice.jpg',
        alt: 'Road and scenery near Plitvice — cover for getting there and parking.',
      },
      activitiesSectionTitle: 'Arrival and park day — at a glance',
      activities: [
        {
          title: 'Car from Zagreb',
          description: 'Common route — plan 2–2.5 h and an early departure.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Roads and Lika scenery toward Plitvice.',
        },
        {
          title: 'Zadar / Rijeka airports',
          description: 'Often shorter drive depending on flight and season.',
          image: '/images/seo/guides/quard_ture.jpg',
          imageAlt: 'Plitvice area — arrival from the coast direction.',
        },
        {
          title: 'Entrance parking',
          description: 'Arrive early in season; check official park info.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvice Lakes National Park entrance and trails.',
        },
        {
          title: 'Base in Lika',
          description: 'Shorter morning drive from your stay to the gate.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Stay in Lika as a base for daily trips.',
        },
      ],
      midCtaTitle: 'Driving in—need a place to stay?',
      midCtaBody:
        'Check location, availability, and book directly before weekends or peak season.',
      midCtaBookingLabel: 'Booking',
      midCtaGalleryLabel: 'Gallery',
      faqSectionTitle: 'Frequently asked questions',
      faqs: [
        {
          question: 'Do I need a car?',
          answer:
            'For most guests, yes—the park and surrounding area are much easier by car.',
        },
        {
          question: 'How long from Zagreb?',
          answer: 'Usually about 2 to 2.5 hours depending on departure and traffic.',
        },
        {
          question: 'Where to park?',
          answer:
            'Car parks near park entrances—in season, arrive early.',
        },
        {
          question: 'Which entrance should I use?',
          answer:
            'Depends on your route and plan—check official park guidance.',
        },
        {
          question: 'Is staying in Lika worth it?',
          answer:
            'Yes—shorter morning drive and a calmer return after walking.',
        },
      ],
      relatedLandingsTitle: 'Related pages for booking',
      relatedLandingsIntro:
        'Choose accommodation that fits your driving itinerary.',
    },
    de: {
      eyebrow: 'Reiseführer',
      coverImage: {
        src: '/images/seo/guides/ranch_plitvice.jpg',
        alt: 'Straße und Umgebung nahe Plitvice — Titelbild Anreise und Parken.',
      },
      activitiesSectionTitle: 'Anreise und Parktag — kurz',
      activities: [
        {
          title: 'Auto ab Zagreb',
          description: 'Häufige Route — 2–2,5 h einplanen, früh losfahren.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Straßen und Landschaft in der Lika Richtung Plitvice.',
        },
        {
          title: 'Flughäfen Zadar / Rijeka',
          description: 'Oft kürzere Fahrt je nach Flug und Saison.',
          image: '/images/seo/guides/quard_ture.jpg',
          imageAlt: 'Region Plitvice — Anreise von der Küste.',
        },
        {
          title: 'Parken am Eingang',
          description: 'In der Saison früh da; offizielle Infos prüfen.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Eingang und Wege im Nationalpark Plitvicer Seen.',
        },
        {
          title: 'Basis in der Lika',
          description: 'Kürzere Morgenfahrt von der Unterkunft zum Park.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Unterkunft in der Lika als Ausflugsbasis.',
        },
      ],
      midCtaTitle: 'Mit dem Auto unterwegs—Unterkunft gesucht?',
      midCtaBody:
        'Lage und Verfügbarkeit prüfen und vor Wochenende oder Hochsaison direkt buchen.',
      midCtaBookingLabel: 'Buchung',
      midCtaGalleryLabel: 'Galerie',
      faqSectionTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Brauche ich ein Auto?',
          answer:
            'Für die meisten Gäste ja—Park und Umgebung sind mit Auto deutlich einfacher.',
        },
        {
          question: 'Wie lange ab Zagreb?',
          answer: 'Meist etwa 2 bis 2,5 Stunden, je nach Abfahrt und Verkehr.',
        },
        {
          question: 'Wo parken?',
          answer:
            'Parkplätze an den Eingängen—in der Saison früh anreisen.',
        },
        {
          question: 'Welcher Eingang?',
          answer:
            'Hängt von Route und Plan ab—offizielle Park-Infos prüfen.',
        },
        {
          question: 'Lohnt Übernachtung in der Lika?',
          answer:
            'Ja—kürzere Morgenfahrt und entspanntere Rückkehr nach der Wanderung.',
        },
      ],
      relatedLandingsTitle: 'Verwandte Seiten zur Buchung',
      relatedLandingsIntro:
        'Unterkunft passend zu Ihrer Anreise mit dem Auto wählen.',
    },
    it: {
      eyebrow: 'Guida',
      coverImage: {
        src: '/images/seo/guides/ranch_plitvice.jpg',
        alt: 'Strada e paesaggio vicino a Plitvice — copertina arrivo e parcheggio.',
      },
      activitiesSectionTitle: 'Arrivo e giornata al parco — in breve',
      activities: [
        {
          title: 'Auto da Zagabria',
          description: 'Percorso frequente — 2–2,5 h, partenza anticipata.',
          image: '/images/seo/guides/lika.jpg',
          imageAlt: 'Strade e paesaggio in Lika verso Plitvice.',
        },
        {
          title: 'Aeroporti Zara / Rijeka',
          description: 'Spesso tragitto più breve a seconda del volo.',
          image: '/images/seo/guides/quard_ture.jpg',
          imageAlt: 'Area Plitvice — arrivo dalla costa.',
        },
        {
          title: 'Parcheggio ingresso',
          description: 'In stagione arrivare presto; info ufficiali del parco.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Ingresso e sentieri al Parco dei Laghi di Plitvice.',
        },
        {
          title: 'Base in Lika',
          description: 'Tragitto mattutino più corto dall’alloggio.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Alloggio in Lika come base per le gite.',
        },
      ],
      midCtaTitle: 'Arrivate in auto—serve alloggio?',
      midCtaBody:
        'Controllate posizione e disponibilità e prenotate direttamente prima del weekend o dell’alta stagione.',
      midCtaBookingLabel: 'Prenotazione',
      midCtaGalleryLabel: 'Galleria',
      faqSectionTitle: 'Domande frequenti',
      faqs: [
        {
          question: 'Serve l’auto?',
          answer:
            'Per la maggior parte degli ospiti sì—parco e dintorni sono più semplici in auto.',
        },
        {
          question: 'Quanto da Zagabria?',
          answer: 'Di solito circa 2–2,5 ore, in base a partenza e traffico.',
        },
        {
          question: 'Dove parcheggiare?',
          answer:
            'Parcheggi vicino agli ingressi—in stagione arrivare presto.',
        },
        {
          question: 'Quale ingresso?',
          answer:
            'Dipende da percorso e piano—verificate le info ufficiali del parco.',
        },
        {
          question: 'Conviene dormire in Lika?',
          answer:
            'Sì—tragitto mattutino più corto e rientro più tranquillo dopo le passeggiate.',
        },
      ],
      relatedLandingsTitle: 'Pagine collegate per la prenotazione',
      relatedLandingsIntro:
        'Scegliete l’alloggio adatto al vostro itinerario in auto.',
    },
  },
  'vikend-plan-plitvice': {
    hr: {
      eyebrow: 'Vodič',
      coverImage: {
        src: '/images/seo/guides/family_walking.jpg',
        alt: 'Obitelj u prirodi — naslovna za vikend plan na Plitvicama.',
      },
      activitiesSectionTitle: 'Vikend u tri koraka',
      activities: [
        {
          title: 'Petak — dolazak',
          description: 'Odmor i priprema za raniji start.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Odmor u smještaju nakon dolaska.',
        },
        {
          title: 'Subota — park',
          description: 'Glavni dan — ulaz ujutro.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvička jezera — subotnji obilazak.',
        },
        {
          title: 'Nedjelja — lagano',
          description: 'Kraći izlet ili polazak bez žurbe.',
          image: '/images/seo/guides/mill_rastoke.jpg',
          imageAlt: 'Rastoke — lagan završetak vikenda.',
        },
        {
          title: 'Rezervacija termina',
          description: 'Direktna rezervacija za sljedeći vikend.',
          image: '/images/seo/guides/jacuzzi.png',
          imageAlt: 'Jacuzzi u vili — opušten završetak vikenda.',
        },
      ],
      midCtaTitle: 'Spremni rezervirati vikend uz Plitvice?',
      midCtaBody:
        'Provjerite dostupnost za petak–nedjelju i rezervirajte direktno — bez posrednika.',
      midCtaBookingLabel: 'Rezerviraj vikend',
      midCtaGalleryLabel: 'Galerija',
      faqSectionTitle: 'Česta pitanja',
      faqs: [
        {
          question: 'Je li vikend dovoljan za Plitvice?',
          answer:
            'Da za jedan ozbiljan dan u parku; za opuštenije iskustvo 2 noći su idealne.',
        },
        {
          question: 'Kada rezervirati smještaj?',
          answer:
            'Što ranije za ljetne vikende i praznike — kapacitet se brzo popuni.',
        },
        {
          question: 'Što ako stignem tek navečer u petak?',
          answer:
            'I dalje ima smisla — subota ujutro ostaje glavni dan za park.',
        },
        {
          question: 'Treba li jacuzzi nakon šetnje?',
          answer:
            'Mnogim gostima pomaže — pogledaj tematsku stranicu villa s jacuzzijem.',
        },
        {
          question: 'Gdje kupiti ulaznice?',
          answer:
            'Online preko službenih kanala parka — vodič o ulaznicama ima detalje.',
        },
      ],
      relatedLandingsTitle: 'Povezane stranice za rezervaciju',
      relatedLandingsIntro:
        'Odaberite smještaj za vikend boravak blizu Plitvica.',
    },
    en: {
      eyebrow: 'Guide',
      coverImage: {
        src: '/images/seo/guides/family_walking.jpg',
        alt: 'Family in nature — cover image for a Plitvice weekend plan.',
      },
      activitiesSectionTitle: 'Weekend in three steps',
      activities: [
        {
          title: 'Friday — arrival',
          description: 'Rest and prep for an early start.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Relaxing at your stay after arrival.',
        },
        {
          title: 'Saturday — park',
          description: 'Main day — morning entry.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvice Lakes — Saturday visit.',
        },
        {
          title: 'Sunday — easy finish',
          description: 'Short outing or calm departure.',
          image: '/images/seo/guides/mill_rastoke.jpg',
          imageAlt: 'Rastoke — a light end to the weekend.',
        },
        {
          title: 'Book your dates',
          description: 'Direct booking for your next weekend.',
          image: '/images/seo/guides/jacuzzi.png',
          imageAlt: 'Villa jacuzzi — relaxed weekend wrap-up.',
        },
      ],
      midCtaTitle: 'Ready to book your Plitvice weekend?',
      midCtaBody:
        'Check Friday–Sunday availability and book directly—no middlemen.',
      midCtaBookingLabel: 'Book weekend',
      midCtaGalleryLabel: 'Gallery',
      faqSectionTitle: 'Frequently asked questions',
      faqs: [
        {
          question: 'Is a weekend enough for Plitvice?',
          answer:
            'Yes for one solid park day; two nights feel more relaxed.',
        },
        {
          question: 'When should I book accommodation?',
          answer:
            'As early as possible for summer weekends and holidays—availability fills up quickly.',
        },
        {
          question: 'What if I arrive Friday evening only?',
          answer:
            'Still works—Saturday morning remains your main park day.',
        },
        {
          question: 'Is a jacuzzi worth it after hiking?',
          answer:
            'Many guests love it—see our villa with jacuzzi page.',
        },
        {
          question: 'Where to buy tickets?',
          answer:
            'Online via official park channels—see our tickets guide.',
        },
      ],
      relatedLandingsTitle: 'Related pages for booking',
      relatedLandingsIntro:
        'Pick accommodation for a weekend stay near Plitvice.',
    },
    de: {
      eyebrow: 'Reiseführer',
      coverImage: {
        src: '/images/seo/guides/family_walking.jpg',
        alt: 'Familie in der Natur — Titelbild Wochenendplan Plitvice.',
      },
      activitiesSectionTitle: 'Wochenende in drei Schritten',
      activities: [
        {
          title: 'Freitag — Anreise',
          description: 'Ruhe und Vorbereitung auf frühen Start.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Erholung in der Unterkunft nach Ankunft.',
        },
        {
          title: 'Samstag — Park',
          description: 'Haupttag — morgendlicher Eintritt.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Plitvicer Seen — Samstagsbesuch.',
        },
        {
          title: 'Sonntag — leicht',
          description: 'Kurzer Ausflug oder entspannte Abfahrt.',
          image: '/images/seo/guides/mill_rastoke.jpg',
          imageAlt: 'Rastoke — sanfter Wochenendabschluss.',
        },
        {
          title: 'Termin buchen',
          description: 'Direktbuchung für das nächste Wochenende.',
          image: '/images/seo/guides/jacuzzi.png',
          imageAlt: 'Villa-Jacuzzi — entspannter Wochenendausklang.',
        },
      ],
      midCtaTitle: 'Wochenende an den Plitvicer Seen buchen?',
      midCtaBody:
        'Verfügbarkeit Freitag–Sonntag prüfen und direkt buchen—ohne Vermittler.',
      midCtaBookingLabel: 'Wochenende buchen',
      midCtaGalleryLabel: 'Galerie',
      faqSectionTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          question: 'Reicht ein Wochenende?',
          answer:
            'Ja für einen vollen Parktag; zwei Nächte sind entspannter.',
        },
        {
          question: 'Wann Unterkunft buchen?',
          answer:
            'So früh wie möglich für Sommerwochenenden und Feiertage—die Verfügbarkeit ist schnell ausgebucht.',
        },
        {
          question: 'Ankunft erst Freitagabend?',
          answer:
            'Geht trotzdem—Samstagvormittag bleibt der Haupttag.',
        },
        {
          question: 'Lohnt sich Jacuzzi nach der Wanderung?',
          answer:
            'Für viele Gäste ja—siehe Villa-mit-Jacuzzi-Seite.',
        },
        {
          question: 'Wo Tickets kaufen?',
          answer:
            'Online über offizielle Parkkanäle—siehe Ticket-Guide.',
        },
      ],
      relatedLandingsTitle: 'Verwandte Seiten zur Buchung',
      relatedLandingsIntro:
        'Unterkunft für ein Wochenende nahe Plitvice wählen.',
    },
    it: {
      eyebrow: 'Guida',
      coverImage: {
        src: '/images/seo/guides/family_walking.jpg',
        alt: 'Famiglia nella natura — copertina piano weekend a Plitvice.',
      },
      activitiesSectionTitle: 'Weekend in tre passi',
      activities: [
        {
          title: 'Venerdì — arrivo',
          description: 'Riposo e preparazione per uscita mattutina.',
          image: '/images/seo/guides/odmor_u_kuci.png',
          imageAlt: 'Relax in alloggio dopo l’arrivo.',
        },
        {
          title: 'Sabato — parco',
          description: 'Giornata principale — ingresso al mattino.',
          image: '/images/seo/guides/plitvice.jpg',
          imageAlt: 'Laghi di Plitvice — visita di sabato.',
        },
        {
          title: 'Domenica — leggero',
          description: 'Breve gita o partenza tranquilla.',
          image: '/images/seo/guides/mill_rastoke.jpg',
          imageAlt: 'Rastoke — chiusura dolce del weekend.',
        },
        {
          title: 'Prenota le date',
          description: 'Prenotazione diretta per il prossimo weekend.',
          image: '/images/seo/guides/jacuzzi.png',
          imageAlt: 'Jacuzzi in villa — fine weekend rilassato.',
        },
      ],
      midCtaTitle: 'Pronti a prenotare il weekend a Plitvice?',
      midCtaBody:
        'Controllate disponibilità venerdì–domenica e prenotate direttamente—senza intermediari.',
      midCtaBookingLabel: 'Prenota weekend',
      midCtaGalleryLabel: 'Galleria',
      faqSectionTitle: 'Domande frequenti',
      faqs: [
        {
          question: 'Basta un weekend?',
          answer:
            'Sì per una giornata piena al parco; due notti sono più rilassanti.',
        },
        {
          question: 'Quando prenotare l’alloggio?',
          answer:
            'Il prima possibile per weekend estivi e festivi—la disponibilità si esaurisce rapidamente.',
        },
        {
          question: 'Arrivo solo venerdì sera?',
          answer:
            'Va bene—il sabato mattina resta il giorno principale.',
        },
        {
          question: 'Jacuzzi dopo le passeggiate?',
          answer:
            'Per molti ospiti sì—vedi la pagina villa con jacuzzi.',
        },
        {
          question: 'Dove acquistare i biglietti?',
          answer:
            'Online sui canali ufficiali—vedi la guida ai biglietti.',
        },
      ],
      relatedLandingsTitle: 'Pagine collegate per la prenotazione',
      relatedLandingsIntro:
        'Scegliete l’alloggio per un weekend vicino a Plitvice.',
    },
  },
};
