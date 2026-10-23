import type { ImageToUpload } from "./types";

/**
 * All images to upload with their target folders
 * Organized by section and device type (common/desktop/mobile)
 */
export const IMAGES_TO_UPLOAD: ImageToUpload[] = [
  // ============================================
  // PASSES
  // ============================================
  { localFile: "passes/YatriPass.png", remoteName: "yatri-pass.png", folder: "/passes" },
  { localFile: "passes/DarbarPass.png", remoteName: "darbar-pass.png", folder: "/passes" },
  { localFile: "passes/SwarnimPass.png", remoteName: "swarnim-pass.png", folder: "/passes" },

  // ============================================
  // ZONALS - pass artwork (floating decor on /zonals/colleges)
  // ============================================
  {
    localFile: "zonals/singlePassPortrait.png",
    remoteName: "single-pass-portrait.png",
    folder: "/zonals",
  },
  {
    localFile: "zonals/singlePassLandscape.png",
    remoteName: "single-pass-landscape.png",
    folder: "/zonals",
  },
  {
    localFile: "zonals/multiPassPortrait.png",
    remoteName: "multi-pass-portrait.png",
    folder: "/zonals",
  },
  {
    localFile: "zonals/multiPassLandscape.png",
    remoteName: "multi-pass-landscape.png",
    folder: "/zonals",
  },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  {
    localFile: "home/hero/KashiYatraLogo.png",
    remoteName: "kashiyatra-logo.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroLogo.png",
    remoteName: "hero-logo.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/GhatsDay.png",
    remoteName: "ghats-day.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/GhatsNight.png",
    remoteName: "ghats-night.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/ModeChange.png",
    remoteName: "mode-change.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/KashiVishwanathTemple.png",
    remoteName: "kashivishwanath-temple.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/VaranasiTownBackground.png",
    remoteName: "varanasi-back.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/Stone.png",
    remoteName: "stepping-stone.png",
    folder: "/hero/common",
  },
  { localFile: "home/hero/Kites.png", remoteName: "kites.png", folder: "/hero/common" },
  {
    localFile: "home/hero/HeroLeft.png",
    remoteName: "hero-left-v5.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroLeftV2.png",
    remoteName: "hero-left-v2.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroRight.png",
    remoteName: "hero-right-v5.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroRightDay.png",
    remoteName: "hero-right-day.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroRightDayV2.png",
    remoteName: "hero-right-day-v2.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/HeroRightNight.png",
    remoteName: "hero-right-night.png",
    folder: "/hero/common",
  },

  // ============================================
  // NAVBAR - Page-specific variants
  // ============================================
  // Main/Home navbar (golden/cream theme)
  { localFile: "navbar/MainBackground.png", remoteName: "nav-bg.png", folder: "/navbar/main" },
  {
    localFile: "navbar/MainBadge.png",
    remoteName: "nav-badge-home.png",
    folder: "/navbar/main",
  },
  {
    localFile: "navbar/MainBadgev5.png",
    remoteName: "nav-badge-home-v5.png",
    folder: "/navbar/main",
  },
  // About page navbar (purple/blue concert theme)
  {
    localFile: "navbar/AboutBackground.png",
    remoteName: "navbar-about.png",
    folder: "/navbar/about",
  },
  {
    localFile: "navbar/AboutBadge.png",
    remoteName: "nav-badge-about.png",
    folder: "/navbar/about",
  },
  {
    localFile: "navbar/AboutBadgeV4.png",
    remoteName: "nav-badge-about-v4.png",
    folder: "/navbar/about",
  },
  // Sponsors page navbar (green/gold nature theme)
  {
    localFile: "navbar/SponsorBackground.png",
    remoteName: "nav-sponsor.png",
    folder: "/navbar/sponsor",
  },
  {
    localFile: "navbar/SponsorBadge.png",
    remoteName: "nav-badge-sponsor.png",
    folder: "/navbar/sponsor",
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  // Common
  {
    localFile: "home/banarasiVibes/VibesBackground.png",
    remoteName: "vibes-bg.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/BanarasiVibesBg.png",
    remoteName: "banarasi-vibes-bg-dark.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/Mahamana.png",
    remoteName: "mahamana.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/BhuGate.png",
    remoteName: "bhu-gate.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/Rickshaw.png",
    remoteName: "rickshaw.png",
    folder: "/vibes/common",
  },

  // Desktop-only
  {
    localFile: "home/banarasiVibes/Mandala.png",
    remoteName: "mandala.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/GangaArtiSaint.png",
    remoteName: "ganga-aarti-saint.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/BharatnatyamDancer.png",
    remoteName: "bharatnatyam-dancer.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/banaras_male_dancer.png",
    remoteName: "banaras-male-dancer.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/banaras_female_dancer.png",
    remoteName: "banaras-female-dancer.png",
    folder: "/vibes/desktop",
  },

  // Mobile-only
  {
    localFile: "home/banarasiVibes/RangoliBackground.png",
    remoteName: "rangoli-bg.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/Trishul.png",
    remoteName: "trishul.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/LotusPairs.png",
    remoteName: "lotus-pairs.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/EtherealDancer.png",
    remoteName: "ethereal-dancer.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/DiyaPairs.png",
    remoteName: "diya-pairs.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/ConchShell.png",
    remoteName: "conch-shell.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/VaranasiSilhouette.png",
    remoteName: "varanasi-silhouette.png",
    folder: "/vibes/mobile",
  },

  // ============================================
  // FEST HIGHLIGHTS
  // ============================================
  {
    localFile: "home/festiveHighlights/DurgaTemple.svg",
    remoteName: "durga-temple.svg",
    folder: "/highlights/common",
  },
  {
    localFile: "home/festiveHighlights/Durga.svg",
    remoteName: "durga.svg",
    folder: "/highlights/desktop",
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE
  // ============================================
  {
    localFile: "home/festiveHighlights/FestiveVibesBg.png",
    remoteName: "festive-vibes-bg.png",
    folder: "/festival-vibes/common",
  },
  {
    localFile: "home/theExperience/DjGirl.png",
    remoteName: "dj.png",
    folder: "/festival-vibes/common",
  },
  {
    localFile: "home/theExperience/SareeDrape.png",
    remoteName: "saree-drape.png",
    folder: "/festival-vibes/common",
  },

  // ============================================
  // PRO NITES
  // ============================================
  {
    localFile: "home/proNites/DancingGirl.png",
    remoteName: "dancing-girl.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/Moon.png",
    remoteName: "moon.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/Silhouette.png",
    remoteName: "silhouette.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/Aerobics.png",
    remoteName: "aerobics.png",
    folder: "/pro-nites/common",
  },

  // ============================================
  // FOOTER - Desktop decorative elements
  // ============================================
  {
    localFile: "home/footer/Dancer.png",
    remoteName: "ethereal-dancer.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/FloatingGarland.png",
    remoteName: "floating-garland.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/GhatSilhouette.png",
    remoteName: "ghat-silhouette.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/SpiritualOrnament.png",
    remoteName: "spiritual-ornament.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/StandingPillar.png",
    remoteName: "temple-pillar.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/SubtleRangoli.png",
    remoteName: "subtle-rangoli.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/FloatingSpeaker.png",
    remoteName: "floating-speaker.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/ConcertFloor.png",
    remoteName: "concert-floor.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/FooterDancer.png",
    remoteName: "footer-dancer.png",
    folder: "/footer/desktop",
  },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  {
    localFile: "miscellaneous/LordShiva.png",
    remoteName: "lord-shiva.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/WelcomeFlag.png",
    remoteName: "welcome-flag.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/Lassi.png",
    remoteName: "lassi.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/TablaSitar.png",
    remoteName: "tabla-sitar.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/Malaiyo.png",
    remoteName: "malaiyo.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/Paan.png",
    remoteName: "paan.png",
    folder: "/misc",
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  { localFile: "about/AboutBackground.png", remoteName: "AboutBackground.png", folder: "/about" },
  {
    localFile: "about/MandalaOrnament.png",
    remoteName: "MandalaOrnament.png",
    folder: "/about",
  },
  {
    localFile: "about/Peacock.png",
    remoteName: "Peacock.png",
    folder: "/about",
  },
  { localFile: "about/OmLotus.png", remoteName: "OmLotus.png", folder: "/about" },
  {
    localFile: "about/MysticDivider.png",
    remoteName: "MysticDivider.png",
    folder: "/about",
  },
  {
    localFile: "about/DiyaCluster.png",
    remoteName: "DiyaCluster.png",
    folder: "/about",
  },
  {
    localFile: "about/CornerOrnament.png",
    remoteName: "CornerOrnament.png",
    folder: "/about",
  },
  {
    localFile: "about/BhuRoyalGate.png",
    remoteName: "BhuRoyalGate.png",
    folder: "/about",
  },
  {
    localFile: "about/GhatSilhouette.png",
    remoteName: "GhatSilhouette.png",
    folder: "/about",
  },
  {
    localFile: "about/HeroLeftDecor.png",
    remoteName: "HeroLeftDecor.png",
    folder: "/about",
  },
  {
    localFile: "about/DancerGirlHero.png",
    remoteName: "DancerGirlHero.png",
    folder: "/about",
  },
  // IIT BHU Stamps
  { localFile: "about/stamps/Mandir.png", remoteName: "Mandir.png", folder: "/about/stamps" },
  {
    localFile: "about/stamps/MainBuilding.png",
    remoteName: "MainBuilding.png",
    folder: "/about/stamps",
  },
  { localFile: "about/stamps/Library.png", remoteName: "Library.png", folder: "/about/stamps" },
  { localFile: "about/stamps/KyVenue.png", remoteName: "KyVenue.png", folder: "/about/stamps" },
  {
    localFile: "about/stamps/HeritageHostel.png",
    remoteName: "HeritageHostel.png",
    folder: "/about/stamps",
  },
  // Slider images - Left side
  {
    localFile: "about/slider/SliderLeft1.jpg",
    remoteName: "SliderLeft1.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderLeft2.jpg",
    remoteName: "SliderLeft2.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderLeft3.jpg",
    remoteName: "SliderLeft3.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderLeft4.jpg",
    remoteName: "SliderLeft4.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderLeft5.jpg",
    remoteName: "SliderLeft5.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderLeft6.jpg",
    remoteName: "SliderLeft6.jpg",
    folder: "/about/slider",
  },
  // Slider images - Right side
  {
    localFile: "about/slider/SliderRight1.jpg",
    remoteName: "SliderRight1.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderRight2.jpg",
    remoteName: "SliderRight2.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderRight3.jpg",
    remoteName: "SliderRight3.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderRight4.jpg",
    remoteName: "SliderRight4.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderRight5.jpg",
    remoteName: "SliderRight5.jpg",
    folder: "/about/slider",
  },
  {
    localFile: "about/slider/SliderRight6.jpg",
    remoteName: "SliderRight6.jpg",
    folder: "/about/slider",
  },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  {
    localFile: "contact/EnvelopeScrolled.png",
    remoteName: "EnvelopeScrolled.png",
    folder: "/contact",
  },
  { localFile: "contact/Conch.png", remoteName: "Conch.png", folder: "/contact" },
  {
    localFile: "contact/LotusMandala.png",
    remoteName: "LotusMandala.png",
    folder: "/contact",
  },
  {
    localFile: "contact/FloatingDiya.png",
    remoteName: "FloatingDiya.png",
    folder: "/contact",
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  {
    localFile: "login/MysticGate.png",
    remoteName: "MysticGate.png",
    folder: "/login",
  },

  // ============================================
  // SINGERS / ARTISTS - Pro Nites
  // ============================================
  {
    localFile: "singers/JubinNautiyal.webp",
    remoteName: "jubin-nautiyal.webp",
    folder: "/singers",
  },
  { localFile: "singers/DarshanRawal.webp", remoteName: "darshan-rawal.webp", folder: "/singers" },
  { localFile: "singers/MohitChauhan.webp", remoteName: "mohit-chauhan.webp", folder: "/singers" },
  {
    localFile: "singers/VishalShekhar.webp",
    remoteName: "vishal-shekhar.webp",
    folder: "/singers",
  },
  { localFile: "singers/Raftaar.jpeg", remoteName: "raftaar.jpeg", folder: "/singers" },
  { localFile: "singers/Ritviz.jpg", remoteName: "ritviz.jpg", folder: "/singers" },
  { localFile: "singers/AnubhavBassi.jpeg", remoteName: "anubhav-bassi.jpeg", folder: "/singers" },
  { localFile: "singers/Mj5Group.jpeg", remoteName: "mj5-group.jpeg", folder: "/singers" },

  // ============================================
  // SPONSORS
  // ============================================
  // Background
  {
    localFile: "sponsors/common/SponsorBg.png",
    remoteName: "sponsor-bg.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/SponsorStamp.png",
    remoteName: "sponsor-stamp.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/StandingGirl.png",
    remoteName: "standing-girl.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/LeftTreeBranch.png",
    remoteName: "left-tree-branch.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/SponsorPresentor.png",
    remoteName: "sponsor-presentor.png",
    folder: "/sponsors/common",
  },

  // Title & Co-Title
  {
    localFile: "sponsors/logos/TitleSponsor.jpeg",
    remoteName: "title-sponsor.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/CoTitlePartner.png",
    remoteName: "co-title-partner.png",
    folder: "/sponsors",
  },

  // Powered By Partners
  {
    localFile: "sponsors/logos/PoweredByPartner.jpg",
    remoteName: "powered-by-partner.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/CoPoweredByPartner.png",
    remoteName: "co-powered-by-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/AdaniCoPoweredPartner.png",
    remoteName: "adani-co-powered-partner.png",
    folder: "/sponsors",
  },

  // Major & Event Sponsors
  {
    localFile: "sponsors/logos/MajorSponsor.jpg",
    remoteName: "major-sponsor.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/EventTitleCrosswindz.jpg",
    remoteName: "event-title-crosswindz.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/TitleEnquiztaSamvad.jpg",
    remoteName: "title-enquizta-samvad.jpg",
    folder: "/sponsors",
  },

  // Industry Partners
  {
    localFile: "sponsors/logos/EnergyPartner.png",
    remoteName: "energy-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/SteelPartner.png",
    remoteName: "steel-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/BuildPartner.png",
    remoteName: "build-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/ConstructionPartner.webp",
    remoteName: "construction-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/InfrastructurePartner.png",
    remoteName: "infrastructure-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/RealEstatePartner.jpeg",
    remoteName: "real-estate-partner.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/DevelopmentPartner.png",
    remoteName: "development-partner.png",
    folder: "/sponsors",
  },

  // Social & CSR Partners
  {
    localFile: "sponsors/logos/NmdcSustainabilityPartner.jpg",
    remoteName: "nmdc-sustainability-partner.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/CsrPartner.png",
    remoteName: "csr-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/SocialWelfarePartner.png",
    remoteName: "social-welfare-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/NationBuildingPartner.png",
    remoteName: "nation-building-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/CommunityPartner.png",
    remoteName: "community-partner.png",
    folder: "/sponsors",
  },

  // Hospitality & Lifestyle Partners
  {
    localFile: "sponsors/logos/HospitalityPartner.jpeg",
    remoteName: "hospitality-partner.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/CoffeePartner.png",
    remoteName: "coffee-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/ChocolatePartner.png",
    remoteName: "chocolate-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/FragrancePartner.jpg",
    remoteName: "fragrance-partner.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/SareePartner.jpg",
    remoteName: "saree-partner.jpg",
    folder: "/sponsors",
  },

  // Media & Tech Partners
  {
    localFile: "sponsors/logos/GamingPartner.png",
    remoteName: "gaming-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/MusicStreamingPartner.webp",
    remoteName: "music-streaming-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/InnovationPartner.webp",
    remoteName: "innovation-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/DalimssNewsPartner.webp",
    remoteName: "dalimss-news-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsors/logos/TheVibePartner.png",
    remoteName: "the-vibe-partner.png",
    folder: "/sponsors",
  },

  // ============================================
  // PROFILE PAGE - Decorative elements
  // ============================================
  {
    localFile: "profile/DecorativeCorner.png",
    remoteName: "DecorativeCorner.png",
    folder: "/profile",
  },
  {
    localFile: "profile/Divider.png",
    remoteName: "Divider.png",
    folder: "/profile",
  },

  // ============================================
  // SPONSORS PAGE - Decorative elements
  // ============================================
  {
    localFile: "sponsors/OrnamentalDivider.png",
    remoteName: "ornamental-divider.png",
    folder: "/sponsors/decorative",
  },
  {
    localFile: "sponsors/RectangularFrame.png",
    remoteName: "rectangular-frame.png",
    folder: "/sponsors/decorative",
  },

  // ============================================
  // INTRO SECTION - Mascot and assets
  // ============================================
  {
    localFile: "intro/CuteBoyMascot.png",
    remoteName: "cute-boy-mascot.png",
    folder: "/intro/common",
  },
  { localFile: "intro/IntroLogo.png", remoteName: "intro-logo.png", folder: "/intro/common" },

  // ============================================
  // CAMPUS AMBASSADOR PAGE
  // ============================================
  {
    localFile: "ca/CosmicBackground.png",
    remoteName: "cosmic-background.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/GoldenBadge.png",
    remoteName: "golden-badge.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/AmbassadorDj.png",
    remoteName: "ambassador-dj.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/AmbassadorDancing.png",
    remoteName: "ambassador-dancing.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/AmbassadorPose.png",
    remoteName: "ambassador-pose.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/AmbassadorWalking.png",
    remoteName: "ambassador-walking.png",
    folder: "/ca/common",
  },

  // ============================================
  // EVENTS PAGE - Category backgrounds
  // ============================================
  { localFile: "events/bg/natraj.webp", remoteName: "natraj.webp", folder: "/events/bg" },
  { localFile: "events/bg/enquizta.webp", remoteName: "enquizta.webp", folder: "/events/bg" },
  { localFile: "events/bg/samwaad.webp", remoteName: "samwaad.webp", folder: "/events/bg" },
  { localFile: "events/bg/abhinay.webp", remoteName: "abhinay.webp", folder: "/events/bg" },
  { localFile: "events/bg/zaika.webp", remoteName: "zaika.webp", folder: "/events/bg" },
  { localFile: "events/bg/crosswindz.webp", remoteName: "crosswindz.webp", folder: "/events/bg" },
  { localFile: "events/bg/toolika.webp", remoteName: "toolika.webp", folder: "/events/bg" },
  { localFile: "events/bg/mirage.webp", remoteName: "mirage.webp", folder: "/events/bg" },
  { localFile: "events/bg/bandish.webp", remoteName: "bandish.webp", folder: "/events/bg" },

  // ============================================
  // EVENTS PAGE - Rangoli art
  // ============================================
  {
    localFile: "events/rangoli/natraj.webp",
    remoteName: "natraj.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/enquizta.webp",
    remoteName: "enquizta.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/samwaad.webp",
    remoteName: "samwaad.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/abhinay.webp",
    remoteName: "abhinay.webp",
    folder: "/events/rangoli",
  },
  { localFile: "events/rangoli/zaika.webp", remoteName: "zaika.webp", folder: "/events/rangoli" },
  {
    localFile: "events/rangoli/crosswindz.webp",
    remoteName: "crosswindz.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/toolika.webp",
    remoteName: "toolika.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/mirage.webp",
    remoteName: "mirage.webp",
    folder: "/events/rangoli",
  },
  {
    localFile: "events/rangoli/bandish.webp",
    remoteName: "bandish.webp",
    folder: "/events/rangoli",
  },

  // ============================================
  // GALLERY PAGE - Photos
  // ============================================
  {
    localFile: "gallery/stage-atmosphere-1.jpg",
    remoteName: "stage-atmosphere-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/pronite-crowd-1.jpg",
    remoteName: "pronite-crowd-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/pronite-crowd-2.jpg",
    remoteName: "pronite-crowd-2.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/stage-lights-1.jpg",
    remoteName: "stage-lights-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/festival-vibes-1.jpg",
    remoteName: "festival-vibes-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/crowd-energy-1.jpg",
    remoteName: "crowd-energy-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/performance-1.jpg",
    remoteName: "performance-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/concert-night-1.jpg",
    remoteName: "concert-night-1.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/concert-night-2.jpg",
    remoteName: "concert-night-2.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/concert-night-3.jpg",
    remoteName: "concert-night-3.jpg",
    folder: "/gallery",
  },
  {
    localFile: "gallery/grand-finale-1.jpg",
    remoteName: "grand-finale-1.jpg",
    folder: "/gallery",
  },

  // ============================================
  // GALLERY PAGE - Videos
  // ============================================
  // NOTE: Videos are intentionally NOT uploaded to ImageKit.
  // They are served directly from /public/gallery/video for now and will be
  // moved to R2 later. Do not add video entries here.

  // ============================================
  // SCHEDULE MAP - Campus images and clouds
  // ============================================
  {
    localFile: "scheduleMap/CampusDay.jpg",
    remoteName: "campus-day.jpg",
    folder: "/schedule-map",
  },
  {
    localFile: "scheduleMap/CampusNight.jpg",
    remoteName: "campus-night.jpg",
    folder: "/schedule-map",
  },
  { localFile: "scheduleMap/Cloud1.png", remoteName: "cloud-1.png", folder: "/schedule-map" },
  { localFile: "scheduleMap/Cloud2.png", remoteName: "cloud-2.png", folder: "/schedule-map" },
  { localFile: "scheduleMap/Cloud3.png", remoteName: "cloud-3.png", folder: "/schedule-map" },

  // ============================================
  // HERO SECTION - Remaining local assets
  // ============================================
  {
    localFile: "home/hero/lotusChooseThemeBox.png",
    remoteName: "lotus-choose-theme-box.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/SteppingStone.webp",
    remoteName: "stepping-stone.webp",
    folder: "/hero/common",
  },

  // ============================================
  // BANARASI VIBES - Remaining local asset
  // ============================================
  {
    localFile: "home/banarasiVibes/Rickshaw.webp",
    remoteName: "rickshaw.webp",
    folder: "/vibes/common",
  },

  // ============================================
  // PRO NITES - Remaining local assets
  // ============================================
  {
    localFile: "home/proNites/CrowdSilhouette.png",
    remoteName: "crowd-silhouette.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/MoonBackground.png",
    remoteName: "moon-background.png",
    folder: "/pro-nites/common",
  },

  // ============================================
  // INTRO SECTION - Remaining assets
  // ============================================
  { localFile: "intro/Stage.png", remoteName: "stage.png", folder: "/intro/common" },
  {
    localFile: "intro/ConcertStage.webm",
    remoteName: "concert-stage.webm",
    folder: "/intro/common",
  },
  {
    localFile: "intro/NeonStage.webp",
    remoteName: "neon-stage.webp",
    folder: "/intro/common",
  },
  {
    localFile: "intro/countdown/plate.png",
    remoteName: "plate.png",
    folder: "/intro/countdown",
  },
  {
    localFile: "intro/countdown/stage.png",
    remoteName: "stage.png",
    folder: "/intro/countdown",
  },
];
