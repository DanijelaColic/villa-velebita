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
        src: "/images/seo/guides/plitvicka_jezera.png",
        alt: "Plitvička jezera i slapovi — naslovna fotografija vodiča o okolici parka.",
      },
      activitiesSectionTitle:
        "Aktivnosti i atrakcije koje se često kombiniraju",
      activities: [
        {
          title: "NP Plitvička jezera",
          description:
            "Glavni razlog dolaska — planirajte ulaz i tempo šetnje.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Nacionalni park Plitvička jezera — jezera i šetnje.",
        },
        {
          title: "Vidikovci i kraće rute",
          description: "Manje gužve, više zraka — dobar dodatak glavnom danu.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Vidikovci i brdski krajolik Like.",
        },
        {
          title: "Lokalni izleti",
          description: "Poludnevni plan uz hranu i odmor.",
          image: "/images/seo/guides/rastoke.jpg",
          imageAlt: "Rastoke i poludnevni izlet u okolici.",
        },
        {
          title: "Večer uz smještaj",
          description: "Privatnost i jacuzzi ako su vam bitni za kraj dana.",
          image: "/images/seo/guides/odmor_u_kuci.png",
          imageAlt: "Večernji odmor uz bazen i jacuzzi u vili.",
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
        src: "/images/seo/guides/plitvicka_jezera.png",
        alt: "Plitvice Lakes and waterfalls — hero image for the guide to the surrounding area.",
      },
      activitiesSectionTitle: "Activities and sights often combined",
      activities: [
        {
          title: "Plitvice Lakes National Park",
          description:
            "The main reason to visit—plan entry and walking pace.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvice Lakes National Park — lakes and walking routes.",
        },
        {
          title: "Viewpoints and shorter routes",
          description:
            "Fewer crowds, more fresh air—a good add-on to the main day.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Viewpoints and hillside scenery in Lika.",
        },
        {
          title: "Local day trips",
          description: "A half-day plan with food and rest.",
          image: "/images/seo/guides/rastoke.jpg",
          imageAlt: "Rastoke waterfalls and a half-day local trip.",
        },
        {
          title: "Evening at your stay",
          description:
            "Privacy and a jacuzzi if that matters for the end of the day.",
          image: "/images/seo/guides/odmor_u_kuci.png",
          imageAlt: "Evening relaxation by the pool and jacuzzi at the villa.",
        },
      ],
      midCtaTitle: "Want accommodation that fits this itinerary?",
      midCtaBody:
        "Check availability and pricing, then book directly for simpler logistics around your trips.",
      midCtaBookingLabel: "Booking",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "Frequently asked questions",
      faqs: [
        {
          question: "Can I fit everything into one day?",
          answer:
            "It depends on pace; it is more realistic to choose priorities or extend your stay.",
        },
        {
          question: "Do I need a car?",
          answer:
            "For most combinations in the area, your own transport is practical.",
        },
        {
          question: "When are the biggest crowds?",
          answer:
            "Often later in the morning and earlier in the afternoon—an earlier start helps.",
        },
        {
          question: "Where should I stay?",
          answer:
            "Accommodation in Lika often means a quieter night and shorter drives to the park.",
        },
      ],
      relatedLandingsTitle: "Related pages for booking",
      relatedLandingsIntro:
        "Choose accommodation that matches your plan around Plitvice.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/seo/guides/plitvicka_jezera.png",
        alt: "Plitvicer Seen und Wasserfälle — Titelbild zum Artikel über die Umgebung.",
      },
      activitiesSectionTitle: "Aktivitäten und Sehenswürdigkeiten, die oft kombiniert werden",
      activities: [
        {
          title: "Nationalpark Plitvicer Seen",
          description:
            "Hauptgrund der Anreise—Eintritt und Wandertempo planen.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Nationalpark Plitvicer Seen — Seen und Wanderwege.",
        },
        {
          title: "Aussichtspunkte und kürzere Routen",
          description:
            "Weniger Andrang, mehr frische Luft—gute Ergänzung zum Haupttag.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Aussichtspunkte und Hügellandschaft in der Lika.",
        },
        {
          title: "Lokale Tagesausflüge",
          description: "Halbtagesplan mit Essen und Pause.",
          image: "/images/seo/guides/rastoke.jpg",
          imageAlt: "Rastoke und ein halbtägiger Ausflug in der Region.",
        },
        {
          title: "Abend an der Unterkunft",
          description:
            "Privatsphäre und Jacuzzi, wenn das für den Tagesausklang wichtig ist.",
          image: "/images/seo/guides/odmor_u_kuci.png",
          imageAlt: "Abendliche Erholung am Pool und Jacuzzi der Villa.",
        },
      ],
      midCtaTitle: "Unterkunft, die zu diesem Itinerar passt?",
      midCtaBody:
        "Verfügbarkeit und Preise prüfen, dann direkt buchen – für einfachere Logistik rund um Ausflüge.",
      midCtaBookingLabel: "Buchung",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "Häufig gestellte Fragen",
      faqs: [
        {
          question: "Schaffe ich alles an einem Tag?",
          answer:
            "Das hängt vom Tempo ab; realistischer sind Prioritäten oder ein längerer Aufenthalt.",
        },
        {
          question: "Brauche ich ein Auto?",
          answer:
            "Für die meisten Kombinationen in der Umgebung ist eigenes Transportmittel praktisch.",
        },
        {
          question: "Wann ist am meisten los?",
          answer:
            "Oft später am Morgen und früher am Nachmittag—ein früher Start hilft.",
        },
        {
          question: "Wo übernachten?",
          answer:
            "Unterkunft in der Lika bedeutet oft ruhigere Nächte und kürzere Fahrten zum Park.",
        },
      ],
      relatedLandingsTitle: "Verwandte Seiten zur Buchung",
      relatedLandingsIntro:
        "Unterkunft wählen, die zu Ihrem Plan rund um Plitvice passt.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/seo/guides/plitvicka_jezera.png",
        alt: "Laghi di Plitvice e cascate — immagine principale sulla zona circostante.",
      },
      activitiesSectionTitle: "Attività e attrazioni spesso combinate",
      activities: [
        {
          title: "Parco nazionale dei Laghi di Plitvice",
          description:
            "Motivo principale della visita—pianificate ingresso e ritmo della passeggiata.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Parco nazionale Laghi di Plitvice — laghi e percorsi pedonali.",
        },
        {
          title: "Belvedere e percorsi più corti",
          description:
            "Meno folla, più aria fresca—buon complemento alla giornata principale.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Belvedere e paesaggio collinare della Lika.",
        },
        {
          title: "Gite locali",
          description: "Programma di mezza giornata con cibo e riposo.",
          image: "/images/seo/guides/rastoke.jpg",
          imageAlt: "Rastoke e gita di mezza giornata nei dintorni.",
        },
        {
          title: "Sera presso l’alloggio",
          description:
            "Privacy e jacuzzi se conta per chiudere bene la giornata.",
          image: "/images/seo/guides/odmor_u_kuci.png",
          imageAlt: "Relax serale a bordo piscina e jacuzzi in villa.",
        },
      ],
      midCtaTitle: "Cercate un alloggio adatto a questo itinerario?",
      midCtaBody:
        "Controllate disponibilità e prezzi, poi prenotate direttamente per una logistica più semplice intorno alle gite.",
      midCtaBookingLabel: "Prenotazione",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Si riesce a vedere tutto in un giorno?",
          answer:
            "Dipende dal ritmo; è più realistico scegliere priorità o prolungare il soggiorno.",
        },
        {
          question: "Serve l’auto?",
          answer:
            "Per la maggior parte delle combinazioni nella zona il proprio mezzo è pratico.",
        },
        {
          question: "Quando c’è più affluenza?",
          answer:
            "Spesso più tardi al mattino e all’inizio del pomeriggio—partire presto aiuta.",
        },
        {
          question: "Dove alloggiare?",
          answer:
            "Un alloggio in Lika spesso significa notti più tranquille e tragitti brevi verso il parco.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per la prenotazione",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano intorno a Plitvice.",
    },
  },
  "najbolje-aktivnosti-u-lici": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/seo/guides/lika.jpg",
        alt: "Šetnja kroz prirodu Like — naslovna slika vodiča o aktivnostima u regiji.",
      },
      activitiesSectionTitle: "Ideje po intenzitetu",
      activities: [
        {
          title: "Lagane šetnje",
          description: "Dan za oporavak između intenzivnijih izleta.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Lagane šetnje i vidikovci u okolici.",
        },
        {
          title: "NP Plitvička jezera",
          description: "Aktivan klasik — planirajte obuću i vodu.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvička jezera — aktivna posjeta nacionalnom parku.",
        },
        {
          title: "Obiteljski format",
          description: "Kratke aktivnosti + pauze — manje stresa.",
          image: "/images/seo/guides/zip-line.jpg",
          imageAlt: "Zip-line i adrenalinski sadržaji u prirodi.",
        },
        {
          title: "Jacuzzi navečer",
          description: "Zatvaranje dana uz toplu kupku i mir.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Opuštanje u jacuzziju nakon aktivnog dana.",
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
        src: "/images/seo/guides/lika.jpg",
        alt: "Walk in the Lika countryside — cover image for the regional activities guide.",
      },
      activitiesSectionTitle: "Ideas by intensity",
      activities: [
        {
          title: "Gentle walks",
          description: "Recovery days between bigger outings.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Easy walks and scenic viewpoints nearby.",
        },
        {
          title: "Plitvice Lakes NP",
          description: "Classic active day—shoes and water matter.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvice Lakes — an active day in the national park.",
        },
        {
          title: "Family-friendly pacing",
          description: "Short activities + breaks = less stress.",
          image: "/images/seo/guides/zip-line.jpg",
          imageAlt: "Zip-line and adventure activities in nature.",
        },
        {
          title: "Evening jacuzzi",
          description: "End the day with warmth and quiet.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Relaxing in the jacuzzi after an active day.",
        },
      ],
      midCtaTitle: "Looking for a base for active days?",
      midCtaBody:
        "Villa Velebita is a stay focused on nature, calm, and direct booking.",
      midCtaBookingLabel: "Booking",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "Frequently asked questions",
      faqs: [
        {
          question: "Is Lika only about Plitvice?",
          answer:
            "No—there are quieter nature spots too for a balanced programme.",
        },
        {
          question: "How do I avoid overdoing it?",
          answer: "Mix intensity levels and always build in rest.",
        },
        {
          question: "What if it rains?",
          answer: "Lighter plans at the house or shorter trips nearby.",
        },
        {
          question: "Does the jacuzzi matter?",
          answer:
            "For a wellness focus, see the dedicated villa with jacuzzi page.",
        },
      ],
      relatedLandingsTitle: "Related pages for booking",
      relatedLandingsIntro:
        "Choose accommodation that matches your plan around Plitvice.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/seo/guides/lika.jpg",
        alt: "Spaziergang in der Natur der Lika — Titelbild zum Aktivitätenführer der Region.",
      },
      activitiesSectionTitle: "Ideen nach Intensität",
      activities: [
        {
          title: "Leichte Spaziergänge",
          description: "Erholungstage zwischen intensiveren Ausflügen.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Leichte Wanderungen und Aussichtspunkte in der Umgebung.",
        },
        {
          title: "Nationalpark Plitvicer Seen",
          description: "Aktiver Klassiker—Schuhe und Wasser einplanen.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvicer Seen — aktiver Tag im Nationalpark.",
        },
        {
          title: "Familientempo",
          description: "Kurze Aktivitäten plus Pausen—weniger Stress.",
          image: "/images/seo/guides/zip-line.jpg",
          imageAlt: "Zip-line und Abenteuerangebote in der Natur.",
        },
        {
          title: "Jacuzzi am Abend",
          description: "Warmes Bad und Ruhe zum Tagesausklang.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Entspannung im Jacuzzi nach einem aktiven Tag.",
        },
      ],
      midCtaTitle: "Basis für aktive Tage gesucht?",
      midCtaBody:
        "Villa Velebita ist eine Unterkunft mit Fokus auf Natur, Ruhe und Direktbuchung.",
      midCtaBookingLabel: "Buchung",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "Häufig gestellte Fragen",
      faqs: [
        {
          question: "Ist die Lika nur Plitvice?",
          answer:
            "Nein—es gibt auch ruhigere Naturwinkel für ein ausgewogenes Programm.",
        },
        {
          question: "Wie Überforderung vermeiden?",
          answer: "Intensität mischen und immer Pausen einbauen.",
        },
        {
          question: "Was bei Regen?",
          answer: "Leichtere Pläne am Haus oder kürzere Ausflüge in der Nähe.",
        },
        {
          question: "Ist der Jacuzzi wichtig?",
          answer:
            "Für Wellness-Fokus siehe die Themenseite Villa mit Jacuzzi.",
        },
      ],
      relatedLandingsTitle: "Verwandte Seiten zur Buchung",
      relatedLandingsIntro:
        "Unterkunft wählen, die zu Ihrem Plan rund um Plitvice passt.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/seo/guides/lika.jpg",
        alt: "Passeggiata nella natura della Lika — copertina della guida alle attività della regione.",
      },
      activitiesSectionTitle: "Idee per intensità",
      activities: [
        {
          title: "Passeggiate leggere",
          description: "Giorni di recupero tra escursioni più intense.",
          image: "/images/seo/guides/vidikovci.png",
          imageAlt: "Passeggiate facili e belvedere nei dintorni.",
        },
        {
          title: "Parco nazionale dei Laghi di Plitvice",
          description: "Classico attivo—scarpe e acqua da pianificare.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Laghi di Plitvice — giornata attiva nel parco nazionale.",
        },
        {
          title: "Ritmo per famiglie",
          description: "Attività brevi e pause—meno stress.",
          image: "/images/seo/guides/zip-line.jpg",
          imageAlt: "Zip-line e attività avventura nella natura.",
        },
        {
          title: "Jacuzzi la sera",
          description: "Bagno caldo e silenzio per chiudere la giornata.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Relax in jacuzzi dopo una giornata attiva.",
        },
      ],
      midCtaTitle: "Cercate una base per giornate attive?",
      midCtaBody:
        "Villa Velebita è un alloggio con focus su natura, calma e prenotazione diretta.",
      midCtaBookingLabel: "Prenotazione",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "La Lika è solo Plitvice?",
          answer:
            "No—ci sono anche angoli naturali più tranquilli per un programma equilibrato.",
        },
        {
          question: "Come evitare di esagerare?",
          answer: "Alternare intensità e inserire sempre momenti di riposo.",
        },
        {
          question: "E se piove?",
          answer: "Programmi più leggeri in casa o gite brevi nei dintorni.",
        },
        {
          question: "La jacuzzi è importante?",
          answer:
            "Per un focus wellness vedete la pagina tematica villa con jacuzzi.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per la prenotazione",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano intorno a Plitvice.",
    },
  },
  "obiteljski-odmor-blizu-plitvica": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/seo/guides/family_walking.jpg",
        alt: "Obitelj u šetnji kroz prirodu — naslovna fotografija vodiča za obiteljski odmor.",
      },
      activitiesSectionTitle: "Aktivnosti koje obiteljima dobro funkcioniraju",
      activities: [
        {
          title: "Kraće šetnje",
          description: "Manje “sjedenja u autu”, više igre na otvorenom.",
          image: "/images/seo/guides/kuterevo_djeca.jpg",
          imageAlt: "Kuterevo — obiteljski izlet s djecom.",
        },
        {
          title: "NP Plitvička jezera",
          description: "Planirajte pauze i realan tempo za djecu.",
          image: "/images/seo/guides/panoramski_vlak_djeca.jpg",
          imageAlt: "Panoramski vlak — iskustvo za djecu i roditelje.",
        },
        {
          title: "Dan uz smještaj",
          description: "Igra, odmor, jednostavna večera — reset za sve.",
          image: "/images/seo/guides/hrana.png",
          imageAlt: "Lokalna hrana i ugodan ručak na izletu.",
        },
        {
          title: "Lagani izlet u Lici",
          description: "Kad treba promjena ritma bez dugih transfera.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Bariceve špilje — lagana avantura u prirodi.",
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
        src: "/images/seo/guides/family_walking.jpg",
        alt: "Family walking in nature — cover image for the family stay guide near Plitvice.",
      },
      activitiesSectionTitle: "Family-friendly activity patterns",
      activities: [
        {
          title: "Shorter walks",
          description: "Less car time, more outdoor play.",
          image: "/images/seo/guides/kuterevo_djeca.jpg",
          imageAlt: "Kuterevo bear sanctuary — family outing with children.",
        },
        {
          title: "Plitvice NP",
          description: "Plan breaks and realistic pacing for kids.",
          image: "/images/seo/guides/panoramski_vlak_djeca.jpg",
          imageAlt: "Panoramic train ride — fun for kids and parents.",
        },
        {
          title: "Home day",
          description: "Games, rest, simple dinner—a reset for everyone.",
          image: "/images/seo/guides/hrana.png",
          imageAlt: "Local food and a relaxed meal on a day trip.",
        },
        {
          title: "Easy Lika outing",
          description: "Change the rhythm without long transfers.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Barice caves — a light family adventure outdoors.",
        },
      ],
      midCtaTitle: "Looking for a calm stay for your family?",
      midCtaBody:
        "A holiday house and larger capacity options help with organisation—check availability directly.",
      midCtaBookingLabel: "Booking",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "Frequently asked questions",
      faqs: [
        {
          question: "How do I lower stress for children?",
          answer: "Shorter parts of the day and a predictable schedule.",
        },
        {
          question: "Is the stay spacious enough?",
          answer:
            "For larger families, also look at the option for up to nine guests.",
        },
        {
          question: "When is the best time to go to the park?",
          answer: "Often in the morning, with breaks and realistic expectations.",
        },
        {
          question: "Do we need a jacuzzi?",
          answer:
            "Not essential, but popular for parents’ evening relaxation.",
        },
      ],
      relatedLandingsTitle: "Related pages for booking",
      relatedLandingsIntro:
        "Choose accommodation that matches your plan around Plitvice.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/seo/guides/family_walking.jpg",
        alt: "Familie beim Spaziergang in der Natur — Titelbild zum Familienurlaub bei Plitvice.",
      },
      activitiesSectionTitle: "Familientaugliche Muster",
      activities: [
        {
          title: "Kürzere Wanderungen",
          description: "Weniger Auto, mehr draußen spielen.",
          image: "/images/seo/guides/kuterevo_djeca.jpg",
          imageAlt: "Kuterevo — Familienausflug mit Kindern.",
        },
        {
          title: "Nationalpark",
          description: "Pausen und realistisches Tempo für Kinder.",
          image: "/images/seo/guides/panoramski_vlak_djeca.jpg",
          imageAlt: "Panoramazug — Erlebnis für Kinder und Eltern.",
        },
        {
          title: "Tag in der Unterkunft",
          description: "Spiel, Ruhe, einfaches Abendessen.",
          image: "/images/seo/guides/hrana.png",
          imageAlt: "Regionale Küche und entspanntes Essen unterwegs.",
        },
        {
          title: "Leichter Lika-Ausflug",
          description: "Wechsel des Rhythmus ohne lange Fahrten.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Barice-Höhlen — leichtes Naturabenteuer für Familien.",
        },
      ],
      midCtaTitle: "Ruhige Unterkunft für die Familie gesucht?",
      midCtaBody:
        "Ferienhaus und größere Kapazitäten helfen bei der Organisation—Verfügbarkeit direkt prüfen.",
      midCtaBookingLabel: "Buchung",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "Häufig gestellte Fragen",
      faqs: [
        {
          question: "Wie Stress für Kinder reduzieren?",
          answer: "Kürzere Tagesabschnitte und ein vorhersehbarer Plan.",
        },
        {
          question: "Ist die Unterkunft groß genug?",
          answer:
            "Für größere Familien auch die Option bis neun Personen prüfen.",
        },
        {
          question: "Wann in den Park fahren?",
          answer: "Oft am Morgen, mit Pausen und realistischen Erwartungen.",
        },
        {
          question: "Brauchen wir einen Jacuzzi?",
          answer:
            "Nicht zwingend, aber beliebt für die Abendruhe der Eltern.",
        },
      ],
      relatedLandingsTitle: "Verwandte Seiten zur Buchung",
      relatedLandingsIntro:
        "Unterkunft wählen, die zu Ihrem Plan rund um Plitvice passt.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/seo/guides/family_walking.jpg",
        alt: "Famiglia in passeggiata nella natura — copertina della guida alla vacanza in famiglia.",
      },
      activitiesSectionTitle: "Attività che funzionano bene per le famiglie",
      activities: [
        {
          title: "Passeggiate più brevi",
          description: "Meno tempo in auto, più gioco all’aperto.",
          image: "/images/seo/guides/kuterevo_djeca.jpg",
          imageAlt: "Kuterevo — gita in famiglia con i bambini.",
        },
        {
          title: "Parco nazionale dei Laghi di Plitvice",
          description: "Pianificate pause e un ritmo realistico per i bambini.",
          image: "/images/seo/guides/panoramski_vlak_djeca.jpg",
          imageAlt: "Treno panoramico — esperienza per bambini e genitori.",
        },
        {
          title: "Giornata presso l’alloggio",
          description: "Giochi, riposo, cena semplice—reset per tutti.",
          image: "/images/seo/guides/hrana.png",
          imageAlt: "Cucina locale e pranzo rilassato in gita.",
        },
        {
          title: "Gita leggera in Lika",
          description: "Cambio di ritmo senza lunghi trasferimenti.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Grotte di Barice — leggera avventura all’aperto per famiglie.",
        },
      ],
      midCtaTitle: "Cercate un alloggio tranquillo per la famiglia?",
      midCtaBody:
        "Casa vacanze e capienze maggiori aiutano l’organizzazione—controllate la disponibilità direttamente.",
      midCtaBookingLabel: "Prenotazione",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Come ridurre lo stress per i bambini?",
          answer: "Segmenti di giornata più corti e un programma prevedibile.",
        },
        {
          question: "L’alloggio è abbastanza spazioso?",
          answer:
            "Per famiglie numerose valutate anche l’opzione fino a nove ospiti.",
        },
        {
          question: "Quando andare al parco?",
          answer: "Spesso al mattino, con pause e aspettative realistiche.",
        },
        {
          question: "Serve la jacuzzi?",
          answer:
            "Non è indispensabile, ma è molto apprezzata la sera dai genitori.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per la prenotazione",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano intorno a Plitvice.",
    },
  },
  "koliko-dana-treba-za-plitvice": {
    hr: {
      eyebrow: "Vodič",
      coverImage: {
        src: "/images/seo/guides/panoramski_vlak.jpg",
        alt: "Panoramski vlak u parku — naslovna za planiranje duljine boravka na Plitvicama.",
      },
      activitiesSectionTitle: "Kako iskoristiti 1, 2 ili 3 dana",
      activities: [
        {
          title: "1 dan — fokus",
          description: "Jedna glavna ruta i miran tempo.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvička jezera — glavni dan putovanja.",
        },
        {
          title: "2 dana — balans",
          description: "Park + jedan lakši dan u okolici.",
          image: "/images/seo/guides/mill_rastoke.jpg",
          imageAlt: "Rastoke s mlinom — dan za opuštanje i lokalni izlet.",
        },
        {
          title: "3 dana — širina",
          description: "Plitvice + dodatni izleti bez žurbe.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Bariceve špilje — kraći izlet između dana u parku.",
        },
        {
          title: "Večeri za oporavak",
          description: "Jacuzzi i privatnost ako želite zatvoriti dan ugodno.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Jacuzzi u vili — večernji odmor uz dulji boravak.",
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
        src: "/images/seo/guides/panoramski_vlak.jpg",
        alt: "Panoramic train in the park — cover image for planning your Plitvice stay length.",
      },
      activitiesSectionTitle: "How to use 1, 2, or 3 days",
      activities: [
        {
          title: "1 day — focus",
          description: "One main route and a calm pace.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvice Lakes — the main day of the trip.",
        },
        {
          title: "2 days — balance",
          description: "Park + one lighter local day.",
          image: "/images/seo/guides/mill_rastoke.jpg",
          imageAlt: "Rastoke with its watermill — a slower day and local outing.",
        },
        {
          title: "3 days — breadth",
          description: "Plitvice + extra outings without rushing.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Barice caves — a shorter trip between park days.",
        },
        {
          title: "Recovery evenings",
          description: "Jacuzzi and privacy if you want a soft finish.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Villa jacuzzi — evening rest during a longer stay.",
        },
      ],
      midCtaTitle: "Planning several nights near Plitvice?",
      midCtaBody:
        "Direct booking helps you align dates and pricing before peak-season crowds.",
      midCtaBookingLabel: "Booking",
      midCtaGalleryLabel: "Gallery",
      faqSectionTitle: "Frequently asked questions",
      faqs: [
        {
          question: "Is one day enough?",
          answer: "It can be, but enjoyment is often greater with two days.",
        },
        {
          question: "How should I spread my energy?",
          answer: "Heavier part in the morning, lighter afternoon.",
        },
        {
          question: "Where to stay for several days?",
          answer:
            "Nearby accommodation shortens drives and saves energy.",
        },
        {
          question: "Does a jacuzzi matter after walking?",
          answer:
            "For many guests it does—see the dedicated themed page.",
        },
      ],
      relatedLandingsTitle: "Related pages for booking",
      relatedLandingsIntro:
        "Choose accommodation that matches your plan around Plitvice.",
    },
    de: {
      eyebrow: "Reiseführer",
      coverImage: {
        src: "/images/seo/guides/panoramski_vlak.jpg",
        alt: "Panoramazug im Park — Titelbild zur Planung der Aufenthaltsdauer an den Plitvicer Seen.",
      },
      activitiesSectionTitle: "1, 2 oder 3 Tage sinnvoll nutzen",
      activities: [
        {
          title: "1 Tag — Fokus",
          description: "Eine Hauptroute, ruhiges Tempo.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Plitvicer Seen — der Haupttag der Reise.",
        },
        {
          title: "2 Tage — Balance",
          description: "Park plus ein leichter Tag.",
          image: "/images/seo/guides/mill_rastoke.jpg",
          imageAlt: "Rastoke mit Mühle — entspannter Tag und lokaler Ausflug.",
        },
        {
          title: "3 Tage — Breite",
          description: "Plitvice plus weitere Ausflüge ohne Hetze.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Barice-Höhlen — kurzer Ausflug zwischen Parktagen.",
        },
        {
          title: "Erholungsabende",
          description: "Jacuzzi und Privatsphäre.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Jacuzzi der Villa — Abendruhe bei längerem Aufenthalt.",
        },
      ],
      midCtaTitle: "Planen Sie mehrere Nächte nahe Plitvice?",
      midCtaBody:
        "Direktbuchung hilft, Termine und Preise vor der Hochsaison abzustimmen.",
      midCtaBookingLabel: "Buchung",
      midCtaGalleryLabel: "Galerie",
      faqSectionTitle: "Häufig gestellte Fragen",
      faqs: [
        {
          question: "Reicht ein Tag?",
          answer: "Es kann reichen, aber mit zwei Tagen genießt man oft mehr.",
        },
        {
          question: "Wie Kraft einteilen?",
          answer: "Anspruchsvoller am Vormittag, leichter am Nachmittag.",
        },
        {
          question: "Wo für mehrere Tage übernachten?",
          answer:
            "Nahe gelegene Unterkunft verkürzt Fahrten und spart Energie.",
        },
        {
          question: "Ist Jacuzzi nach dem Wandern wichtig?",
          answer:
            "Für viele Gäste ja—siehe die Themenseite.",
        },
      ],
      relatedLandingsTitle: "Verwandte Seiten zur Buchung",
      relatedLandingsIntro:
        "Unterkunft wählen, die zu Ihrem Plan rund um Plitvice passt.",
    },
    it: {
      eyebrow: "Guida",
      coverImage: {
        src: "/images/seo/guides/panoramski_vlak.jpg",
        alt: "Treno panoramico nel parco — copertina per pianificare la durata del soggiorno a Plitvice.",
      },
      activitiesSectionTitle: "Come usare 1, 2 o 3 giorni",
      activities: [
        {
          title: "1 giorno — focus",
          description: "Un percorso principale e ritmo calmo.",
          image: "/images/seo/guides/plitvice.jpg",
          imageAlt: "Laghi di Plitvice — giornata principale del viaggio.",
        },
        {
          title: "2 giorni — equilibrio",
          description: "Parco più un giorno leggero.",
          image: "/images/seo/guides/mill_rastoke.jpg",
          imageAlt: "Rastoke con mulino — giornata più lenta e gita locale.",
        },
        {
          title: "3 giorni — ampiezza",
          description: "Plitvice più altre uscite senza fretta.",
          image: "/images/seo/guides/bariceve_spilje.jpg",
          imageAlt: "Grotte di Barice — breve escursione tra i giorni al parco.",
        },
        {
          title: "Sere di recupero",
          description: "Jacuzzi e privacy se volete chiudere dolcemente.",
          image: "/images/seo/guides/jacuzzi.png",
          imageAlt: "Jacuzzi in villa — riposo serale durante un soggiorno più lungo.",
        },
      ],
      midCtaTitle: "Pianificate più notti vicino a Plitvice?",
      midCtaBody:
        "La prenotazione diretta aiuta ad allineare date e prezzi prima dell’alta stagione.",
      midCtaBookingLabel: "Prenotazione",
      midCtaGalleryLabel: "Galleria",
      faqSectionTitle: "Domande frequenti",
      faqs: [
        {
          question: "Basta un giorno?",
          answer: "Può bastare, ma con due giorni si gode spesso di più.",
        },
        {
          question: "Come distribuire le energie?",
          answer: "Parte più intensa al mattino, pomeriggio più leggero.",
        },
        {
          question: "Dove dormire per più giorni?",
          answer:
            "Un alloggio vicino accorcia i tragitti e fa risparmiare energia.",
        },
        {
          question: "La jacuzzi conta dopo le passeggiate?",
          answer:
            "Per molti ospiti sì—vedete la pagina tematica dedicata.",
        },
      ],
      relatedLandingsTitle: "Pagine collegate per la prenotazione",
      relatedLandingsIntro:
        "Scegliete l’alloggio in linea con il vostro piano intorno a Plitvice.",
    },
  },
};
