export type Motion = "swirl" | "up" | "down" | "drift" | "twinkle";

export type SubEvent = {
  n: string;
  t: string;
  k: string;
  d: string;
  dt?: string;
  v?: string;
  ct?: string;
};

export type MainEvent = {
  slug: string;
  n: string;
  c: string;
  t: string;
  h: number;
  g: string;
  mo: Motion;
  bg: string;
  rangoli: string;
  r: number;
  fx: number;
  dt?: string;
  v?: string;
  ct?: string;
  s: SubEvent[];
};

const TY = { I: "Individual Event", T: "Team Event", D: "Duo Event" } as const;

export const DEF = {
  dt: "Coming soon",
  v: "Upcoming",
  ct: "",
};

const ev = (
  slug: string,
  n: string,
  c: string,
  t: string,
  h: number,
  g: string,
  mo: Motion,
  r: number,
  fx: number,
  s: string[],
  ct?: string
): MainEvent => ({
  slug,
  n,
  c,
  t,
  h,
  g,
  mo,
  r,
  fx,
  ct,
  bg: `/events/bg/${slug}.webp`,
  rangoli: `/events/rangoli/${slug}.webp`,
  s: s.map((x) => {
    const [n, y, k, d] = x.split("|");
    return { n, t: TY[y as keyof typeof TY], k, d };
  }),
});

