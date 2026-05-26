import type { GuideArticle } from './guide-types';

/** Vodiči: dolazak/parking + vikend plan (dodaju se u GUIDES). */
export const NEW_GUIDES_BATCH_2: GuideArticle[] = [
  {
    slug: 'kako-doci-do-plitvickih-jezera-parkiranje',
    locale: 'hr',
    title: 'Kako doći do Plitvičkih jezera (auto, zračne luke, parking)',
    description:
      'Praktičan vodič za dolazak autom do NP Plitvička jezera, udaljenosti od zračnih luka i savjeti za parkiranje uz dobar smještaj u Lici.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'kako doci do plitvickih jezera',
      'parkiranje plitvice',
      'auto plitvice',
      'zracna luka plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Autom do Plitvica: glavne rute i tempo vožnje',
        paragraphs: [
          'Najpraktičniji dolazak je vlastitim autom — park i okolica Like su dobro cestovno povezani. Iz Zagreba vožnja obično traje oko 2 do 2,5 sata, ovisno o polasku i gužvama.',
          'Iz smjera Zadra ili Rijeke dolazak je kraći, što je korisno ako letiš u te zračne luke. Prije polaska provjeri stanje na cesti i planiraj pauzu ako putuješ s djecom.',
        ],
      },
      {
        heading: 'Zračne luke: Zagreb, Zadar, Rijeka',
        paragraphs: [
          'Zračna luka Zagreb (ZAG) je čest izbor za međunarodne goste — do Plitvica je dobra cestovna povezanost autoputem i regionalnim cestama.',
          'Zračna luka Zadar (ZAD) i Rijeka (RJK) mogu biti brža opcija ovisno o ruti i sezoni. Nakon slijetanja najčešće se najam autom isplati za fleksibilan obilazak parka i Like.',
        ],
      },
      {
        heading: 'Parking kod ulaza i logistika iz smještaja',
        paragraphs: [
          'Kod NP Plitvička jezera postoje parkirališta uz ulaze — u sezoni dolazi ranije kako bi pronašao mjesto. Provjeri na službenoj stranici parka aktualne informacije o ulazima i prometu.',
          'Smještaj u Lici (npr. blizu Vrhovina i Rudopolja) često znači kraću jutarnju vožnju prema ulazu i lakši povratak nakon šetnje. Za detalje lokacije pogledaj stranicu /lokacija i rezerviraj termin unaprijed.',
        ],
      },
    ],
  },
  {
    slug: 'vikend-plan-plitvice',
    locale: 'hr',
    title: 'Vikend plan za Plitvice (2–3 dana)',
    description:
      'Gotov plan vikenda na Plitvicama: dolazak, obilazak parka, odmor i rezervacija smještaja — idealno za parove, obitelji i manje grupe.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'vikend plitvice plan',
      'vikend na plitvicama',
      '2 dana plitvice',
      'smjestaj vikend plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: 'Petak: dolazak i lagani početak',
        paragraphs: [
          'Kreni ranije popodne ili navečer kako bi izbjegao gužvu na cesti. Nakon dolaska u smještaj ostavi vrijeme za odmor, večeru i pripremu za sutrašnji raniji izlazak.',
          'Provjeri ulaznice i termin posjeta parku unaprijed — u sezoni online rezervacija štedi vrijeme na ulazu.',
        ],
      },
      {
        heading: 'Subota: glavni dan u parku',
        paragraphs: [
          'Planiraj ulaz u park ujutro — to je najvažniji korak za mirniji obilazak. Prilagodite rutu i tempo šetnje svom načinu putovanja — bilo da dolazite kao obitelj ili u paru.',
          'Popodne ostavi vremena za odmor; večer provedi uz smještaj — jacuzzi i privatnost pomažu oporavku nakon cjelodnevnog kretanja.',
        ],
      },
      {
        heading: 'Nedjelja: lagan završetak i povratak',
        paragraphs: [
          'Umjesto novog “maratona”, odaberi kraći izlet u okolici ili spori doručak i polazak. Tako vikend ostaje ugodan, a ne iscrpljujuć.',
          'Ako ti se plan poklopio, rezerviraj sljedeći termin direktno — pogotovo za ljetne vikende i praznike.',
        ],
      },
    ],
  },
  {
    slug: 'kako-doci-do-plitvickih-jezera-parkiranje',
    locale: 'en',
    title: 'How to Get to Plitvice Lakes (Car, Airports, Parking)',
    description:
      'Practical guide to driving to Plitvice Lakes National Park, airport distances, and parking tips—with a stay in Lika for easier logistics.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'how to get to plitvice lakes',
      'plitvice parking',
      'drive to plitvice',
      'airport near plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Driving to Plitvice: main routes and timing',
        paragraphs: [
          'Your own car is usually the most practical option—the park and Lika region are built around road travel. From Zagreb, expect roughly 2 to 2.5 hours depending on departure time and traffic.',
          'From Zadar or Rijeka the drive can be shorter, which helps if you fly into those airports. Check road conditions before you leave and plan a break if travelling with children.',
        ],
      },
      {
        heading: 'Airports: Zagreb, Zadar, Rijeka',
        paragraphs: [
          'Zagreb Airport (ZAG) is a common choice for international visitors, with good highway and regional road connections toward Plitvice.',
          'Zadar (ZAD) and Rijeka (RJK) can be faster depending on your route and season. After landing, renting a car usually gives the flexibility you need for the park and local day trips.',
        ],
      },
      {
        heading: 'Parking at entrances and staying nearby',
        paragraphs: [
          'There are car parks near the national park entrances—in season, arrive early to secure a spot. Check the official park website for current entrance and traffic information.',
          'Staying in Lika often means a shorter morning drive to the gate and an easier return after walking. See our /lokacija page for location details and book your dates in advance.',
        ],
      },
    ],
  },
  {
    slug: 'vikend-plan-plitvice',
    locale: 'en',
    title: 'Weekend Plan for Plitvice (2–3 Days)',
    description:
      'A ready-made Plitvice weekend itinerary: arrival, park day, downtime, and booking your stay—ideal for couples, families, and small groups.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'plitvice weekend itinerary',
      'weekend at plitvice lakes',
      '2 day plitvice plan',
      'weekend accommodation plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: 'Friday: arrival and a soft start',
        paragraphs: [
          'Leave earlier Friday afternoon or evening to avoid peak road traffic. After check-in, keep time for rest, dinner, and preparing an early park start.',
          'Buy tickets and your visit slot in advance—in season, online booking saves time at the gate.',
        ],
      },
      {
        heading: 'Saturday: main park day',
        paragraphs: [
          'Plan a morning park entry—that is the single biggest lever for a calmer visit. Pick one main route and a walking pace that fits your group.',
          'Leave margin in the afternoon for rest; evening at your stay matters—a jacuzzi and privacy help recovery after a full day on the trails.',
        ],
      },
      {
        heading: 'Sunday: light finish and departure',
        paragraphs: [
          'Skip a second “marathon” day—choose a short local outing or a slow breakfast and departure. That keeps the weekend enjoyable rather than exhausting.',
          'If the plan worked for you, book your next dates directly—especially for summer weekends and holidays.',
        ],
      },
    ],
  },
  {
    slug: 'kako-doci-do-plitvickih-jezera-parkiranje',
    locale: 'de',
    title: 'Anreise zu den Plitvicer Seen (Auto, Flughäfen, Parken)',
    description:
      'Praktischer Guide für die Anfahrt mit dem Auto, Flughafen-Entfernungen und Parktipps — mit Unterkunft in der Lika für einfachere Logistik.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'anreise plitvicer seen',
      'parken plitvice',
      'auto plitvice',
      'flughafen plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Mit dem Auto: Routen und Fahrzeit',
        paragraphs: [
          'Das eigene Auto ist meist am praktischsten—Park und Lika sind auf Straßenreisen ausgelegt. Von Zagreb rechnen Sie grob mit 2 bis 2,5 Stunden, je nach Abfahrt und Verkehr.',
          'Von Zadar oder Rijeka kann die Fahrt kürzer sein—sinnvoll bei Ankunft an diesen Flughäfen. Straßenlage prüfen und bei Kindern eine Pause einplanen.',
        ],
      },
      {
        heading: 'Flughäfen: Zagreb, Zadar, Rijeka',
        paragraphs: [
          'Flughafen Zagreb (ZAG) ist für internationale Gäste häufig—gute Anbindung per Autobahn und Landesstraßen Richtung Plitvice.',
          'Zadar (ZAD) und Rijeka (RJK) können je nach Route schneller sein. Nach der Landung lohnt sich oft ein Mietwagen für Park und Tagesausflüge.',
        ],
      },
      {
        heading: 'Parken an den Eingängen und Unterkunft',
        paragraphs: [
          'Parkplätze gibt es an den Parkeingängen—in der Saison früh anreisen. Offizielle Park-Website für Eingänge und Verkehr prüfen.',
          'Unterkunft in der Lika bedeutet oft kürzere Morgenfahrt und entspanntere Rückkehr—Details unter /lokacija, Termine früh buchen.',
        ],
      },
    ],
  },
  {
    slug: 'vikend-plan-plitvice',
    locale: 'de',
    title: 'Wochenendplan für Plitvice (2–3 Tage)',
    description:
      'Fertiger Wochenend-Itinerar: Anreise, Parktag, Erholung und Buchung—ideal für Paare, Familien und kleine Gruppen.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'wochenende plitvice plan',
      'plitvice wochenende',
      '2 tage plitvice',
      'unterkunft wochenende plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: 'Freitag: Anreise und sanfter Start',
        paragraphs: [
          'Freitag nachmittags oder abends losfahren, um Stau zu vermeiden. Nach dem Check-in Zeit für Ruhe, Essen und Vorbereitung auf frühen Parkstart.',
          'Tickets und Zeitfenster vorab kaufen—in der Saison spart Online-Buchung Zeit am Eingang.',
        ],
      },
      {
        heading: 'Samstag: Haupttag im Park',
        paragraphs: [
          'Morgendlicher Eintritt ist der wichtigste Hebel für weniger Andrang. Eine Hauptroute und passendes Tempo wählen.',
          'Nachmittags Puffer für Ruhe; Abend in der Unterkunft—Jacuzzi und Privatsphäre helfen nach einem langen Wandertag.',
        ],
      },
      {
        heading: 'Sonntag: leichter Abschluss',
        paragraphs: [
          'Kein zweiter Marathon—kurzer Ausflug oder langsames Frühstück und Abfahrt. So bleibt das Wochenende entspannt.',
          'Hat der Plan gepasst, nächsten Termin direkt buchen—besonders für Sommerwochenenden und Feiertage.',
        ],
      },
    ],
  },
  {
    slug: 'kako-doci-do-plitvickih-jezera-parkiranje',
    locale: 'it',
    title: 'Come arrivare ai Laghi di Plitvice (auto, aeroporti, parcheggio)',
    description:
      'Guida pratica in auto al parco, distanze dagli aeroporti e consigli sul parcheggio — con alloggio in Lika per una logistica più semplice.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'come arrivare a plitvice',
      'parcheggio plitvice',
      'auto plitvice',
      'aeroporto plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'In auto: percorsi e tempi',
        paragraphs: [
          'L’auto propria è di solito la scelta più pratica—parco e Lika si visitano bene su strada. Da Zagabria contate circa 2–2,5 ore, in base a partenza e traffico.',
          'Da Zara o Rijeka il tragitto può essere più breve—utile se atterrate in quegli aeroporti. Controllate le condizioni stradali e prevedete una pausa con bambini.',
        ],
      },
      {
        heading: 'Aeroporti: Zagabria, Zara, Rijeka',
        paragraphs: [
          'L’aeroporto di Zagabria (ZAG) è frequente per ospiti internazionali—buoni collegamenti autostradali verso Plitvice.',
          'Zara (ZAD) e Rijeka (RJK) possono essere più rapidi a seconda del percorso. Dopo l’atterraggio, il noleggio auto offre flessibilità per parco e gite.',
        ],
      },
      {
        heading: 'Parcheggio agli ingressi e alloggio',
        paragraphs: [
          'Parcheggi vicino agli ingressi del parco—in stagione arrivare presto. Sul sito ufficiale del parco verificate ingressi e traffico.',
          'Alloggiare in Lika spesso significa tragitto mattutino più corto e rientro più facile—vedi /lokacija e prenota le date in anticipo.',
        ],
      },
    ],
  },
  {
    slug: 'vikend-plan-plitvice',
    locale: 'it',
    title: 'Piano weekend a Plitvice (2–3 giorni)',
    description:
      'Itinerario pronto per il weekend: arrivo, giornata nel parco, relax e prenotazione—alloggio ideale per coppie, famiglie e piccoli gruppi.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'weekend plitvice itinerario',
      'weekend laghi di plitvice',
      '2 giorni plitvice',
      'alloggio weekend plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: 'Venerdì: arrivo e inizio leggero',
        paragraphs: [
          'Partite venerdì pomeriggio o sera per evitare traffico. Dopo il check-in, tempo per riposo, cena e preparazione all’uscita mattutina.',
          'Biglietti e fascia oraria in anticipo—in stagione il web riduce l’attesa all’ingresso.',
        ],
      },
      {
        heading: 'Sabato: giornata principale nel parco',
        paragraphs: [
          'Ingresso al mattino—la leva più importante per meno affluenza. Un percorso principale e ritmo adatto al gruppo.',
          'Margine nel pomeriggio per riposo; la sera in alloggio—jacuzzi e privacy aiutano dopo una giornata lunga.',
        ],
      },
      {
        heading: 'Domenica: chiusura tranquilla',
        paragraphs: [
          'Niente secondo maratona—breve gita o colazione lenta e partenza. Il weekend resta piacevole.',
          'Se il piano ha funzionato, prenotate le prossime date direttamente—soprattutto per estate e festivi.',
        ],
      },
    ],
  },
];
