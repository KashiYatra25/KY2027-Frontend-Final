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

export const IMAGES = {
  // ============================================
  // PASSES - All common (shown on both platforms)
  // ============================================
  passes: {
    yatri: "/passes/YatriPass.png",
    darbar: "/passes/DarbarPass.png",
    swarnim: "/passes/SwarnimPass.png",
  },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  hero: {
    logo: `${IMAGEKIT_BASE}/hero/common/kashiyatra-logo.png`,
    heroLogo: `${IMAGEKIT_BASE}/hero/common/hero-logo.png`,
    ghatsDay: `${IMAGEKIT_BASE}/hero/common/ghats-day.png?v=2`,
    ghatsNight: `${IMAGEKIT_BASE}/hero/common/ghats-night.png?v=3`,
    modeChange: `${IMAGEKIT_BASE}/hero/common/mode-change.png`,
    themePickerBox: "/home/hero/lotusChooseThemeBox.png",
    temple: `${IMAGEKIT_BASE}/hero/common/kashivishwanath-temple.png`,
    varanasiBack: `${IMAGEKIT_BASE}/hero/common/varanasi-back.png`,
    steppingStone: "/home/hero/SteppingStone.webp",
    kites: `${IMAGEKIT_BASE}/hero/common/kites.png`,
  },

  // ============================================
  // NAVBAR - Page-specific variants
  // ============================================
  navbar: {
    // Main/Home navbar (golden/cream theme)
    main: {
      background: "/navbar/MainBackground.png",
      badge: "/navbar/MainBadge.png",
    },
    // About page navbar (purple/blue concert theme)
    about: {
      background: "/navbar/AboutBackground.png",
      badge: "/navbar/AboutBadge.png",
    },
    // Sponsors page navbar (green/gold nature theme)
    sponsor: {
      background: "/navbar/SponsorBackground.png",
      badge: "/navbar/SponsorBadge.png",
    },
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  vibes: {
    // Common (both platforms)
    background: `${IMAGEKIT_BASE}/vibes/common/vibes-bg.png`,
    backgroundDark: "/home/banarasiVibes/BanarasiVibesBackgroundDark.webp",
    mahamana: `${IMAGEKIT_BASE}/vibes/common/mahamana.png`,
    bhuGate: `${IMAGEKIT_BASE}/vibes/common/bhu-gate.png`,
    rickshaw: "/home/banarasiVibes/Rickshaw.webp",

    // Desktop-only decorative characters
    mandala: `${IMAGEKIT_BASE}/vibes/desktop/mandala.png`,
    gangaAartiSaint: `${IMAGEKIT_BASE}/vibes/desktop/ganga-aarti-saint.png`,
    bharatnatyamDancer: `${IMAGEKIT_BASE}/vibes/desktop/bharatnatyam-dancer.png`,
    banarasMaleDancer: `${IMAGEKIT_BASE}/vibes/desktop/banaras-male-dancer.png`,
    banarasFemaleDancer: `${IMAGEKIT_BASE}/vibes/desktop/banaras-female-dancer.png`,

    // Mobile-only decorative elements
    mobile: {
      rangoliBg: `${IMAGEKIT_BASE}/vibes/mobile/rangoli-bg.png`,
      trishul: `${IMAGEKIT_BASE}/vibes/mobile/trishul.png`,
      lotusPairs: `${IMAGEKIT_BASE}/vibes/mobile/lotus-pairs.png`,
      etherealDancer: `${IMAGEKIT_BASE}/vibes/mobile/ethereal-dancer.png`,
      diyaPairs: `${IMAGEKIT_BASE}/vibes/mobile/diya-pairs.png`,
      conchShell: `${IMAGEKIT_BASE}/vibes/mobile/conch-shell.png`,
      varanasiSilhouette: `${IMAGEKIT_BASE}/vibes/mobile/varanasi-silhouette.png`,
    },
  },

  // ============================================
  // FEST HIGHLIGHTS SECTION
  // ============================================
  highlights: {
    // Common
    background: `${IMAGEKIT_BASE}/festival-vibes/common/festive-vibes-bg.png`,
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE SECTION
  // ============================================
  festivalVibes: {
    dj: `${IMAGEKIT_BASE}/festival-vibes/common/dj.png`,
    sareeDrape: `${IMAGEKIT_BASE}/festival-vibes/common/saree-drape.png`,
  },

  // ============================================
  // PRO NITES SECTION
  // ============================================
  proNites: {
    crowdSilhouette: "/home/proNites/CrowdSilhouette.png",
    aerobics: "/home/proNites/Aerobics.png",
    moon: "/home/proNites/Moon.png",
    dancingGirl: "/home/proNites/DancingGirl.png",
    silhouette: "/home/proNites/Silhouette.png",
    moonBackground: "/home/proNites/MoonBackground.png",
  },

  // ============================================
  // FOOTER SECTION - Desktop decorative elements
  // ============================================
  footer: {
    footerDancer: "/home/footer/FooterDancer.png",
    floatingSpeaker: "/home/footer/FloatingSpeaker.png",
    concertFloor: "/home/footer/ConcertFloor.png",
    dancer: "/home/footer/Dancer.png",
    ghatSilhouette: "/home/footer/GhatSilhouette.png",
    subtleRangoli: "/home/footer/SubtleRangoli.png",
    spiritualOrnament: "/home/footer/SpiritualOrnament.png",
    floatingGarland: "/home/footer/FloatingGarland.png",
    standingPillar: "/home/footer/StandingPillar.png",
  },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  misc: {
    lordShiva: "/miscellaneous/LordShiva.png",
    welcomeFlag: "/miscellaneous/WelcomeFlag.png",
    lassi: "/miscellaneous/Lassi.png",
    tablaSitar: "/miscellaneous/TablaSitar.png",
    malaiyo: "/miscellaneous/Malaiyo.png",
    paan: "/miscellaneous/Paan.png",
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  about: {
    background: `${IMAGEKIT_BASE}/about/AboutBackground.png`,
    mandalaOrnament: `${IMAGEKIT_BASE}/about/MandalaOrnament.png`,
    peacock: `${IMAGEKIT_BASE}/about/Peacock.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/MysticDivider.png`,
    diyaCluster: `${IMAGEKIT_BASE}/about/DiyaCluster.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/CornerOrnament.png`,
    bhuGate: `${IMAGEKIT_BASE}/about/BhuRoyalGate.png`,
    ghatsSilhouette: `${IMAGEKIT_BASE}/about/GhatSilhouette.png`,
    heroLeftAbout: `${IMAGEKIT_BASE}/about/HeroLeftDecor.png`,
    dancerGirlHeroAbout: `${IMAGEKIT_BASE}/about/DancerGirlHero.png`,
    // IIT BHU Stamps
    stamps: {
      mandir: `${IMAGEKIT_BASE}/about/stamps/Mandir.png`,
      mainBuilding: `${IMAGEKIT_BASE}/about/stamps/MainBuilding.png`,
      library: `${IMAGEKIT_BASE}/about/stamps/Library.png`,
      kyVenue: `${IMAGEKIT_BASE}/about/stamps/KyVenue.png`,
      heritageHostel: `${IMAGEKIT_BASE}/about/stamps/HeritageHostel.png`,
    },
    // Slider images - Left row (moving left to right)
    slider: {
      left1: `${IMAGEKIT_BASE}/about/slider/SliderLeft1.jpg`,
      left2: `${IMAGEKIT_BASE}/about/slider/SliderLeft2.jpg`,
      left3: `${IMAGEKIT_BASE}/about/slider/SliderLeft3.jpg`,
      left4: `${IMAGEKIT_BASE}/about/slider/SliderLeft4.jpg`,
      left5: `${IMAGEKIT_BASE}/about/slider/SliderLeft5.jpg`,
      left6: `${IMAGEKIT_BASE}/about/slider/SliderLeft6.jpg`,
      // Right row (moving right to left)
      right1: `${IMAGEKIT_BASE}/about/slider/SliderRight1.jpg`,
      right2: `${IMAGEKIT_BASE}/about/slider/SliderRight2.jpg`,
      right3: `${IMAGEKIT_BASE}/about/slider/SliderRight3.jpg`,
      right4: `${IMAGEKIT_BASE}/about/slider/SliderRight4.jpg`,
      right5: `${IMAGEKIT_BASE}/about/slider/SliderRight5.jpg`,
      right6: `${IMAGEKIT_BASE}/about/slider/SliderRight6.jpg`,
    },
  },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  contact: {
    // Contact-specific images
    envelopeScroll: `${IMAGEKIT_BASE}/contact/EnvelopeScrolled.png`,
    conch: `${IMAGEKIT_BASE}/contact/Conch.png`,
    lotusMandala: `${IMAGEKIT_BASE}/contact/LotusMandala.png`,
    floatingDiya: `${IMAGEKIT_BASE}/contact/FloatingDiya.png`,
    // Shared decorative images (reused from about)
    mandalaOrnament: `${IMAGEKIT_BASE}/about/MandalaOrnament.png`,
    peacock: `${IMAGEKIT_BASE}/about/Peacock.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/MysticDivider.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/CornerOrnament.png`,
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  login: {
    mysticGate: `${IMAGEKIT_BASE}/login/MysticGate.png`,
  },

  // ============================================
  // PROFILE PAGE - Decorative elements
  // ============================================
  profile: {
    decorativeCorner: `${IMAGEKIT_BASE}/profile/DecorativeCorner.png`,
    divider: `${IMAGEKIT_BASE}/profile/Divider.png`,
  },

  // ============================================
  // SINGERS / ARTISTS - Pro Nites
  // ============================================
  singers: {
    jubinNautiyal: "/singers/JubinNautiyal.webp",
    darshanRawal: "/singers/DarshanRawal.webp",
    mohitChauhan: "/singers/MohitChauhan.webp",
    vishalShekhar: "/singers/VishalShekhar.webp",
    raftaar: "/singers/Raftaar.jpeg",
    ritviz: "/singers/Ritviz.jpg",
    anubhavBassi: "/singers/AnubhavBassi.jpeg",
    mj5: "/singers/Mj5Group.jpeg",
  },

  // ============================================
  // SPONSORS
  // ============================================
  sponsors: {
    // Background (CDN)
    background: `${IMAGEKIT_BASE}/sponsors/common/sponsor-bg.png`,

    // Decorative elements - flat in /public/sponsors/
    ornamentalDivider: "/sponsors/OrnamentalDivider.png",
    rectangularFrame: "/sponsors/RectangularFrame.png",
    sponsorStamp: "/sponsors/SponsorStamp.png",
    standingGirl: "/sponsors/StandingGirl.png",
    leftTreeBranch: "/sponsors/LeftTreeBranch.png",
    sponsorPresentor: "/sponsors/SponsorPresentor.png",

    // Title & Co-Title
    titleSponsor: "/sponsors/logos/TitleSponsor.jpeg",
    coTitlePartner: "/sponsors/logos/CoTitlePartner.png",

    // Powered By Partners
    poweredByPartner: "/sponsors/logos/PoweredByPartner.jpg",
    coPoweredByPartner: "/sponsors/logos/CoPoweredByPartner.png",
    adaniCoPoweredPartner: "/sponsors/logos/AdaniCoPoweredPartner.png",

    // Major & Event Sponsors
    majorSponsor: "/sponsors/logos/MajorSponsor.jpg",
    eventTitleCrosswindz: "/sponsors/logos/EventTitleCrosswindz.jpg",
    titleEnquiztaSamvad: "/sponsors/logos/TitleEnquiztaSamvad.jpg",

    // Industry Partners
    energyPartner: "/sponsors/logos/EnergyPartner.png",
    steelPartner: "/sponsors/logos/SteelPartner.png",
    buildPartner: "/sponsors/logos/BuildPartner.png",
    constructionPartner: "/sponsors/logos/ConstructionPartner.webp",
    infrastructurePartner: "/sponsors/logos/InfrastructurePartner.png",
    realEstatePartner: "/sponsors/logos/RealEstatePartner.jpeg",
    developmentPartner: "/sponsors/logos/DevelopmentPartner.png",

    // Social & CSR Partners
    nmdcSustainabilityPartner: "/sponsors/logos/NmdcSustainabilityPartner.jpg",
    csrPartner: "/sponsors/logos/CsrPartner.png",
    socialWelfarePartner: "/sponsors/logos/SocialWelfarePartner.png",
    nationBuildingPartner: "/sponsors/logos/NationBuildingPartner.png",
    communityPartner: "/sponsors/logos/CommunityPartner.png",

    // Hospitality & Lifestyle Partners
    hospitalityPartner: "/sponsors/logos/HospitalityPartner.jpeg",
    coffeePartner: "/sponsors/logos/CoffeePartner.png",
    chocolatePartner: "/sponsors/logos/ChocolatePartner.png",
    fragrancePartner: "/sponsors/logos/FragrancePartner.jpg",
    sareePartner: "/sponsors/logos/SareePartner.jpg",

    // Media & Tech Partners
    gamingPartner: "/sponsors/logos/GamingPartner.png",
    musicStreamingPartner: "/sponsors/logos/MusicStreamingPartner.webp",
    innovationPartner: "/sponsors/logos/InnovationPartner.webp",
    dalimssNewsPartner: "/sponsors/logos/DalimssNewsPartner.webp",
    theVibePartner: "/sponsors/logos/TheVibePartner.png",
  },

  // ============================================
  // INTRO SECTION - Mascot and assets
  // ============================================
  intro: {
    cuteBoyMascot: "/intro/CuteBoyMascot.png",
    logo: "/intro/IntroLogo.png",
    stage: "/intro/Stage.png",
    portalSong: "/intro/PortalSong.mp3",
    concertStage: "/intro/ConcertStage.webm",
  },

  // ============================================
  // CAMPUS AMBASSADOR PAGE
  // ============================================
  ca: {
    cosmicBackground: `${IMAGEKIT_BASE}/ca/common/cosmic-background.png`,
    goldenBadge: `${IMAGEKIT_BASE}/ca/common/golden-badge.png`,
    ambassadorDj: `${IMAGEKIT_BASE}/ca/common/ambassador-dj.png`,
    ambassadorDancing: `${IMAGEKIT_BASE}/ca/common/ambassador-dancing.png`,
    ambassadorPose: `${IMAGEKIT_BASE}/ca/common/ambassador-pose.png`,
    ambassadorWalking: `${IMAGEKIT_BASE}/ca/common/ambassador-walking.png`,
  },
} as const;

/**
 * Helper to get ImageKit URL with transformations
 * @example getImageUrl(IMAGES.passes.yatri, "tr:w-300,q-80")
 */
export function getImageUrl(path: string, transformations?: string): string {
  if (!transformations) return path;

  // Insert transformations after base URL
  const imagePath = path.replace(IMAGEKIT_BASE as string, "");
  return `${IMAGEKIT_BASE}/${transformations}${imagePath}`;
}
