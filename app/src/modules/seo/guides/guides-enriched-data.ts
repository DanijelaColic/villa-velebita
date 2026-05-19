import type { AppLocale } from "@/i18n/routing";
import type { GuideEnrichedFields } from "./guide-types";

type GuideContentSlug =
  | "sto-posjetiti-blizu-plitvickih-jezera"
  | "najbolje-aktivnosti-u-lici"
  | "obiteljski-odmor-blizu-plitvica"
  | "koliko-dana-treba-za-plitvice";

export const GUIDES_ENRICHED: Record<
  GuideContentSlug,
  Record<AppLocale, GuideEnrichedFields>
> = {
  "sto-posjetiti-blizu-plitvickih-jezera": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/placeholders/01-plitvice-lakes.svg",
        alt: "Placeholder motiv jezera i slapova za članak o okolici Plitvica.",
      },
      activitiesSectionTitle:
        "Aktivnosti i atrakcije koje se često kombiniraju",
      activities: [
        {
          title: "NP Plitvička jezera",
          description:
            "Glavni razlog dolaska — planirajte ulaz i tempo šetnje.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder jezera.",
        },
        {
          title: "Vidikovci i kraće rute",
          description: "Manje gužve, više zraka — dobar dodatak glavnom danu.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder Like.",
        },
        {
          title: "Lokalni izleti",
          description: "Poludnevni plan uz hranu i odmor.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder staze.",
        },
        {
          title: "Večer uz smještaj",
          description: "Privatnost i jacuzzi ako su vam bitni za kraj dana.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Želite smještaj koji paše uz ovaj itinerar?",
      midCtaBody:
        "Provjerite dostupnost i cjenik, zatim rezervirajte direktno za jednostavniju logistiku oko izleta.",
      midCtaBookingLabel: "Rezervacija",
      midCtaGalleryLabel: "Galerija",
      faqSectionTitle: "Česta pitanja",
      faqs: [
        {
          question: "Mogu li sve stići u jedan dan?",
          answer:
            "Ovisi o tempu; realnije je odabrati prioritete ili produljiti boravak.",
        },
        {
          question: "Je li potreban auto?",
          answer:
            "Za većinu kombinacija u okolici praktičan je vlastiti prijevoz.",
        },
        {
          question: "Kada su najveće gužve?",
          answer:
            "Često kasnije ujutro i ranije poslijepodne — raniji start pomaže.",
        },
        {
          question: "Gdje odsjesti?",
          answer:
            "Smještaj u Lici često znači mirniju noć i kraće vožnje prema parku.",
        },
      ],
      relatedLandingsTitle: "Povezane stranice za rezervaciju",
      relatedLandingsIntro:
        "Odaberite smještaj koji odgovara vašem planu oko Plitvica.",
    },
    en: {
      eyebrow: "Guide",
      coverImage: {
        src: "/images/placeholders/01-plitvice-lakes.svg",
        alt: "Placeholder lakes illustration for the nearby attractions guide.",
      },
      activitiesSectionTitle: "Activities travelers often combine",
      activities: [
        {
          title: "Plitvice Lakes National Park",
          description: "The headline visit—plan entry timing and walking pace.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder lakes.",
        },
        {
          title: "Viewpoints and short routes",
          description: "Lower crowds and fresh air as a lighter add-on.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder hills.",
        },
        {
          title: "Local half-day ideas",
          description: "Food stops and slower pacing between outings.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder trail.",
        },
        {
          title: "Evenings at your base",
          description: "Privacy and jacuzzi recovery if that matters to you.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Want a stay that fits this itinerary?",
      midCtaBody:
        "Check availability and pricing, then book directly for simpler trip logistics.",
      midCtaBookingLabel: "Book now",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Can I see everything in one day?",
          answer: "It depends on pace; pick priorities or extend your stay.",
        },
        {
          question: "Do I need a car?",
          answer: "For most nearby combinations, having a car is practical.",
        },
        {
          question: "When are crowds highest?",
          answer: "Often late morning—earlier starts usually help.",
        },
        {
          question: "Where should I stay?",
          answer: "A Lika base often means quieter nights and shorter drives.",
        },
      ],
      relatedLandingsTitle: "Related booking pages",
      relatedLandingsIntro:
        "Choose accommodation that matches your Plitvice plans.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/placeholders/01-plitvice-lakes.svg",
        alt: "Platzhalter Seen-Motiv für den Leitfaden.",
      },
      activitiesSectionTitle: "Häufig kombinierte Aktivitäten",
      activities: [
        {
          title: "Nationalpark Plitvicer Seen",
          description: "Hauptmotiv—Eintritt und Tempo planen.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Platzhalter Seen.",
        },
        {
          title: "Aussichtspunkte und kurze Routen",
          description: "Weniger Trubel, mehr Natur.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Platzhalter Hügel.",
        },
        {
          title: "Halbtagsideen",
          description: "Genusspausen zwischen den Ausflügen.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Platzhalter Trail.",
        },
        {
          title: "Abende in der Unterkunft",
          description: "Privatsphäre und Jacuzzi-Erholung.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Platzhalter Jacuzzi.",
        },
      ],
      midCtaTitle: "Passende Unterkunft zum Plan?",
      midCtaBody: "Verfügbarkeit und Preise prüfen, dann direkt buchen.",
      midCtaBookingLabel: "Jetzt buchen",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Alles an einem Tag?",
          answer:
            "Nur bei sehr straffem Programm realistisch—lieber priorisieren.",
        },
        {
          question: "Auto nötig?",
          answer: "Für die meisten Kombinationen sehr praktisch.",
        },
        {
          question: "Wann ist am vollsten?",
          answer: "Oft später vormittags—früher starten hilft.",
        },
        {
          question: "Wo übernachten?",
          answer: "Lika bietet oft ruhigere Nächte und kurze Fahrten.",
        },
      ],
      relatedLandingsTitle: "Verwandte Buchungsseiten",
      relatedLandingsIntro: "Unterkunft passend zu Ihrem Plitvice-Plan wählen.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/placeholders/01-plitvice-lakes.svg",
        alt: "Illustrazione placeholder laghi per la guida.",
      },
      activitiesSectionTitle: "Attività spesso abbinate",
      activities: [
        {
          title: "Parco di Plitvice",
          description:
            "Motivo principale del viaggio—pianificare ingressi e ritmi.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder laghi.",
        },
        {
          title: "Belvedere e percorsi brevi",
          description: "Meno affluenza, più aria aperta.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder colline.",
        },
        {
          title: "Mezze giornate locali",
          description: "Pause gastronomiche tra un’uscita e l’altra.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder sentiero.",
        },
        {
          title: "Sere nella base",
          description: "Privacy e recupero in jacuzzi se fa al caso vostro.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Volete un alloggio adatto a questo itinerario?",
      midCtaBody:
        "Controllate disponibilità e prezzi, poi prenotate direttamente.",
      midCtaBookingLabel: "Prenota",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Si può fare tutto in un giorno?",
          answer: "Dipende dal ritmo; meglio priorità o soggiorno più lungo.",
        },
        {
          question: "Serve l’auto?",
          answer: "Per molte combinazioni è la scelta più pratica.",
        },
        {
          question: "Quando c’è più affluenza?",
          answer: "Spesso a metà mattina—partenza anticipata aiuta.",
        },
        {
          question: "Dove alloggiare?",
          answer:
            "La Lika offre spesso notti più tranquille e trasferimenti brevi.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per prenotare",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano su Plitvice.",
    },
  },
  "najbolje-aktivnosti-u-lici": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/placeholders/06-trail-hiking.svg",
        alt: "Placeholder šetnje u prirodi za članak o aktivnostima u Lici.",
      },
      activitiesSectionTitle: "Ideje po intenzitetu",
      activities: [
        {
          title: "Lagane šetnje",
          description: "Dan za oporavak između intenzivnijih izleta.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder brda.",
        },
        {
          title: "NP Plitvička jezera",
          description: "Aktivan klasik — planirajte obuću i vodu.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder jezera.",
        },
        {
          title: "Obiteljski format",
          description: "Kratke aktivnosti + pauze — manje stresa.",
          image: "/images/placeholders/05-family-nature.svg",
          imageAlt: "Placeholder obitelji.",
        },
        {
          title: "Jacuzzi navečer",
          description: "Zatvaranje dana uz toplu kupku i mir.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Tražite bazu za aktivne dane?",
      midCtaBody:
        "Villa Velebita je smještaj s naglaskom na prirodu, mir i direktnu rezervaciju.",
      midCtaBookingLabel: "Rezervacija",
      midCtaGalleryLabel: "Galerija",
      faqSectionTitle: "Česta pitanja",
      faqs: [
        {
          question: "Je li Lika samo Plitvice?",
          answer:
            "Ne — ima i mirnijih prirodnih kutaka za uravnotežen program.",
        },
        {
          question: "Kako izbjeći preopterećenje?",
          answer: "Miješajte intenzitet i uvijek ubacite odmor.",
        },
        {
          question: "Što s kišnim danom?",
          answer: "Lagani planovi uz kuću ili kraći izleti u okolici.",
        },
        {
          question: "Je li jacuzzi bitan?",
          answer:
            "Za wellness naglasak pogledajte i tematsku stranicu vile s jacuzzijem.",
        },
      ],
      relatedLandingsTitle: "Povezane stranice za rezervaciju",
      relatedLandingsIntro:
        "Odaberite smještaj koji odgovara vašem planu oko Plitvica.",
    },
    en: {
      eyebrow: "Guide",
      coverImage: {
        src: "/images/placeholders/06-trail-hiking.svg",
        alt: "Placeholder trail illustration for activities in Lika guide.",
      },
      activitiesSectionTitle: "Ideas by intensity",
      activities: [
        {
          title: "Gentle walks",
          description: "Recovery days between bigger outings.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder hills.",
        },
        {
          title: "Plitvice Lakes NP",
          description: "Classic active day—shoes and water matter.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder lakes.",
        },
        {
          title: "Family-friendly pacing",
          description: "Short activities + breaks = less stress.",
          image: "/images/placeholders/05-family-nature.svg",
          imageAlt: "Placeholder family.",
        },
        {
          title: "Evening jacuzzi",
          description: "End the day with warmth and quiet.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Need a base for active days?",
      midCtaBody: "Villa Velebita focuses on nature, calm, and direct booking.",
      midCtaBookingLabel: "Book now",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Is Lika only Plitvice?",
          answer: "No—there are quieter nature corners for balance.",
        },
        {
          question: "How do I avoid burnout?",
          answer: "Mix intensity and schedule real rest.",
        },
        {
          question: "Rainy day options?",
          answer: "Slower plans at the house or shorter nearby outings.",
        },
        {
          question: "What about jacuzzi?",
          answer: "See the dedicated jacuzzi villa landing for that emphasis.",
        },
      ],
      relatedLandingsTitle: "Related booking pages",
      relatedLandingsIntro:
        "Choose accommodation that matches your Plitvice plans.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/placeholders/06-trail-hiking.svg",
        alt: "Platzhalter Wanderweg für Aktivitäten in Lika.",
      },
      activitiesSectionTitle: "Ideen nach Intensität",
      activities: [
        {
          title: "Leichte Wanderungen",
          description: "Erholungstage zwischen intensiveren Programmen.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Platzhalter Hügel.",
        },
        {
          title: "Nationalpark Plitvicer Seen",
          description: "Klassiker—Ausrüstung und Wasser mitdenken.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Platzhalter Seen.",
        },
        {
          title: "Familientempo",
          description: "Kurze Aktivitäten plus Pausen.",
          image: "/images/placeholders/05-family-nature.svg",
          imageAlt: "Platzhalter Familie.",
        },
        {
          title: "Abend im Jacuzzi",
          description: "Warm und ruhig ausklingen lassen.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Platzhalter Jacuzzi.",
        },
      ],
      midCtaTitle: "Basis für aktive Tage gesucht?",
      midCtaBody: "Villa Velebita setzt auf Natur, Ruhe und Direktbuchung.",
      midCtaBookingLabel: "Jetzt buchen",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Ist Lika nur Plitvice?",
          answer: "Nein—es gibt ruhigere Naturabschnitte für Balance.",
        },
        {
          question: "Burnout vermeiden?",
          answer: "Intensität mischen und echte Pausen einplanen.",
        },
        {
          question: "Bei Regen?",
          answer: "Langsamere Pläne im Haus oder kurze Ausflüge.",
        },
        {
          question: "Jacuzzi?",
          answer: "Siehe Landingpage Villa mit Jacuzzi.",
        },
      ],
      relatedLandingsTitle: "Verwandte Buchungsseiten",
      relatedLandingsIntro: "Unterkunft passend zu Ihrem Plitvice-Plan wählen.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/placeholders/06-trail-hiking.svg",
        alt: "Placeholder sentiero per attività in Lika.",
      },
      activitiesSectionTitle: "Idee per intensità",
      activities: [
        {
          title: "Passeggiate leggere",
          description: "Giorni di recupero tra uscite più intense.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder colline.",
        },
        {
          title: "Parco di Plitvice",
          description: "Classico attivo—scarpe e acqua.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder laghi.",
        },
        {
          title: "Ritmo famiglia",
          description: "Attività brevi e pause.",
          image: "/images/placeholders/05-family-nature.svg",
          imageAlt: "Placeholder famiglia.",
        },
        {
          title: "Jacuzzi la sera",
          description: "Chiudere la giornata con calore e silenzio.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Vi serve una base per giornate attive?",
      midCtaBody:
        "Villa Velebita punta su natura, calma e prenotazione diretta.",
      midCtaBookingLabel: "Prenota",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "La Lika è solo Plitvice?",
          answer: "No—ci sono angoli più tranquilli per bilanciare.",
        },
        {
          question: "Come evitare stanchezza?",
          answer: "Alternare intensità e prevedere riposo.",
        },
        {
          question: "E se piove?",
          answer: "Giornate lente in casa o uscite brevi.",
        },
        {
          question: "Jacuzzi?",
          answer: "Vedete la landing dedicata villa con jacuzzi.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per prenotare",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano su Plitvice.",
    },
  },
  "obiteljski-odmor-blizu-plitvica": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/placeholders/05-family-nature.svg",
        alt: "Placeholder obitelji u prirodi za članak o obiteljskom odmoru.",
      },
      activitiesSectionTitle: "Aktivnosti koje obiteljima dobro funkcioniraju",
      activities: [
        {
          title: "Kraće šetnje",
          description: "Manje “sjedenja u autu”, više igre na otvorenom.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder staze.",
        },
        {
          title: "NP Plitvička jezera",
          description: "Planirajte pauze i realan tempo za djecu.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder jezera.",
        },
        {
          title: "Dan uz smještaj",
          description: "Igra, odmor, jednostavna večera — reset za sve.",
          image: "/images/placeholders/03-villa-outdoor.svg",
          imageAlt: "Placeholder kuće.",
        },
        {
          title: "Lagani izlet u Lici",
          description: "Kad treba promjena ritma bez dugih transfera.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder Like.",
        },
      ],
      midCtaTitle: "Tražite miran smještaj za obitelj?",
      midCtaBody:
        "Kuća za odmor i veći kapaciteti pomažu organizaciji — provjerite dostupnost direktno.",
      midCtaBookingLabel: "Rezervacija",
      midCtaGalleryLabel: "Galerija",
      faqSectionTitle: "Česta pitanja",
      faqs: [
        {
          question: "Kako smanjiti stres djeci?",
          answer: "Kraći segmenti dana i predvidljiv raspored.",
        },
        {
          question: "Je li smještaj dovoljno prostran?",
          answer: "Za veće obitelji pogledajte i opciju do devet osoba.",
        },
        {
          question: "Kada ići u park?",
          answer: "Često ujutro, uz pauze i realna očekivanja.",
        },
        {
          question: "Treba li jacuzzi?",
          answer: "Nije nužan, ali je popularan za večernji odmor roditelja.",
        },
      ],
      relatedLandingsTitle: "Povezane stranice za rezervaciju",
      relatedLandingsIntro:
        "Odaberite smještaj koji odgovara vašem planu oko Plitvica.",
    },
    en: {
      eyebrow: "Guide",
      coverImage: {
        src: "/images/placeholders/05-family-nature.svg",
        alt: "Placeholder family outdoors for the family travel guide.",
      },
      activitiesSectionTitle: "Family-friendly activity patterns",
      activities: [
        {
          title: "Shorter walks",
          description: "Less car time, more outdoor play.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder trail.",
        },
        {
          title: "Plitvice NP",
          description: "Plan breaks and realistic pacing for kids.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder lakes.",
        },
        {
          title: "Home day",
          description: "Games, rest, simple dinner—a reset for everyone.",
          image: "/images/placeholders/03-villa-outdoor.svg",
          imageAlt: "Placeholder house.",
        },
        {
          title: "Easy Lika outing",
          description: "Change the rhythm without long transfers.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder hills.",
        },
      ],
      midCtaTitle: "Looking for a calm family base?",
      midCtaBody:
        "A holiday house and larger capacities help logistics—check availability directly.",
      midCtaBookingLabel: "Book now",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "How do I reduce stress for kids?",
          answer: "Shorter day segments and predictable timing.",
        },
        {
          question: "Is there enough space?",
          answer:
            "For bigger families, also check the up-to-nine guest option.",
        },
        {
          question: "When should we visit the park?",
          answer: "Often mornings work best—add breaks.",
        },
        {
          question: "Do we need a jacuzzi?",
          answer: "Not required, but popular for parents’ evening recovery.",
        },
      ],
      relatedLandingsTitle: "Related booking pages",
      relatedLandingsIntro:
        "Choose accommodation that matches your Plitvice plans.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/placeholders/05-family-nature.svg",
        alt: "Platzhalter Familie in der Natur.",
      },
      activitiesSectionTitle: "Familientaugliche Muster",
      activities: [
        {
          title: "Kürzere Wanderungen",
          description: "Weniger Auto, mehr draußen spielen.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Platzhalter Trail.",
        },
        {
          title: "Nationalpark",
          description: "Pausen und realistisches Tempo für Kinder.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Platzhalter Seen.",
        },
        {
          title: "Tag in der Unterkunft",
          description: "Spiel, Ruhe, einfaches Abendessen.",
          image: "/images/placeholders/03-villa-outdoor.svg",
          imageAlt: "Platzhalter Haus.",
        },
        {
          title: "Leichter Lika-Ausflug",
          description: "Wechsel des Rhythmus ohne lange Fahrten.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Platzhalter Hügel.",
        },
      ],
      midCtaTitle: "Ruhige Familienbasis gesucht?",
      midCtaBody:
        "Ferienhaus und größere Kapazitäten helfen—direkt Verfügbarkeit prüfen.",
      midCtaBookingLabel: "Jetzt buchen",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Weniger Stress für Kinder?",
          answer: "Kürzere Tagesabschnitte und klare Zeiten.",
        },
        {
          question: "Genug Platz?",
          answer: "Für größere Familien auch Option bis neun Personen prüfen.",
        },
        {
          question: "Wann in den Park?",
          answer: "Oft vormittags—mit Pausen.",
        },
        {
          question: "Jacuzzi nötig?",
          answer: "Nicht nötig, aber beliebt für Eltern abends.",
        },
      ],
      relatedLandingsTitle: "Verwandte Buchungsseiten",
      relatedLandingsIntro: "Unterkunft passend zu Ihrem Plitvice-Plan wählen.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/placeholders/05-family-nature.svg",
        alt: "Placeholder famiglia per guida viaggio.",
      },
      activitiesSectionTitle: "Schemi adatti alle famiglie",
      activities: [
        {
          title: "Passeggiate brevi",
          description: "Meno auto, più gioco all’aperto.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder sentiero.",
        },
        {
          title: "Parco di Plitvice",
          description: "Pause e ritmi realistici per i bambini.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder laghi.",
        },
        {
          title: "Giornata in casa",
          description: "Giochi, riposo, cena semplice.",
          image: "/images/placeholders/03-villa-outdoor.svg",
          imageAlt: "Placeholder casa.",
        },
        {
          title: "Uscita leggera in Lika",
          description: "Cambia ritmo senza lunghi trasferimenti.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder colline.",
        },
      ],
      midCtaTitle: "Cercate una base tranquilla per la famiglia?",
      midCtaBody:
        "Casa vacanze e capienze maggiori aiutano la logistica—controllate la disponibilità direttamente.",
      midCtaBookingLabel: "Prenota",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Come ridurre lo stress dei bambini?",
          answer: "Segmenti più corti e orari chiari.",
        },
        {
          question: "C’è abbastanza spazio?",
          answer:
            "Per famiglie numerose valutate anche l’opzione fino a nove ospiti.",
        },
        {
          question: "Quando andare al parco?",
          answer: "Spesso la mattina, con pause.",
        },
        {
          question: "Serve la jacuzzi?",
          answer: "Non obbligatoria, ma apprezzata la sera dai genitori.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per prenotare",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano su Plitvice.",
    },
  },
  "koliko-dana-treba-za-plitvice": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/placeholders/03-villa-outdoor.svg",
        alt: "Placeholder kuće za članak o duljini boravka na Plitvicama.",
      },
      activitiesSectionTitle: "Kako iskoristiti 1, 2 ili 3 dana",
      activities: [
        {
          title: "1 dan — fokus",
          description: "Jedna glavna ruta i miran tempo.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder jezera.",
        },
        {
          title: "2 dana — balans",
          description: "Park + jedan lakši dan u okolici.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder Like.",
        },
        {
          title: "3 dana — širina",
          description: "Plitvice + dodatni izleti bez žurbe.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder staze.",
        },
        {
          title: "Večeri za oporavak",
          description: "Jacuzzi i privatnost ako želite zatvoriti dan ugodno.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Planirate više noćenja uz Plitvice?",
      midCtaBody:
        "Direktna rezervacija pomaže složiti datume i cjenik prije sezone gužve.",
      midCtaBookingLabel: "Rezervacija",
      midCtaGalleryLabel: "Galerija",
      faqSectionTitle: "Česta pitanja",
      faqs: [
        {
          question: "Je li jedan dan dovoljan?",
          answer: "Može biti, ali često je uživanje veće uz dva dana.",
        },
        {
          question: "Kako rasporediti snagu?",
          answer: "Teži dio ujutro, lakše popodne.",
        },
        {
          question: "Gdje spavati za više dana?",
          answer: "Smještaj u blizini skraćuje vožnje i štedi energiju.",
        },
        {
          question: "Je li jacuzzi važan nakon šetnji?",
          answer: "Mnogim gostima jest — pogledajte tematsku stranicu.",
        },
      ],
      relatedLandingsTitle: "Povezane stranice za rezervaciju",
      relatedLandingsIntro:
        "Odaberite smještaj koji odgovara vašem planu oko Plitvica.",
    },
    en: {
      eyebrow: "Guide",
      coverImage: {
        src: "/images/placeholders/03-villa-outdoor.svg",
        alt: "Placeholder house for trip length guide.",
      },
      activitiesSectionTitle: "How to use 1, 2, or 3 days",
      activities: [
        {
          title: "1 day — focus",
          description: "One main route and a calm pace.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder lakes.",
        },
        {
          title: "2 days — balance",
          description: "Park + one lighter local day.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder hills.",
        },
        {
          title: "3 days — breadth",
          description: "Plitvice + extra outings without rushing.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder trail.",
        },
        {
          title: "Recovery evenings",
          description: "Jacuzzi and privacy if you want a soft finish.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Planning multiple nights near Plitvice?",
      midCtaBody:
        "Direct booking helps align dates and pricing before peak demand.",
      midCtaBookingLabel: "Book now",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Is one day enough?",
          answer: "It can work, but two days often feels richer.",
        },
        {
          question: "How should I pace energy?",
          answer: "Harder blocks in the morning, lighter afternoons.",
        },
        {
          question: "Where to stay for multi-day trips?",
          answer: "A nearby base saves driving and energy.",
        },
        {
          question: "Is jacuzzi helpful after hiking?",
          answer: "Many guests say yes—see the dedicated landing page.",
        },
      ],
      relatedLandingsTitle: "Related booking pages",
      relatedLandingsIntro:
        "Choose accommodation that matches your Plitvice plans.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/placeholders/03-villa-outdoor.svg",
        alt: "Platzhalter Haus für Aufenthaltsdauer.",
      },
      activitiesSectionTitle: "1, 2 oder 3 Tage sinnvoll nutzen",
      activities: [
        {
          title: "1 Tag — Fokus",
          description: "Eine Hauptroute, ruhiges Tempo.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Platzhalter Seen.",
        },
        {
          title: "2 Tage — Balance",
          description: "Park plus ein leichter Tag.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Platzhalter Hügel.",
        },
        {
          title: "3 Tage — Breite",
          description: "Plitvice plus weitere Ausflüge ohne Hetze.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Platzhalter Trail.",
        },
        {
          title: "Erholungsabende",
          description: "Jacuzzi und Privatsphäre.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Platzhalter Jacuzzi.",
        },
      ],
      midCtaTitle: "Mehrere Nächte nahe Plitvice?",
      midCtaBody:
        "Direktbuchung hilft bei Terminen und Preisen vor Hochsaison.",
      midCtaBookingLabel: "Jetzt buchen",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "FAQ",
      faqs: [
        {
          question: "Reicht ein Tag?",
          answer: "Möglich, aber zwei Tage wirken oft reicher.",
        },
        {
          question: "Energie einteilen?",
          answer: "Vormittags intensiver, nachmittags leichter.",
        },
        {
          question: "Unterkunft für mehrere Tage?",
          answer: "Nahe gelegen spart Fahrzeit und Energie.",
        },
        {
          question: "Jacuzzi nach Wandern?",
          answer: "Viele Gäste sagen ja—siehe Landingpage.",
        },
      ],
      relatedLandingsTitle: "Verwandte Buchungsseiten",
      relatedLandingsIntro: "Unterkunft passend zu Ihrem Plitvice-Plan wählen.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/placeholders/03-villa-outdoor.svg",
        alt: "Placeholder casa per guida durata.",
      },
      activitiesSectionTitle: "Come usare 1, 2 o 3 giorni",
      activities: [
        {
          title: "1 giorno — focus",
          description: "Un percorso principale e ritmo calmo.",
          image: "/images/placeholders/01-plitvice-lakes.svg",
          imageAlt: "Placeholder laghi.",
        },
        {
          title: "2 giorni — equilibrio",
          description: "Parco più un giorno leggero.",
          image: "/images/placeholders/02-lika-hills.svg",
          imageAlt: "Placeholder colline.",
        },
        {
          title: "3 giorni — ampiezza",
          description: "Plitvice più altre uscite senza fretta.",
          image: "/images/placeholders/06-trail-hiking.svg",
          imageAlt: "Placeholder sentiero.",
        },
        {
          title: "Sere di recupero",
          description: "Jacuzzi e privacy se volete chiudere dolcemente.",
          image: "/images/placeholders/04-jacuzzi-relax.svg",
          imageAlt: "Placeholder jacuzzi.",
        },
      ],
      midCtaTitle: "Pianificate più notti vicino a Plitvice?",
      midCtaBody:
        "La prenotazione diretta aiuta su date e prezzi prima dell’alta stagione.",
      midCtaBookingLabel: "Prenota",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Basta un giorno?",
          answer: "Si può, ma due giorni spesso danno più soddisfazione.",
        },
        {
          question: "Come gestire le energie?",
          answer: "Mattina più impegnativa, pomeriggio più leggero.",
        },
        {
          question: "Dove dormire per più giorni?",
          answer: "Una base vicina riduce spostamenti e fatica.",
        },
        {
          question: "Jacuzzi dopo le camminate?",
          answer: "Molti ospiti la apprezzano—vedi la landing dedicata.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per prenotare",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano su Plitvice.",
    },
  },
};