export const EVENTS: MainEvent[] = [
  ev(
    "abhinay",
    "Abhinay",
    "Theatre",
    "The world is a stage",
    4,
    "❖",
    "down",
    1.5144,
    0.5,
    [
      "Rangmanch|T|Stage Play|The grand stage awaits: sets, costumes and a full cast for theatrical excellence.",
      "Asmita|I|Monoact|One actor, many characters, infinite emotion. Solo theatre at its finest.",
      "Hullad|T|Street Play|Raw, powerful street theatre that speaks to society and moves the masses.",
      "Chestha|T|Mime|Express without words. The art of silent storytelling through movement.",
    ],
    "Anand Manmora: +91 93524 45131, Shubham: 7877126672"
  ),
  ev(
    "bandish",
    "Bandish",
    "Indian Classical",
    "Classical notes, timeless beauty",
    36,
    "✦",
    "twinkle",
    2.2745,
    0.4767,
    [
      "Sur|I|Classical Solo Singing|Immerse yourself in the depth of Indian classical vocals and ragas.",
      "Sanlayan|T|Percussion Instrumentals|Let the rhythm speak through tabla, dholak and percussion mastery.",
      "Kriti|I|Original Composition|Showcase your original classical compositions and creative arrangements.",
      "Swar Sangati|T|Choir & Acapella|Voices unite in perfect harmony. Choral excellence without instruments.",
      "Raagsamar|T|Unplugged Band|Acoustic fusion of classical and contemporary. Raw talent, pure music.",
    ],
    "Anand Manmora: +91 93524 45131, Rudra: 9737011173"
  ),
  ev(
    "crosswindz",
    "Crosswindz",
    "Music",
    "Where melodies meet the soul",
    222,
    "♪",
    "up",
    1.5078,
    0.5,
    [
      "Auralis|I|Solo Singing|One voice, one stage, infinite possibilities. Let your vocals shine.",
      "Strumento|I|Solo Instrumentals|Master your instrument and captivate with your musical prowess.",
      "Spitfire|I|Rap Battle|Bars, flow and wordplay. Battle it out in the ultimate rap showdown.",
      "Box-Blitz|I|Beat Boxing|Create beats with just your voice. The human beatbox competition.",
      "Battle of Bands|T|Band Competition|Assemble your crew and rock the stage for ultimate glory.",
    ],
    "Shyam Swarnkar: +91 99297 15288, Aditya: 9891558077"
  ),
  ev(
    "enquizta",
    "Enquizta",
    "Quiz",
    "Knowledge is the ultimate power",
    285,
    "?",
    "up",
    1.4945,
    0.5,
    [
      "India Quiz|T|India Knowledge Quiz|Test your knowledge of Indian history, culture, politics and more.",
      "MELA Quiz|T|Movies, Entertainment, Literature & Arts|Bollywood, books, art and everything entertainment.",
      "General Quiz|T|The Ultimate Knowledge Test|Test your knowledge across all domains and topics.",
      "Sports Quiz|T|Sports Knowledge Quiz|From cricket to Olympics, test your sporting knowledge.",
      "Sci-Biz-Tech Quiz|T|Science, Business & Technology|Innovation, markets and scientific discoveries.",
      "Food Quiz|T|Culinary Knowledge Quiz|Cuisines, ingredients, cooking techniques and food culture.",
    ],
    "Adhiraj: +91 99505 76406, Mohit: 7742098076"
  ),
  ev(
    "mirage",
    "Mirage",
    "Fashion",
    "Where fashion meets fantasy",
    258,
    "◆",
    "drift",
    1.5011,
    0.5,
    [
      "Design Elegante|T|Designer Show|Design, create and present a stunning fashion collection on the ramp.",
      "Mr. KY|I|Mr. Kashiyatra|Confidence, style and personality. The hunt for Mr. Kashiyatra 2027.",
      "Miss KY|I|Miss Kashiyatra|Grace, elegance and charisma. The search for Miss Kashiyatra 2027.",
      "Costume Design|T|Costume Creation|Transform fabrics into art. Creative costume design competition.",
    ],
    "Sumit: +91 89493 28424, Shubham: 7877126672"
  ),
  ev(
    "natraj",
    "Natraj",
    "Dance",
    "Dance like the cosmos is watching",
    325,
    "✿",
    "swirl",
    2.3563,
    0.5064,
    [
      "Bliss|T|Western Group Dance|Synchronised moves, electrifying energy. Western group dance at its best.",
      "Razzmatazz|T|Folk Dance|Celebrate India's rich folk traditions through vibrant regional dances.",
      "Cut a Rug|I|Western Solo Dance|Unleash your inner dancer and let the rhythm take over the stage.",
      "Ecstasy|D|Duet Dance|Two dancers, one rhythm. Harmony and chemistry take centre stage.",
      "Glitz|I|Solo Folk & Classical Dance|Grace meets tradition. Showcase classical and folk solo excellence.",
      "Cypher of Mobs|T|Street Battle|Crews battle with power, passion and raw street energy.",
    ],
    "JSC: +91 83097 23081, Zaid: 9479412241"
  ),
  ev(
    "samwaad",
    "Samwaad",
    "Literary",
    "The power of words",
    205,
    "❝",
    "drift",
    1.4814,
    0.5,
    [
      "Scripturesque|I|Creative Writing|Let your imagination flow through ink. Fiction and non-fiction writing.",
      "What's The Word?|T|Word Games|Vocabulary, wordplay and linguistic challenges for the word nerds.",
      "An Indian HELM Quiz|T|History, Entertainment, Literature & Mythology|Deep dive into Indian culture and stories.",
      "The Legend of Sir Speak-A-Lot|I|English Elocution & Poetry Slam|Eloquence and spoken word poetry in English.",
      "Madhurima|I|Hindi Poetry Slam|Hindi kavita with passion. Perform your original Hindi verses.",
      "Battlefront|T|English Debate|Argue, convince, win. Parliamentary debate in English.",
      "Just A Minute!|I|JAM|Think on your feet. Speak for a minute without hesitation or repetition.",
      "Tark Sangat|T|Hindi Debate|वाद-विवाद की कला। Hindi parliamentary debate competition.",
      "Qissagoi|I|Hindi Storytelling|The art of storytelling in Hindi. Weave tales that captivate.",
      "Improv Comedy|T|Improvisational Comedy|Quick wit, spontaneous humour. Comedy without a script.",
      "A Jester's Court|I|Stand-Up Comedy|Take the mic and make them laugh. Original stand-up sets.",
      "Ashubhashan|I|Impromptu Speaking|Think on your feet and speak eloquently with no preparation.",
    ],
    "Mourya: 9356774728, Onkar: 8149353809"
  ),
  ev(
    "toolika",
    "Toolika",
    "Art",
    "Art speaks where words fail",
    95,
    "●",
    "down",
    2.1918,
    0.6312,
    [
      "Fusion Frames|I|Mixed Media Art|Blend techniques and mediums to create unique artistic expressions.",
      "Spoil The Tees!|I|T-Shirt Painting|Transform plain tees into wearable art with your creative designs.",
      "Skin Canvas|I|Face & Body Art|The human body as your canvas. Face painting and body art.",
      "Vastra Shilp|T|Paper Costume Designing|Craft stunning costumes using only paper. Sustainable fashion art.",
      "Soap Carving|I|Soap Sculpture|Sculpt intricate designs from bars of soap. Delicate precision art.",
      "Live Sketching|I|On-the-Spot Sketching|Capture the moment. Quick sketching competition under time pressure.",
      "Rangriti|T|Rangoli Making|Traditional floor art. Create stunning rangoli designs with colours.",
    ],
    "Akash: +91 91663 43505, Aditya Sharma: 9084075482"
  ),
];
