/**
 * Global Image Configuration
 *
 * Centralized image URLs for the entire project.
 * ALL images served from ImageKit CDN for optimal performance.
 *
 * Organization:
 * - common/ = used on both mobile and desktop
 * - desktop/ = desktop-only (hidden on mobile)
 * - mobile/ = mobile-only (hidden on desktop)
 */

const IMAGEKIT_BASE =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/bi3ktgt58";

/**
 * Cache-busting version for ImageKit URLs.
 * ImageKit (and browsers) cache by URL, so bump this whenever the underlying
 * image files are re-uploaded/optimized to force clients to fetch fresh copies.
 */
const CACHE_VERSION = "20261019";
const v = (url: string): string => `${url}?v=${CACHE_VERSION}`;

export const IMAGES = {
  // ============================================
  // PASSES - All common (shown on both platforms)
  // ============================================
  passes: {
    yatri: v(`${IMAGEKIT_BASE}/passes/yatri-pass.png`),
    darbar: v(`${IMAGEKIT_BASE}/passes/darbar-pass.png`),
    swarnim: v(`${IMAGEKIT_BASE}/passes/swarnim-pass.png`),
  },

  // ============================================
  // ZONALS - pass artwork (floating decor on /zonals/colleges)
  // ============================================
  zonals: {
    singlePassPortrait: v(`${IMAGEKIT_BASE}/zonals/single-pass-portrait.png`),
    singlePassLandscape: v(`${IMAGEKIT_BASE}/zonals/single-pass-landscape.png`),
    multiPassPortrait: v(`${IMAGEKIT_BASE}/zonals/multi-pass-portrait.png`),
    multiPassLandscape: v(`${IMAGEKIT_BASE}/zonals/multi-pass-landscape.png`),
  },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  hero: {
    ghatsDay: v(`${IMAGEKIT_BASE}/hero/common/ghats-day.png`),
    ghatsNight: v(`${IMAGEKIT_BASE}/hero/common/ghats-night.png`),
    modeChange: v(`${IMAGEKIT_BASE}/hero/common/mode-change.png`),
    themePickerBox: v(`${IMAGEKIT_BASE}/hero/common/lotus-choose-theme-box.png`),
    temple: v(`${IMAGEKIT_BASE}/hero/common/kashivishwanath-temple.png`),
    varanasiBack: v(`${IMAGEKIT_BASE}/hero/common/varanasi-back.png`),
    steppingStone: v(`${IMAGEKIT_BASE}/hero/common/stepping-stone.webp`),
    kites: v(`${IMAGEKIT_BASE}/hero/common/kites.png`),
    heroLeft: v(`${IMAGEKIT_BASE}/hero/common/hero-left-v2.png`),
    heroRight: v(`${IMAGEKIT_BASE}/hero/common/hero-right-v5.png`),
    heroRightDay: v(`${IMAGEKIT_BASE}/hero/common/hero-right-day-v2.png`),
    heroRightNight: v(`${IMAGEKIT_BASE}/hero/common/hero-right-night.png`),
  },

  // ============================================
  // NAVBAR - Page-specific variants
  // ============================================
  navbar: {
    // Main/Home navbar (golden/cream theme)
    main: {
      background: v(`${IMAGEKIT_BASE}/navbar/main/nav-bg.png`),
      badge: v(`${IMAGEKIT_BASE}/navbar/main/nav-badge-home-v5.png`),
    },
    // About page navbar (purple/blue concert theme)
    about: {
      background: v(`${IMAGEKIT_BASE}/navbar/about/navbar-about.png`),
      badge: v(`${IMAGEKIT_BASE}/navbar/about/nav-badge-about-v4.png`),
    },
    // Sponsors page navbar (green/gold nature theme)
    sponsor: {
      background: v(`${IMAGEKIT_BASE}/navbar/sponsor/nav-sponsor.png`),
    },
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  vibes: {
    // Common (both platforms)
    background: v(`${IMAGEKIT_BASE}/vibes/common/vibes-bg.png`),
    backgroundDark: v(`${IMAGEKIT_BASE}/vibes/common/banarasi-vibes-bg-dark.png`),
    mahamana: v(`${IMAGEKIT_BASE}/vibes/common/mahamana.png`),
    bhuGate: v(`${IMAGEKIT_BASE}/vibes/common/bhu-gate.png`),
    rickshaw: v(`${IMAGEKIT_BASE}/vibes/common/rickshaw.webp`),

    // Desktop-only decorative characters
    mandala: v(`${IMAGEKIT_BASE}/vibes/desktop/mandala.png`),
    banarasMaleDancer: v(`${IMAGEKIT_BASE}/vibes/desktop/banaras-male-dancer.png`),
    banarasFemaleDancer: v(`${IMAGEKIT_BASE}/vibes/desktop/banaras-female-dancer.png`),

    // Mobile-only decorative elements
    mobile: {
      rangoliBg: v(`${IMAGEKIT_BASE}/vibes/mobile/rangoli-bg.png`),
      trishul: v(`${IMAGEKIT_BASE}/vibes/mobile/trishul.png`),
      lotusPairs: v(`${IMAGEKIT_BASE}/vibes/mobile/lotus-pairs.png`),
      etherealDancer: v(`${IMAGEKIT_BASE}/vibes/mobile/ethereal-dancer.png`),
      diyaPairs: v(`${IMAGEKIT_BASE}/vibes/mobile/diya-pairs.png`),
      conchShell: v(`${IMAGEKIT_BASE}/vibes/mobile/conch-shell.png`),
    },
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE SECTION
  // ============================================
  festivalVibes: {
    dj: v(`${IMAGEKIT_BASE}/festival-vibes/common/dj.png`),
    sareeDrape: v(`${IMAGEKIT_BASE}/festival-vibes/common/saree-drape.png`),
  },

  // ============================================
  // PRO NITES SECTION
  // ============================================
  proNites: {
    aerobics: v(`${IMAGEKIT_BASE}/pro-nites/common/aerobics.png`),
    moon: v(`${IMAGEKIT_BASE}/pro-nites/common/moon.png`),
    silhouette: v(`${IMAGEKIT_BASE}/pro-nites/common/silhouette.png`),
  },

  // ============================================
  // FOOTER SECTION - Desktop decorative elements
  // ============================================
  footer: {
    footerDancer: v(`${IMAGEKIT_BASE}/footer/desktop/footer-dancer.png`),
    concertFloor: v(`${IMAGEKIT_BASE}/footer/desktop/concert-floor.png`),
    dancer: v(`${IMAGEKIT_BASE}/footer/desktop/ethereal-dancer.png`),
    ghatSilhouette: v(`${IMAGEKIT_BASE}/footer/desktop/ghat-silhouette.png`),
    subtleRangoli: v(`${IMAGEKIT_BASE}/footer/desktop/subtle-rangoli.png`),
    floatingGarland: v(`${IMAGEKIT_BASE}/footer/desktop/floating-garland.png`),
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  about: {
    background: v(`${IMAGEKIT_BASE}/about/AboutBackground.png`),
    mysticDivider: v(`${IMAGEKIT_BASE}/about/MysticDivider.png`),
    cornerOrnament: v(`${IMAGEKIT_BASE}/about/CornerOrnament.png`),
    bhuGate: v(`${IMAGEKIT_BASE}/about/BhuRoyalGate.png`),
    heroLeftAbout: v(`${IMAGEKIT_BASE}/about/HeroLeftDecor.png`),
    dancerGirlHeroAbout: v(`${IMAGEKIT_BASE}/about/DancerGirlHero.png`),
    // IIT BHU Stamps
    stamps: {
      mandir: v(`${IMAGEKIT_BASE}/about/stamps/Mandir.png`),
      mainBuilding: v(`${IMAGEKIT_BASE}/about/stamps/MainBuilding.png`),
      library: v(`${IMAGEKIT_BASE}/about/stamps/Library.png`),
      kyVenue: v(`${IMAGEKIT_BASE}/about/stamps/KyVenue.png`),
      heritageHostel: v(`${IMAGEKIT_BASE}/about/stamps/HeritageHostel.png`),
    },
    // Slider images - Left row (moving left to right)
    slider: {
      left1: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft1.jpg`),
      left2: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft2.jpg`),
      left3: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft3.jpg`),
      left4: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft4.jpg`),
      left5: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft5.jpg`),
      left6: v(`${IMAGEKIT_BASE}/about/slider/SliderLeft6.jpg`),
      // Right row (moving right to left)
      right1: v(`${IMAGEKIT_BASE}/about/slider/SliderRight1.jpg`),
      right2: v(`${IMAGEKIT_BASE}/about/slider/SliderRight2.jpg`),
      right3: v(`${IMAGEKIT_BASE}/about/slider/SliderRight3.jpg`),
      right4: v(`${IMAGEKIT_BASE}/about/slider/SliderRight4.jpg`),
      right5: v(`${IMAGEKIT_BASE}/about/slider/SliderRight5.jpg`),
      right6: v(`${IMAGEKIT_BASE}/about/slider/SliderRight6.jpg`),
    },
  },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  contact: {
    // Contact-specific images
    envelopeScroll: v(`${IMAGEKIT_BASE}/contact/EnvelopeScrolled.png`),
    conch: v(`${IMAGEKIT_BASE}/contact/Conch.png`),
    lotusMandala: v(`${IMAGEKIT_BASE}/contact/LotusMandala.png`),
    floatingDiya: v(`${IMAGEKIT_BASE}/contact/FloatingDiya.png`),
    // Shared decorative images (reused from about)
    mandalaOrnament: v(`${IMAGEKIT_BASE}/about/MandalaOrnament.png`),
    peacock: v(`${IMAGEKIT_BASE}/about/Peacock.png`),
    mysticDivider: v(`${IMAGEKIT_BASE}/about/MysticDivider.png`),
    cornerOrnament: v(`${IMAGEKIT_BASE}/about/CornerOrnament.png`),
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  login: {
    loginPage: v(`${IMAGEKIT_BASE}/login/LoginPage.png`),
  },

  // ============================================
  // SINGERS / ARTISTS - Pro Nites
  // ============================================
  singers: {
    jubinNautiyal: v(`${IMAGEKIT_BASE}/singers/jubin-nautiyal.webp`),
    darshanRawal: v(`${IMAGEKIT_BASE}/singers/darshan-rawal.webp`),
    mohitChauhan: v(`${IMAGEKIT_BASE}/singers/mohit-chauhan.webp`),
    vishalShekhar: v(`${IMAGEKIT_BASE}/singers/vishal-shekhar.webp`),
    raftaar: v(`${IMAGEKIT_BASE}/singers/raftaar.jpeg`),
    ritviz: v(`${IMAGEKIT_BASE}/singers/ritviz.jpg`),
    anubhavBassi: v(`${IMAGEKIT_BASE}/singers/anubhav-bassi.jpeg`),
    mj5: v(`${IMAGEKIT_BASE}/singers/mj5-group.jpeg`),
  },

  // ============================================
  // SPONSORS - Logo images only
  // ============================================
  sponsors: {
    // Title & Co-Title
    titleSponsor: v(`${IMAGEKIT_BASE}/sponsors/title-sponsor.jpeg`),
    coTitlePartner: v(`${IMAGEKIT_BASE}/sponsors/co-title-partner.png`),

    // Powered By Partners
    poweredByPartner: v(`${IMAGEKIT_BASE}/sponsors/powered-by-partner.jpg`),
    coPoweredByPartner: v(`${IMAGEKIT_BASE}/sponsors/co-powered-by-partner.png`),
    adaniCoPoweredPartner: v(`${IMAGEKIT_BASE}/sponsors/adani-co-powered-partner.png`),

    // Major & Event Sponsors
    majorSponsor: v(`${IMAGEKIT_BASE}/sponsors/major-sponsor.jpg`),
    eventTitleCrosswindz: v(`${IMAGEKIT_BASE}/sponsors/event-title-crosswindz.jpg`),
    titleEnquiztaSamvad: v(`${IMAGEKIT_BASE}/sponsors/title-enquizta-samvad.jpg`),

    // Industry Partners
    energyPartner: v(`${IMAGEKIT_BASE}/sponsors/energy-partner.png`),
    steelPartner: v(`${IMAGEKIT_BASE}/sponsors/steel-partner.png`),
    buildPartner: v(`${IMAGEKIT_BASE}/sponsors/build-partner.png`),
    constructionPartner: v(`${IMAGEKIT_BASE}/sponsors/construction-partner.webp`),
    infrastructurePartner: v(`${IMAGEKIT_BASE}/sponsors/infrastructure-partner.png`),
    realEstatePartner: v(`${IMAGEKIT_BASE}/sponsors/real-estate-partner.jpeg`),
    developmentPartner: v(`${IMAGEKIT_BASE}/sponsors/development-partner.png`),

    // Social & CSR Partners
    nmdcSustainabilityPartner: v(`${IMAGEKIT_BASE}/sponsors/nmdc-sustainability-partner.jpg`),
    csrPartner: v(`${IMAGEKIT_BASE}/sponsors/csr-partner.png`),
    socialWelfarePartner: v(`${IMAGEKIT_BASE}/sponsors/social-welfare-partner.png`),
    nationBuildingPartner: v(`${IMAGEKIT_BASE}/sponsors/nation-building-partner.png`),
    communityPartner: v(`${IMAGEKIT_BASE}/sponsors/community-partner.png`),

    // Hospitality & Lifestyle Partners
    hospitalityPartner: v(`${IMAGEKIT_BASE}/sponsors/hospitality-partner.jpeg`),
    coffeePartner: v(`${IMAGEKIT_BASE}/sponsors/coffee-partner.png`),
    chocolatePartner: v(`${IMAGEKIT_BASE}/sponsors/chocolate-partner.png`),
    fragrancePartner: v(`${IMAGEKIT_BASE}/sponsors/fragrance-partner.jpg`),
    sareePartner: v(`${IMAGEKIT_BASE}/sponsors/saree-partner.jpg`),

    // Media & Tech Partners
    gamingPartner: v(`${IMAGEKIT_BASE}/sponsors/gaming-partner.png`),
    musicStreamingPartner: v(`${IMAGEKIT_BASE}/sponsors/music-streaming-partner.webp`),
    innovationPartner: v(`${IMAGEKIT_BASE}/sponsors/innovation-partner.webp`),
    dalimssNewsPartner: v(`${IMAGEKIT_BASE}/sponsors/dalimss-news-partner.webp`),
    theVibePartner: v(`${IMAGEKIT_BASE}/sponsors/the-vibe-partner.png`),
  },

  // ============================================
  // INTRO SECTION - Mascot and assets
  // ============================================
  intro: {
    neonStage: v(`${IMAGEKIT_BASE}/intro/common/neon-stage.webp`),
    countdownPlate: v(`${IMAGEKIT_BASE}/intro/countdown/plate.png`),
    countdownStage: v(`${IMAGEKIT_BASE}/intro/countdown/stage.png`),
  },

  // ============================================
  // CAMPUS AMBASSADOR PAGE
  // ============================================
  ca: {
    cosmicBackground: v(`${IMAGEKIT_BASE}/ca/common/cosmic-background.png`),
    goldenBadge: v(`${IMAGEKIT_BASE}/ca/common/golden-badge.png`),
  },

  // ============================================
  // GALLERY PAGE - Photos and videos
  // ============================================
  gallery: {
    // Photos
    stageAtmosphere1: v(`${IMAGEKIT_BASE}/gallery/stage-atmosphere-1.jpg`),
    proniteCrowd1: v(`${IMAGEKIT_BASE}/gallery/pronite-crowd-1.jpg`),
    proniteCrowd2: v(`${IMAGEKIT_BASE}/gallery/pronite-crowd-2.jpg`),
    stageLights1: v(`${IMAGEKIT_BASE}/gallery/stage-lights-1.jpg`),
    festivalVibes1: v(`${IMAGEKIT_BASE}/gallery/festival-vibes-1.jpg`),
    crowdEnergy1: v(`${IMAGEKIT_BASE}/gallery/crowd-energy-1.jpg`),
    performance1: v(`${IMAGEKIT_BASE}/gallery/performance-1.jpg`),
    concertNight1: v(`${IMAGEKIT_BASE}/gallery/concert-night-1.jpg`),
    concertNight2: v(`${IMAGEKIT_BASE}/gallery/concert-night-2.jpg`),
    concertNight3: v(`${IMAGEKIT_BASE}/gallery/concert-night-3.jpg`),
    grandFinale1: v(`${IMAGEKIT_BASE}/gallery/grand-finale-1.jpg`),
    // Team member photos (Tech team)
    team: {
      tech: {
        head: {
          srajan: v(`${IMAGEKIT_BASE}/gallery/team/tech/head/srajan.jpg`),
          shashank: v(`${IMAGEKIT_BASE}/gallery/team/tech/head/shashank.jpeg`),
        },
        developers: {
          shashwat: v(`${IMAGEKIT_BASE}/gallery/team/tech/developer/shashwat.jpg`),
          sudhir: v(`${IMAGEKIT_BASE}/gallery/team/tech/developer/sudhir.jpg`),
          shubhankar: v(`${IMAGEKIT_BASE}/gallery/team/tech/developer/shubhankar.jpg`),
        },
        subordinates: {
          akhilesh: v(`${IMAGEKIT_BASE}/gallery/team/tech/subordinates/akhilesh.png`),
          balajiSiddharthaKatiki: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/balaji-siddhartha-katiki.png`
          ),
          bhavanasiAnjanaAkhileswar: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/bhavanasi-anjana-akhileswar.png`
          ),
          eraganaboinaKrishnaKoushik: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/eraganaboina-krishna-koushik.png`
          ),
          gPremKumar: v(`${IMAGEKIT_BASE}/gallery/team/tech/subordinates/g-prem-kumar.png`),
          meesalaPawanKumar: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/meesala-pawan-kumar.png`
          ),
          prerna: v(`${IMAGEKIT_BASE}/gallery/team/tech/subordinates/prerna.jpg`),
          rishikar: v(`${IMAGEKIT_BASE}/gallery/team/tech/subordinates/rishikar.png`),
          sidduKumarReddyBandi: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/siddu-kumar-reddy-bandi.png`
          ),
          vanchaAbhinavReddy: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/vancha-abhinav-reddy.png`
          ),
          yvSureshKumarReddy: v(
            `${IMAGEKIT_BASE}/gallery/team/tech/subordinates/y-v-suresh-kumar-reddy.png`
          ),
        },
      },
    },
    // NOTE: Videos are NOT in IMAGES. They are served directly from
    // /public/gallery/video (see gallery data.config.ts) and will move to R2.
  },

  // ============================================
  // SCHEDULE MAP - Campus images and clouds
  // ============================================
  scheduleMap: {
    campusDay: v(`${IMAGEKIT_BASE}/schedule-map/campus-day.jpg`),
    campusNight: v(`${IMAGEKIT_BASE}/schedule-map/campus-night.jpg`),
  },
} as const;

/**
 * Helper to get ImageKit URL with transformations
 * @example getImageUrl(IMAGES.passes.yatri, "tr:w-300,q-80")
 */
export function getImageUrl(path: string, transformations?: string): string {
  if (!transformations) return path;

  // Strip any existing query (e.g. the ?v= cache-bust) and the base URL, then
  // rebuild as BASE/<transformations>/<imagePath>?v=... (avoids a double ?v=).
  const noQuery = path.split("?")[0];
  const imagePath = noQuery.replace(IMAGEKIT_BASE as string, "");
  return v(`${IMAGEKIT_BASE}/${transformations}${imagePath}`);
}
