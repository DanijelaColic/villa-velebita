import type { GuideArticle } from './guide-types';

/** Vodiči batch 1: sezona/gužve + ulaznice (dodaju se u GUIDES). */
export const NEW_GUIDES: GuideArticle[] = [
  // —— kada-posjetiti-plitvicka-jezera ——
  {
    slug: 'kada-posjetiti-plitvicka-jezera',
    locale: 'hr',
    title: 'Kada posjetiti Plitvice (sezona, gužve, vrijeme)',
    description:
      'Koji je najbolji mjesec za Plitvice, kada su gužve i kako isplanirati dan u parku — praktičan vodič uz savjete za smještaj u Lici.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'kada posjetiti plitvice',
      'gužve plitvicka jezera',
      'najbolje vrijeme plitvice',
      'sezona plitvicka jezera',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Sezona po mjesecima: proljeće, ljeto, jesen, zima',
        paragraphs: [
          'Proljeće i rana jesen nude ugodnu temperaturu i zelene pejzaže, uz manje gužve nego ljeti. Ljeto je najpopularnije, najviše gostiju dolaze ljeti, duži su dani, veće gužve i potreba za ranijim dolaskom u park.',
          'Zima donosi mirniji doživljaj i drugačiju atmosferu, ali je važno provjeriti radno vrijeme i dostupne staze na službenoj stranici NP Plitvička jezera prije puta.',
        ],
      },
      {
        heading: 'Gužve: vikend, praznici i dio dana',
        paragraphs: [
          'Najveći pritisak obično je ljeti, posebno vikendima i u razdoblju glavne turističke sezone. Radni dan ujutro često je najbolja kombinacija manje gužve i svježijeg tempa šetnje.',
          'Ako dolaziš u vrhu sezone, planiraj ulaz u park ranije i izbjegni “sve u jednom danu” bez pauza — kvaliteta posjeta brzo pada kad je gužva.',
        ],
      },
      {
        heading: 'Vrijeme, obuća i logistika boravka',
        paragraphs: [
          'Kiša može promijeniti doživljaj staza i fotografija, ali park se i dalje može posjetiti s odgovarajućom obućom i laganim slojevima odjeće. Uvijek provjeri prognozu i ponesi vodu.',
          'Smještaj u Lici blizu Plitvica olakšava raniji odlazak u park i povratak na odmor — posebno ako planiraš više dana (pogledaj i vodič koliko dana treba za Plitvice).',
        ],
      },
    ],
  },
  {
    slug: 'ulaznice-plitvicka-jezera-cijene',
    locale: 'hr',
    title: 'Ulaznice i cijene NP Plitvice (+ kako kupiti)',
    description:
      'Kako kupiti ulaznice za Plitvička jezera, što utječe na cijenu i praktični savjeti za online rezervaciju termina posjeta.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'ulaznice plitvicka jezera',
      'cijene plitvice ulaz',
      'kako kupiti ulaznice plitvice',
      'online ulaznice plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
    ],
    sections: [
      {
        heading: 'Kako funkcionira cijena ulaznice',
        paragraphs: [
          'Cijena ulaska u NP Plitvička jezera ovisi o sezoni, dobi posjetitelja i odabranom programu posjeta. Park koristi sezonski model — zato isti dan u ljeto i izvan sezone ne mora imati istu cijenu.',
          'Prije puta provjeri aktualni cjenik i uvjete na službenoj stranici parka (np-plitvicka-jezera.hr). Ovaj vodič je informativan; konačnu cijenu i pravila uvijek potvrdi na službenom izvoru.',
        ],
      },
      {
        heading: 'Online kupnja i rezervacija termina',
        paragraphs: [
          'U sezoni je online kupnja ulaznica praktična jer smanjuje rizik od čekanja i pomaže planirati dolazak. Odaberi ulaz, datum i vrijeme prema planu šetnje.',
          'Kupi ulaznice samo preko službenih kanala parka. Ako dolaziš iz smještaja u Lici, uskladi vrijeme polaska s rezerviranim terminom — raniji start često znači mirniji obilazak.',
        ],
      },
      {
        heading: 'Što provjeriti prije plaćanja',
        paragraphs: [
          'Provjeri uključuje li cijena odabrani ulaz (npr. Ulaz 1 ili Ulaz 2), radno vrijeme na taj dan i pravila o djeci, studentima ili grupama ako imaš popuste.',
          'Nakon kupnje spremi potvrdu na mobitelu i planiraj parkiranje i dolazak. Za boravak uz park pogledaj dostupnost smještaja i direktnu rezervaciju termina kod nas.',
        ],
      },
    ],
  },
  {
    slug: 'kada-posjetiti-plitvicka-jezera',
    locale: 'en',
    title: 'When to Visit Plitvice (Season, Crowds, Weather)',
    description:
      'Best months for Plitvice Lakes, when crowds peak, and how to plan your park day—with tips for staying in Lika.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'when to visit plitvice lakes',
      'plitvice crowds',
      'best time plitvice',
      'plitvice season',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Season by month: spring, summer, autumn, winter',
        paragraphs: [
          'Spring and early autumn offer pleasant temperatures and green scenery with fewer crowds than midsummer. Summer is the most popular—more visitors, longer days, and a stronger need to arrive early.',
          'Winter brings a calmer atmosphere and different scenery, but always check opening hours and available trails on the official Plitvice Lakes National Park website before you travel.',
        ],
      },
      {
        heading: 'Crowds: weekends, holidays, and time of day',
        paragraphs: [
          'Peak pressure is usually in summer, especially on weekends and during the main tourist season. A weekday morning is often the best mix of lighter crowds and a fresher walking pace.',
          'If you travel in high season, plan an early park entry and avoid cramming everything into one rushed day—crowds quickly reduce the quality of the visit.',
        ],
      },
      {
        heading: 'Weather, footwear, and stay logistics',
        paragraphs: [
          'Rain can change trail conditions and photos, but the park is still visitable with proper shoes and light layers. Check the forecast and bring water.',
          'Staying in Lika near Plitvice makes early starts and relaxed returns easier—especially for multi-day trips (see our guide on how many days you need at Plitvice).',
        ],
      },
    ],
  },
  {
    slug: 'ulaznice-plitvicka-jezera-cijene',
    locale: 'en',
    title: 'Plitvice Tickets and Prices (+ How to Buy)',
    description:
      'How to buy Plitvice Lakes tickets, what affects pricing, and practical tips for online booking your visit slot.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'plitvice lakes tickets',
      'plitvice entrance price',
      'buy plitvice tickets online',
      'plitvice national park tickets',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
    ],
    sections: [
      {
        heading: 'How ticket pricing works',
        paragraphs: [
          'Plitvice Lakes National Park ticket prices depend on season, visitor age, and the visit program you choose. The park uses seasonal pricing—so the same experience can cost differently in peak summer vs off-season.',
          'Before travelling, check the current price list and rules on the official park website (np-plitvicka-jezera.hr). This guide is informational; always confirm final price and terms on the official source.',
        ],
      },
      {
        heading: 'Online purchase and time slots',
        paragraphs: [
          'In season, buying tickets online is practical—it reduces waiting risk and helps you plan arrival. Choose entrance, date, and time according to your walking plan.',
          'Purchase only through official park channels. If you stay in Lika, align departure from your accommodation with your booked slot—an early start often means a calmer visit.',
        ],
      },
      {
        heading: 'What to check before paying',
        paragraphs: [
          'Confirm which entrance is included (e.g. Entrance 1 or 2), opening hours for that day, and rules for children, students, or groups if discounts apply.',
          'After purchase, save confirmation on your phone and plan parking and arrival. For stays near the park, check accommodation availability and book your dates directly with us.',
        ],
      },
    ],
  },
  {
    slug: 'kada-posjetiti-plitvicka-jezera',
    locale: 'de',
    title: 'Wann Plitvice besuchen (Saison, Andrang, Wetter)',
    description:
      'Beste Monate für die Plitvicer Seen, wann der Andrang am größten ist und wie Sie Ihren Parktag planen — mit Tipps für einen Aufenthalt in der Lika.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'wann plitvicer seen besuchen',
      'andrang plitvice',
      'beste reisezeit plitvice',
      'saison plitvicer seen',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Saison nach Monaten: Frühling, Sommer, Herbst, Winter',
        paragraphs: [
          'Frühling und früher Herbst bieten angenehme Temperaturen und grüne Landschaften mit weniger Andrang als Hochsommer. Der Sommer ist am beliebtesten—mehr Besucher, längere Tage, frühere Anreise empfohlen.',
          'Im Winter ist es ruhiger und die Stimmung anders—prüfen Sie vor der Reise Öffnungszeiten und Wege auf der offiziellen Website des Nationalparks Plitvicer Seen.',
        ],
      },
      {
        heading: 'Andrang: Wochenenden, Feiertage, Tageszeit',
        paragraphs: [
          'Der höchste Druck liegt meist im Sommer, besonders am Wochenende und in der Hauptsaison. Werktags vormittags ist oft die beste Kombination aus weniger Andrang und entspanntem Tempo.',
          'In der Hochsaison früh einplanen und nicht alles in einen hektischen Tag pressen—bei starkem Andrang leidet das Erlebnis schnell.',
        ],
      },
      {
        heading: 'Wetter, Schuhe und Logistik des Aufenthalts',
        paragraphs: [
          'Regen kann Wege und Fotos verändern, der Park ist mit passenden Schuhen und leichten Schichten dennoch machbar. Wetter und Wasser mitnehmen.',
          'Eine Unterkunft in der Lika nahe Plitvice erleichtert frühe Starts und entspannte Rückkehr—besonders bei mehrtägigen Aufenthalten (siehe Guide: wie viele Tage für Plitvice).',
        ],
      },
    ],
  },
  {
    slug: 'ulaznice-plitvicka-jezera-cijene',
    locale: 'de',
    title: 'Eintritt und Preise Plitvice (+ Kauf)',
    description:
      'So kaufen Sie Tickets für die Plitvicer Seen, was den Preis beeinflusst und praktische Tipps zur Online-Buchung eines Besuchsslots.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'eintritt plitvicer seen',
      'preise plitvice nationalpark',
      'tickets plitvice online kaufen',
      'plitvice eintrittskarten',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
    ],
    sections: [
      {
        heading: 'Wie die Eintrittspreise funktionieren',
        paragraphs: [
          'Der Preis hängt von Saison, Alter der Besucher und gewähltem Besuchsprogramm ab. Der Park arbeitet mit Saisonpreisen—Hochsommer und Nebensaison können deutlich variieren.',
          'Vor der Reise aktuellen Preislisten und Regeln auf der offiziellen Park-Website (np-plitvicka-jezera.hr) prüfen. Dieser Artikel ist informativ—verbindlich sind immer die offiziellen Angaben.',
        ],
      },
      {
        heading: 'Online-Kauf und Zeitfenster',
        paragraphs: [
          'In der Saison ist Online-Kauf sinnvoll—weniger Wartezeit, bessere Planung. Eingang, Datum und Uhrzeit passend zur Wanderroute wählen.',
          'Nur über offizielle Kanäle des Parks kaufen. Bei Unterkunft in der Lika Abfahrt mit dem gebuchten Slot abstimmen—früher Start bedeutet oft weniger Andrang.',
        ],
      },
      {
        heading: 'Vor der Zahlung prüfen',
        paragraphs: [
          'Welcher Eingang ist enthalten (z. B. Eingang 1 oder 2), Öffnungszeiten an diesem Tag und Regeln für Kinder, Studierende oder Gruppen.',
          'Bestätigung auf dem Handy speichern, Parken und Anreise planen. Für Übernachtung nahe dem Park Verfügbarkeit prüfen und direkt bei uns buchen.',
        ],
      },
    ],
  },
  {
    slug: 'kada-posjetiti-plitvicka-jezera',
    locale: 'it',
    title: 'Quando visitare Plitvice (stagione, affluenza, meteo)',
    description:
      'Migliori mesi per i Laghi di Plitvice, quando c’è più affluenza e come organizzare la giornata nel parco — con consigli per soggiornare in Lika.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '7 min',
    keywords: [
      'quando visitare plitvice',
      'affluenza laghi di plitvice',
      'periodo migliore plitvice',
      'stagione plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/kuca-za-odmor-plitvice',
    ],
    sections: [
      {
        heading: 'Stagione per mese: primavera, estate, autunno, inverno',
        paragraphs: [
          'Primavera e inizio autunno offrono temperature piacevoli e paesaggi verdi con meno affluenza rispetto al picco estivo. L’estate è la più richiesta—più visitatori, giornate lunghe, arrivo presto consigliato.',
          'In inverno l’atmosfera è più tranquilla—verificate orari e sentieri sul sito ufficiale del Parco nazionale dei Laghi di Plitvice prima del viaggio.',
        ],
      },
      {
        heading: 'Affluenza: weekend, festività, orario',
        paragraphs: [
          'Il picco è di solito in estate, soprattutto nei weekend e in alta stagione. Un mattino feriale spesso è il miglior compromesso tra meno folla e ritmo rilassato.',
          'In alta stagione pianificate ingresso presto ed evitate di comprimere tutto in un solo giorno di corsa—con troppa affluenza la qualità cala rapidamente.',
        ],
      },
      {
        heading: 'Meteo, scarpe e logistica del soggiorno',
        paragraphs: [
          'La pioggia può cambiare sentieri e foto, ma con scarpe adatte e strati leggeri il parco resta visitabile. Controllate le previsioni e portate acqua.',
          'Alloggiare in Lika vicino a Plitvice facilita partenze mattutine e rientri tranquilli—soprattutto per più giorni (vedi la guida su quanti giorni servono a Plitvice).',
        ],
      },
    ],
  },
  {
    slug: 'ulaznice-plitvicka-jezera-cijene',
    locale: 'it',
    title: 'Biglietti e prezzi Plitvice (+ come acquistare)',
    description:
      'Come acquistare i biglietti per i Laghi di Plitvice, cosa influenza il prezzo e consigli pratici per la prenotazione online della fascia oraria.',
    publishedAt: '2026-05-21',
    updatedAt: '2026-05-21',
    readingTime: '8 min',
    keywords: [
      'biglietti laghi di plitvice',
      'prezzo ingresso plitvice',
      'acquistare biglietti plitvice online',
      'biglietti parco plitvice',
    ],
    relatedLandingPages: [
      '/smjestaj-plitvicka-jezera',
      '/smjestaj-za-9-osoba-plitvice',
    ],
    sections: [
      {
        heading: 'Come funziona il prezzo del biglietto',
        paragraphs: [
          'Il prezzo dipende da stagione, età del visitatore e programma di visita scelto. Il parco applica tariffe stagionali—stesso giorno può costare diversamente in estate e fuori stagione.',
          'Prima del viaggio controllate listino e regole sul sito ufficiale (np-plitvicka-jezera.hr). Questa guida è informativa—prezzo e condizioni definitive solo sulla fonte ufficiale.',
        ],
      },
      {
        heading: 'Acquisto online e fascia oraria',
        paragraphs: [
          'In stagione l’acquisto online è pratico—meno attesa, migliore pianificazione. Scegliete ingresso, data e orario in base al percorso a piedi.',
          'Acquistate solo dai canali ufficiali del parco. Se soggiornate in Lika, allineate la partenza con lo slot prenotato—inizio presto spesso significa visita più tranquilla.',
        ],
      },
      {
        heading: 'Cosa verificare prima del pagamento',
        paragraphs: [
          'Quale ingresso è incluso (es. Ingresso 1 o 2), orari di apertura quel giorno e regole per bambini, studenti o gruppi se applicabili sconti.',
          'Salvate la conferma sul telefono e pianificate parcheggio e arrivo. Per il soggiorno vicino al parco controllate disponibilità e prenotate direttamente con noi.',
        ],
      },
    ],
  },
];
