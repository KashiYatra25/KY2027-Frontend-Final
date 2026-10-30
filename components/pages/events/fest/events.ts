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
      "Cut-A-Rug|I|Western Solo Dance Competition|Unleash your inner dancer and let the rhythm take over the stage.",
      "Cypher of Mobs|T|Street Dance Battle Competition|Crews battle with power, passion and raw street energy.",
      "Ecstasy|D|Duet Dance Competition|Two dancers, one rhythm. Harmony and chemistry take centre stage.",
      "Synchronicity|T|Group Dance Competition|Individual talent merges into one force. Perfect sync, perfect flow.",
      "Nritya|I|Classical Dance Competition|Bharatanatyam to Kathak: honour the grace of centuries-old art forms.",
    ],
    "Sagnik Maity (+91 80786 35105)"
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
      "Sur|I|Solo Singing Competition|One voice, one stage, infinite possibilities.",
      "Jugalbandi|D|Duet Singing Competition|Two voices intertwine in perfect harmony.",
      "Band of Bands|T|Battle of the Bands|Assemble your crew and rock the stage for glory.",
      "Unplugged|I|Acoustic Performance|Strip away the electronics and let raw talent shine.",
    ],
    "Sagnik Maity (+91 80786 35105)"
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
      "Raag Rang|I|Classical Vocal Competition|Immerse yourself in the depth of Indian classical vocals.",
      "Tantrang|I|Instrumental Competition|Let your instrument speak: sitar, tabla, sarangi or santoor.",
      "Fusion Fiesta|T|Classical Fusion Competition|Where tradition meets innovation. Blend classical elements into something new.",
    ],
    "Sagnik Maity (+91 80786 35105)"
  ),
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
      "Mono Act|I|Solo Theatre Performance|One actor, many characters, infinite emotion.",
      "Nukkad|T|Street Play Competition|Raw, powerful street theatre that speaks to society.",
      "Stage Play|T|Full Theatre Production|The grand stage awaits: sets, costumes and a full cast.",
      "Mimicry|I|Voice & Character Imitation|Master the art of transformation, from celebrities to characters.",
    ],
    "Anand Manmora (+91 93524 45131)"
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
      "Runway|I|Walk Competition|Confidence, style and attitude on the ramp.",
      "Couture|T|Fashion Design Competition|Design, create and present a collection.",
      "Themed Fashion|T|Conceptual Styling Competition|Fashion as storytelling: bring a theme to life.",
    ],
    "Anand Manmora (+91 93524 45131)"
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
      "Canvas|I|Painting Competition|Let colors tell your story on the canvas.",
      "Sketch It|I|Sketching Competition|Celebrate the raw beauty of black and white.",
      "Digital Art|I|Digital Creation Competition|Digital illustration, photo-manipulation or 3D renders.",
      "Mural|T|Large Scale Art Competition|Think big. Paint bigger. Transform a wall into a statement.",
    ],
    "Anand Manmora (+91 93524 45131)"
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
      "General Quiz|T|The Ultimate Knowledge Test|Test your knowledge across all domains.",
      "Biz Quiz|T|Business & Finance Quiz|For future entrepreneurs: markets, companies and economics.",
      "Sci-Tech Quiz|T|Science & Technology Quiz|From quantum physics to the latest tech innovations.",
      "Entertainment Quiz|T|Movies, Music & Pop Culture|Lights, camera, quiz! Bollywood, Hollywood, music and more.",
    ],
    "Mourya (+91 93567 74728)"
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
      "Debate|T|Parliamentary Debate Competition|Argue, convince, win. Build your case and sway the room.",
      "Poetry Slam|I|Spoken Word Poetry|Perform your original pieces with passion.",
      "Creative Writing|I|Fiction & Non-Fiction Writing|Let your imagination flow through ink.",
      "Extempore|I|Impromptu Speaking|Think on your feet and speak eloquently with no preparation.",
      "MUN|T|Model United Nations|Represent countries, debate global issues and draft resolutions.",
    ],
    "Mourya (+91 93567 74728)"
  ),
  ev(
    "zaika",
    "Zaika",
    "Culinary",
    "Where taste meets talent",
    26,
    "✺",
    "up",
    1.4902,
    0.5,
    [
      "MasterChef|T|Cooking Competition|Don the chef's hat and showcase your culinary skills.",
      "Bake Off|I|Baking Competition|For those who find magic in the oven: cakes, pastries, breads.",
      "Mocktail Mixology|I|Beverage Creation Competition|Shake, stir and serve drinks as beautiful as they are delicious.",
    ],
    "Mourya (+91 93567 74728)"
  ),
];
