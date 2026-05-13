import type { GuideArticle } from './guide-types';

export const GUIDE_HUB_BY_LOCALE = {
  hr: {
    title: 'Vodič kroz Plitvice i Liku',
    description:
      'Praktični savjeti za planiranje boravka, izlete i aktivnosti uz direktnu rezervaciju smještaja.',
  },
  en: {
    title: 'Plitvice and Lika Travel Guide',
    description:
      'Practical tips for planning your stay, nearby trips, and activities with direct booking options.',
  },
  de: {
    title: 'Reiseführer für Plitvicer Seen und Lika',
    description:
      'Praktische Tipps für die Reiseplanung, Ausflüge und Aktivitäten mit direkter Buchung.',
  },
  it: {
    title: 'Guida a Plitvice e alla Lika',
    description:
      'Consigli pratici per pianificare il soggiorno, escursioni e attività con prenotazione diretta.',
  },
} as const;

export const GUIDES: GuideArticle[] = [
  {
    slug: 'sto-posjetiti-blizu-plitvickih-jezera',
    locale: 'hr',
    title: 'Sto posjetiti blizu Plitvickih jezera',
    description:
      'Praktican vodic kroz najzanimljivije lokacije i izlete u okolici Plitvica, uz savjete za planiranje boravka u Lici.',
    publishedAt: '2026-05-08',
    updatedAt: '2026-05-08',
    readingTime: '7 min',
    keywords: [
      'sto posjetiti blizu plitvickih jezera',
      'izleti plitvice',
      'lika priroda',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Najljepse lokacije u okolici Plitvica',
        paragraphs: [
          'Plitvicka jezera su glavni razlog dolaska, ali okolica nudi vise od samog nacionalnog parka. U blizini mozes kombinirati kratke setnje, vidikovce i lokalna mjesta koja cuvaju mir i autenticnost Like.',
          'Ako zelis opusten raspored, najbolje je planirati jednu glavnu aktivnost ujutro i jednu kracu popodne. Tako izbjegavas umor i ostavljas dovoljno vremena za odmor.',
        ],
      },
      {
        heading: 'Ideje za poludnevne i cjelodnevne izlete',
        paragraphs: [
          'Za poludnevni izlet odaberi jednu rutu kroz prirodu i ubaci pauzu za lokalnu gastronomiju. Za cjelodnevni izlet kombiniraj NP Plitvicka jezera s jos jednom lokacijom u Lici.',
          'Obiteljima i manjim grupama najvise odgovara fleksibilan plan koji se prilagodava vremenu i tempu putovanja.',
        ],
      },
      {
        heading: 'Kako isplanirati boravak bez stresa',
        paragraphs: [
          'Najvece guzve su kasnije prijepodne, pa je raniji polazak velika prednost. Smjestaj na dobroj lokaciji stedi vrijeme i olaksava svakodnevnu logistiku.',
          'Ako trazis smjestaj blizu Plitvica, pogledaj i cijene unaprijed kako bi lakse odabrala termin koji ti odgovara.',
        ],
      },
    ],
  },
  {
    slug: 'najbolje-aktivnosti-u-lici',
    locale: 'hr',
    title: 'Najbolje aktivnosti u Lici',
    description:
      'Ideje za aktivan i opusten odmor u Lici, od prirode i izleta do jednostavnog planiranja boravka blizu Plitvica.',
    publishedAt: '2026-05-09',
    updatedAt: '2026-05-09',
    readingTime: '8 min',
    keywords: [
      'najbolje aktivnosti u lici',
      'sto raditi u lici',
      'plitvice aktivnosti',
    ],
    relatedLandingPages: [
      '/villa-jacuzzi-plitvice',
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Aktivnosti u prirodi i adrenalinski dozivljaji',
        paragraphs: [
          'Lika nudi odlican balans izmedu aktivnog dana i mirnog vecernjeg odmora. Tijekom boravka mozes kombinirati setnje, vidikovce i lokalne outdoor aktivnosti.',
          'Ako planiras vise dana, isplati se rasporediti aktivnosti prema intenzitetu kako bi svaki dan imao jasnu temu i dovoljno vremena za oporavak.',
        ],
      },
      {
        heading: 'Kako sloziti plan za parove, obitelji i grupe',
        paragraphs: [
          'Parovima odgovaraju opusteniji itinerari s vise spontanosti, dok obiteljima i grupama vise odgovara unaprijed dogovoren raspored.',
          'Kod grupnog putovanja vazno je uskladiti tempo i odabrati smjestaj koji olaksava logistiku za sve sudionike.',
        ],
      },
      {
        heading: 'Prakticni savjeti za bolji raspored dana',
        paragraphs: [
          'Kreni ranije na najpopularnije lokacije i ostavi popodne za manje opterecene aktivnosti. Tako izbjegavas guzve i zadrzavas energiju.',
          'Ako trazis bazu iz koje je lako organizirati aktivnosti, provjeri smjestaj i rezervaciju unaprijed.',
        ],
      },
    ],
  },
  {
    slug: 'obiteljski-odmor-blizu-plitvica',
    locale: 'hr',
    title: 'Obiteljski odmor blizu Plitvica',
    description:
      'Kako organizirati obiteljski odmor blizu Plitvica: smjestaj, dnevni ritam, aktivnosti za djecu i prakticni savjeti za bezbrizan boravak.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingTime: '7 min',
    keywords: [
      'obiteljski odmor plitvice',
      'smjestaj za obitelj blizu plitvica',
      'odmor s djecom lika',
    ],
    relatedLandingPages: [
      '/kuca-za-odmor-plitvice',
      '/smjestaj-za-9-osoba-plitvice',
      '/smjestaj-plitvicka-jezera',
    ],
    sections: [
      {
        heading: 'Sto je najvaznije kod obiteljskog smjestaja',
        paragraphs: [
          'Obiteljima su prioritet sigurnost, dovoljno prostora i jasna organizacija dana. Smjestaj koji nudi privatnost i funkcionalnost olaksava cijeli boravak.',
          'Kod planiranja je korisno odmah provjeriti cjenik i dostupnost termina kako bi se putovanje uskladilo sa skolskim i poslovnim obvezama.',
        ],
      },
      {
        heading: 'Aktivnosti prilagodene djeci i roditeljima',
        paragraphs: [
          'Najbolji raspored je kombinirati krace aktivnosti u prirodi s dovoljno pauza za odmor. Tako su i djeca i odrasli zadovoljniji tijekom dana.',
          'U okolici Plitvica lako je sloziti jednostavne izlete bez dugih voznji, sto je posebno vazno za obitelji s manjom djecom.',
        ],
      },
      {
        heading: 'Kako smanjiti stres kod planiranja putovanja',
        paragraphs: [
          'Raspodijeli aktivnosti po danima, planiraj fleksibilno i ostavi vrijeme za odmor. Preopterećen raspored najcesci je razlog umora na obiteljskim putovanjima.',
          'Direktna rezervacija i jasna komunikacija oko detalja smjestaja dodatno pojednostavljuju organizaciju.',
        ],
      },
    ],
  },
  {
    slug: 'koliko-dana-treba-za-plitvice',
    locale: 'hr',
    title: 'Koliko dana treba za Plitvice',
    description:
      'Praktican vodic za planiranje boravka na Plitvicama: 1, 2 ili 3 dana, kako sloziti raspored i gdje odsjesti za bolju logistiku.',
    publishedAt: '2026-05-11',
    updatedAt: '2026-05-11',
    readingTime: '6 min',
    keywords: [
      'koliko dana treba za plitvice',
      'plitvice itinerar',
      'smjestaj blizu plitvica vise dana',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: '1 dan, 2 dana ili 3 dana na Plitvicama',
        paragraphs: [
          'Ako imas samo jedan dan, fokusiraj se na jednu glavnu rutu i izbjegni pretrpavanje rasporeda. Za dublji dozivljaj prirode preporucuju se najmanje dva dana.',
          'Tri dana daju dovoljno prostora za NP Plitvicka jezera i dodatne aktivnosti u Lici bez zurbe.',
        ],
      },
      {
        heading: 'Primjer itinerara po duljini boravka',
        paragraphs: [
          'Za vikend boravak dobro funkcionira model: prvi dan lagani dolazak i odmor, drugi dan glavni izlet, treci dan kraci obilazak i povratak.',
          'Za dulji boravak ukljuci i lokalne izlete kako bi putovanje imalo vecu raznolikost i bolju vrijednost.',
        ],
      },
      {
        heading: 'Gdje odsjesti za najbolju logistiku',
        paragraphs: [
          'Smjestaj blizu Plitvica skracuje vrijeme voznje i pojednostavljuje svaki dan putovanja. To je posebno korisno kod obitelji i vecih grupa.',
          'Ako planiras vise dana, rezerviraj termin unaprijed i uskladi ga s raspolozivim cijenama i kapacitetom.',
        ],
      },
    ],
  },
  {
    slug: 'sto-posjetiti-blizu-plitvickih-jezera',
    locale: 'en',
    title: 'What to Visit Near Plitvice Lakes',
    description:
      'A practical guide to nearby highlights, day trips, and planning tips for travelers staying close to Plitvice Lakes.',
    publishedAt: '2026-05-08',
    updatedAt: '2026-05-08',
    readingTime: '7 min',
    keywords: [
      'what to visit near plitvice lakes',
      'plitvice day trips',
      'lika attractions',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Top places worth visiting near Plitvice',
        paragraphs: [
          'Plitvice Lakes are the main attraction, but nearby Lika offers many additional places worth exploring. You can combine scenic viewpoints, short trails, and authentic local spots in one trip.',
          'A balanced daily rhythm works best: one main activity in the morning and a lighter one in the afternoon.',
        ],
      },
      {
        heading: 'Half-day and full-day trip ideas',
        paragraphs: [
          'For half-day plans, pick one nature route and add a relaxed food stop. For full-day plans, combine the national park with another local destination.',
          'Families and small groups usually benefit from flexible itineraries adapted to weather and energy levels.',
        ],
      },
      {
        heading: 'How to plan without stress',
        paragraphs: [
          'Starting early helps avoid peak crowds and gives you more quality time outdoors.',
          'Choosing accommodation close to Plitvice also makes daily logistics easier and more efficient.',
        ],
      },
    ],
  },
  {
    slug: 'najbolje-aktivnosti-u-lici',
    locale: 'en',
    title: 'Best Activities in Lika',
    description:
      'Discover the best activities in Lika, from nature-focused trips to practical planning tips for a balanced holiday near Plitvice.',
    publishedAt: '2026-05-09',
    updatedAt: '2026-05-09',
    readingTime: '8 min',
    keywords: [
      'best activities in lika',
      'things to do in lika',
      'plitvice activities',
    ],
    relatedLandingPages: [
      '/villa-jacuzzi-plitvice',
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Outdoor and adventure-friendly options',
        paragraphs: [
          'Lika offers a strong mix of active exploration and peaceful downtime. That balance is ideal for guests who want both movement and recovery on the same trip.',
          'When planning multi-day travel, split activities by intensity so each day stays enjoyable.',
        ],
      },
      {
        heading: 'How to plan for couples, families, and groups',
        paragraphs: [
          'Couples often prefer flexible plans, while families and groups benefit from a clearer structure.',
          'Choosing a practical base location makes coordination easier for everyone.',
        ],
      },
      {
        heading: 'Simple tips for better day planning',
        paragraphs: [
          'Visit high-demand spots early and leave lighter activities for later in the day.',
          'Booking your stay and dates in advance helps keep the trip smooth.',
        ],
      },
    ],
  },
  {
    slug: 'obiteljski-odmor-blizu-plitvica',
    locale: 'en',
    title: 'Family Holiday Near Plitvice',
    description:
      'How to plan a family holiday near Plitvice with practical accommodation, activity, and scheduling advice.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingTime: '7 min',
    keywords: [
      'family holiday near plitvice',
      'family accommodation plitvice',
      'travel with kids lika',
    ],
    relatedLandingPages: [
      '/kuca-za-odmor-plitvice',
      '/smjestaj-za-9-osoba-plitvice',
      '/smjestaj-plitvicka-jezera',
    ],
    sections: [
      {
        heading: 'What matters most for family stays',
        paragraphs: [
          'Families usually prioritize safety, practical comfort, and enough space for daily routines.',
          'Checking pricing and availability early helps align travel with school and work schedules.',
        ],
      },
      {
        heading: 'Kid-friendly and parent-friendly activities',
        paragraphs: [
          'The best plan combines shorter nature activities with regular breaks.',
          'Nearby routes around Plitvice make it easier to avoid long transfers with children.',
        ],
      },
      {
        heading: 'How to reduce stress before the trip',
        paragraphs: [
          'Keep the itinerary realistic and leave room for rest.',
          'Direct booking and clear communication simplify all logistics.',
        ],
      },
    ],
  },
  {
    slug: 'koliko-dana-treba-za-plitvice',
    locale: 'en',
    title: 'How Many Days Do You Need for Plitvice?',
    description:
      'A practical guide for planning 1, 2, or 3 days in Plitvice, with itinerary ideas and accommodation planning tips.',
    publishedAt: '2026-05-11',
    updatedAt: '2026-05-11',
    readingTime: '6 min',
    keywords: [
      'how many days for plitvice',
      'plitvice itinerary',
      'stay near plitvice multiple days',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: '1 day vs 2 days vs 3 days in Plitvice',
        paragraphs: [
          'One day can work for a focused visit, but two days provide a better balance.',
          'Three days are ideal when you also want to explore the wider Lika region.',
        ],
      },
      {
        heading: 'Sample itineraries by trip length',
        paragraphs: [
          'For weekend travel, use a simple structure: arrival day, main park day, and light departure day.',
          'Longer stays should include additional local experiences around Plitvice.',
        ],
      },
      {
        heading: 'Where to stay for easier logistics',
        paragraphs: [
          'A nearby base saves driving time and keeps daily planning easier.',
          'Advance booking is recommended for better date and pricing options.',
        ],
      },
    ],
  },
  {
    slug: 'sto-posjetiti-blizu-plitvickih-jezera',
    locale: 'de',
    title: 'Was man nahe den Plitvicer Seen besuchen kann',
    description:
      'Praktischer Leitfaden mit Ausflugszielen, Tagesideen und Planungstipps fur Aufenthalte nahe den Plitvicer Seen.',
    publishedAt: '2026-05-08',
    updatedAt: '2026-05-08',
    readingTime: '7 min',
    keywords: [
      'was besuchen nahe plitvicer seen',
      'ausfluge plitvice',
      'lika sehenswurdigkeiten',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Die wichtigsten Orte rund um Plitvice',
        paragraphs: [
          'Neben dem Nationalpark gibt es in Lika viele ruhige und authentische Orte. So entsteht ein abwechslungsreicher Aufenthalt.',
          'Ein ausgewogener Tagesplan mit einer Hauptaktivitat und einem leichteren Programmpunkt ist meist ideal.',
        ],
      },
      {
        heading: 'Halbtags- und Ganztagsideen',
        paragraphs: [
          'Halbtags: Naturroute plus lokale Pause. Ganztags: Nationalpark plus ein weiteres Ziel in der Region.',
          'Familien und kleinere Gruppen profitieren besonders von flexiblen Planen.',
        ],
      },
      {
        heading: 'Planung ohne Stress',
        paragraphs: [
          'Fruher Start reduziert Wartezeiten und verbessert den Tagesrhythmus.',
          'Eine Unterkunft nahe Plitvice vereinfacht die gesamte Logistik.',
        ],
      },
    ],
  },
  {
    slug: 'najbolje-aktivnosti-u-lici',
    locale: 'de',
    title: 'Die besten Aktivitaten in Lika',
    description:
      'Empfehlungen fur Aktivitaten in Lika mit Fokus auf Natur, Tagesplanung und einen ausgewogenen Aufenthalt nahe Plitvice.',
    publishedAt: '2026-05-09',
    updatedAt: '2026-05-09',
    readingTime: '8 min',
    keywords: [
      'beste aktivitaten in lika',
      'was tun in lika',
      'plitvice aktivitaten',
    ],
    relatedLandingPages: [
      '/villa-jacuzzi-plitvice',
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Natur und aktive Erlebnisse',
        paragraphs: [
          'Lika verbindet aktive Tagesprogramme mit ruhiger Erholung am Abend.',
          'Bei mehrtagigen Reisen lohnt es sich, die Intensitat der Tage gezielt zu variieren.',
        ],
      },
      {
        heading: 'Planung fur Paare, Familien und Gruppen',
        paragraphs: [
          'Paare bevorzugen oft flexible Routen, Gruppen eher klare Ablaufe.',
          'Eine gute Unterkunftslage erleichtert Abstimmung und Tagesplanung.',
        ],
      },
      {
        heading: 'Praktische Tipps fur den Tagesrhythmus',
        paragraphs: [
          'Beliebte Orte morgens besuchen und den Nachmittag lockerer gestalten.',
          'Fruhe Terminplanung verbessert Verfugbarkeit und Ablauf.',
        ],
      },
    ],
  },
  {
    slug: 'obiteljski-odmor-blizu-plitvica',
    locale: 'de',
    title: 'Familienurlaub nahe Plitvice',
    description:
      'Wie man einen Familienurlaub nahe Plitvice organisiert: Unterkunft, Tagesstruktur und praktische Tipps fur Reisen mit Kindern.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingTime: '7 min',
    keywords: [
      'familienurlaub plitvice',
      'unterkunft familie plitvice',
      'urlaub mit kindern lika',
    ],
    relatedLandingPages: [
      '/kuca-za-odmor-plitvice',
      '/smjestaj-za-9-osoba-plitvice',
      '/smjestaj-plitvicka-jezera',
    ],
    sections: [
      {
        heading: 'Worauf Familien bei der Unterkunft achten sollten',
        paragraphs: [
          'Wichtige Faktoren sind Sicherheit, Platz und alltagstaugliche Ausstattung.',
          'Fruhe Prufung von Preisen und Terminen erleichtert die Planung deutlich.',
        ],
      },
      {
        heading: 'Aktivitaten fur Kinder und Eltern',
        paragraphs: [
          'Kurze Naturaktivitaten mit regelmaBigen Pausen funktionieren meist am besten.',
          'Kurze Wege rund um Plitvice machen den Tagesablauf entspannter.',
        ],
      },
      {
        heading: 'Stressfreie Vorbereitung',
        paragraphs: [
          'Ein realistischer Plan mit Pufferzeiten verhindert Uberlastung.',
          'Direkte Buchung sorgt fur klare Kommunikation und sichere Organisation.',
        ],
      },
    ],
  },
  {
    slug: 'koliko-dana-treba-za-plitvice',
    locale: 'de',
    title: 'Wie viele Tage braucht man fur Plitvice?',
    description:
      'Leitfaden fur 1, 2 oder 3 Tage in Plitvice mit Routenideen und Tipps zur Unterkunftsplanung.',
    publishedAt: '2026-05-11',
    updatedAt: '2026-05-11',
    readingTime: '6 min',
    keywords: [
      'wie viele tage plitvice',
      'plitvice reiseplan',
      'unterkunft nahe plitvice mehrere tage',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: '1, 2 oder 3 Tage in Plitvice',
        paragraphs: [
          'Ein Tag reicht fur einen kompakten Besuch, zwei Tage bieten mehr Balance.',
          'Drei Tage sind optimal, wenn zusatzlich Lika erkundet werden soll.',
        ],
      },
      {
        heading: 'Beispielplan nach Aufenthaltsdauer',
        paragraphs: [
          'Wochenendmodell: Anreise, Haupttag im Park, entspannter Abreisetag.',
          'Bei langeren Aufenthalten lohnen zusatzliche regionale Ausfluge.',
        ],
      },
      {
        heading: 'Die richtige Unterkunft fur gute Logistik',
        paragraphs: [
          'Eine nahe Unterkunft spart Zeit und vereinfacht jeden Reisetag.',
          'Fruh buchen verbessert Termin- und Preisoptionen.',
        ],
      },
    ],
  },
  {
    slug: 'sto-posjetiti-blizu-plitvickih-jezera',
    locale: 'it',
    title: 'Cosa visitare vicino ai Laghi di Plitvice',
    description:
      'Guida pratica con idee di escursioni, luoghi consigliati e suggerimenti per organizzare il soggiorno vicino a Plitvice.',
    publishedAt: '2026-05-08',
    updatedAt: '2026-05-08',
    readingTime: '7 min',
    keywords: [
      'cosa visitare vicino plitvice',
      'escursioni plitvice',
      'attrazioni lika',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Luoghi consigliati nei dintorni di Plitvice',
        paragraphs: [
          'Oltre al parco nazionale, la Lika offre molti luoghi naturali e autentici da scoprire.',
          'Un ritmo giornaliero equilibrato aiuta a godersi meglio l esperienza.',
        ],
      },
      {
        heading: 'Idee per mezze giornate e giornate intere',
        paragraphs: [
          'Per mezza giornata scegli un percorso naturale e una pausa locale. Per la giornata intera combina il parco con un altra meta della zona.',
          'Famiglie e piccoli gruppi ottengono spesso risultati migliori con programmi flessibili.',
        ],
      },
      {
        heading: 'Come pianificare senza stress',
        paragraphs: [
          'Partire presto aiuta a evitare le ore piu affollate.',
          'Un alloggio vicino a Plitvice semplifica tutta la logistica quotidiana.',
        ],
      },
    ],
  },
  {
    slug: 'najbolje-aktivnosti-u-lici',
    locale: 'it',
    title: 'Le migliori attivita in Lika',
    description:
      'Idee per attivita in Lika tra natura, esperienze locali e consigli pratici per organizzare il soggiorno vicino a Plitvice.',
    publishedAt: '2026-05-09',
    updatedAt: '2026-05-09',
    readingTime: '8 min',
    keywords: [
      'migliori attivita lika',
      'cosa fare in lika',
      'attivita plitvice',
    ],
    relatedLandingPages: [
      '/villa-jacuzzi-plitvice',
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Natura e attivita dinamiche',
        paragraphs: [
          'La Lika permette di combinare giornate attive e serate rilassanti.',
          'Per soggiorni di piu giorni conviene alternare attivita intense e leggere.',
        ],
      },
      {
        heading: 'Pianificazione per coppie, famiglie e gruppi',
        paragraphs: [
          'Le coppie preferiscono spesso flessibilita, mentre i gruppi funzionano meglio con una struttura chiara.',
          'Una base ben posizionata riduce tempi morti e rende il viaggio piu semplice.',
        ],
      },
      {
        heading: 'Suggerimenti pratici per giornate migliori',
        paragraphs: [
          'Visita i luoghi piu richiesti al mattino e lascia il pomeriggio per attivita piu leggere.',
          'Prenotare in anticipo facilita tutto il percorso di viaggio.',
        ],
      },
    ],
  },
  {
    slug: 'obiteljski-odmor-blizu-plitvica',
    locale: 'it',
    title: 'Vacanza in famiglia vicino a Plitvice',
    description:
      'Come organizzare una vacanza in famiglia vicino a Plitvice: alloggio, attivita adatte ai bambini e consigli pratici.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingTime: '7 min',
    keywords: [
      'vacanza famiglia plitvice',
      'alloggio famiglia plitvice',
      'viaggio con bambini lika',
    ],
    relatedLandingPages: [
      '/kuca-za-odmor-plitvice',
      '/smjestaj-za-9-osoba-plitvice',
      '/smjestaj-plitvicka-jezera',
    ],
    sections: [
      {
        heading: 'Cosa conta davvero per le famiglie',
        paragraphs: [
          'Sicurezza, spazio e comfort pratico sono i tre elementi principali per un soggiorno sereno.',
          'Controllare disponibilita e prezzi in anticipo aiuta a pianificare meglio.',
        ],
      },
      {
        heading: 'Attivita adatte a bambini e genitori',
        paragraphs: [
          'Le giornate migliori alternano attivita brevi nella natura e pause regolari.',
          'Le distanze ridotte vicino a Plitvice semplificano gli spostamenti con i bambini.',
        ],
      },
      {
        heading: 'Come ridurre lo stress organizzativo',
        paragraphs: [
          'Programmi realistici con margine di flessibilita funzionano meglio per tutta la famiglia.',
          'Prenotazione diretta e comunicazione chiara rendono la preparazione piu semplice.',
        ],
      },
    ],
  },
  {
    slug: 'koliko-dana-treba-za-plitvice',
    locale: 'it',
    title: 'Quanti giorni servono per Plitvice?',
    description:
      'Guida pratica per pianificare 1, 2 o 3 giorni a Plitvice con esempi di itinerario e consigli su dove alloggiare.',
    publishedAt: '2026-05-11',
    updatedAt: '2026-05-11',
    readingTime: '6 min',
    keywords: [
      'quanti giorni plitvice',
      'itinerario plitvice',
      'alloggio vicino plitvice piu giorni',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
      '/villa-jacuzzi-plitvice',
    ],
    sections: [
      {
        heading: '1 giorno, 2 giorni o 3 giorni a Plitvice',
        paragraphs: [
          'Un giorno basta per una visita rapida, ma due giorni offrono un esperienza piu completa.',
          'Tre giorni sono ideali se vuoi includere anche altre tappe in Lika.',
        ],
      },
      {
        heading: 'Esempio di itinerario per durata del soggiorno',
        paragraphs: [
          'Per un weekend: arrivo leggero, giornata principale al parco, partenza rilassata.',
          'Per soggiorni piu lunghi, aggiungi escursioni locali per aumentare la varieta.',
        ],
      },
      {
        heading: 'Dove alloggiare per una logistica migliore',
        paragraphs: [
          'Un alloggio vicino a Plitvice riduce i tempi di viaggio e semplifica ogni giornata.',
          'Prenotare in anticipo migliora le opzioni su date e prezzo.',
        ],
      },
    ],
  },
];
