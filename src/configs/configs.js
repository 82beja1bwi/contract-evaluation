import ScoredPreferences, {
  Issue,
} from "../domain/models/scored_preferences.js";

const LOW = 0.2;
const MEDIUM = 0.33;
const HIGH = 0.6; // 1 High + 2x Low === 1

const LOW_2C = 0.2;
const MEDIUM_2C = 0.5;
const HIGH_2C = 0.8; // 1 High + 1x Low === 1

// Vary Relevances Of Issues
const relevancies_3c = [
  [HIGH, LOW, LOW], // Tabloid Terry  &   Premium Press
  [LOW, HIGH, LOW], // Privacy Priscilla   &   Tabloid Press
  [LOW, LOW, HIGH], // Content Connie   &   Affordable News Network
  [MEDIUM, MEDIUM, MEDIUM], // Balanced Brian   &   Balanced Brief
];

const relevancies_2c = [
  //[HIGH, LOW, LOW], // Tabloid Terry  &   Premium Press
  [HIGH_2C, LOW_2C], // Privacy Priscilla   &   (Tabloid Press & Premium Press)
  [LOW_2C, HIGH_2C], // (Content Connie & Tabloid Terry)  &   Affordable News Network
  [MEDIUM_2C, MEDIUM_2C], // Balanced Brian   &   Balanced Brief
];

//same for site and user
const consentPrefs = {
  threeOptions: {
    analytics: 0.4,
    personalizedAds: 0.5,
    externalContent: 0.1,
  },
  sixOptions: {
    analytics: 0.2,
    marketing: 0.1,
    personalizedAds: 0.4,
    personalizedContent: 0.1,
    externalContent: 0.1,
    identification: 0.1,
  },
};

const contentPrefs = {
  user: {
    twoC: {
      fourOptions: {
        80: 1,
        70: 0.9,
        50: 0.5,
        20: 0.3,
      },
      sevenOptions: {
        80: 1,
        75: 0.95,
        70: 0.9,
        60: 0.7,
        50: 0.5,
        40: 0.4,
        20: 0.3,
      },
    },
    threeC: {
      100: 0.8,
      80: 1,
      70: 0.7,
      50: 0.5,
      20: 0,
    },
  },
  site: {
    twoC: {
      fourOptions: {
        80: 0.7,
        70: 1,
        50: 0.8,
        20: 0.4,
      },
      sevenOptions: {
        80: 0.7,
        75: 0.8,
        70: 1,
        60: 0.9,
        50: 0.8,
        40: 0.6,
        20: 0.4,
      },
    },
    threeC: {
      100: 0.7,
      80: 1,
      70: 0.8,
      50: 0.5,
      20: 0,
    },
  },
};

const userPrefs = (complexConsent, complexContent) => {
  return {
    twoC: {
      consent: complexConsent
        ? consentPrefs.sixOptions
        : consentPrefs.threeOptions,
      content: complexContent
        ? contentPrefs.user.twoC.sevenOptions
        : contentPrefs.user.twoC.fourOptions,
    },
    threeC: {
      cost: {
        0: 0.8,
        1: 1,
        6: 0.7,
        12: 0.3,
        20: 0,
      },
      consent: complexConsent
        ? consentPrefs.sixOptions
        : consentPrefs.threeOptions,
      content: contentPrefs.user.threeC,
    },
  };
};

const sitesPrefs = (complexConsent, complexContent) => {
  return {
    twoC: {
      consent: complexConsent
        ? consentPrefs.sixOptions
        : consentPrefs.threeOptions,
      content: complexContent
        ? contentPrefs.site.twoC.sevenOptions
        : contentPrefs.site.twoC.fourOptions,
    },
    threeC: {
      cost: {
        0: 0,
        1: 0.5,
        6: 0.7,
        12: 0.9,
        20: 1,
      },
      consent: complexConsent
        ? consentPrefs.sixOptions
        : consentPrefs.threeOptions,
      content: contentPrefs.site.threeC,
    },
  };
};

// -------------- 2C Preferences --------------- //

const s_prefs_34 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(sitesPrefs(false).twoC.consent))
  .setContent(new Issue().setResolutions(sitesPrefs(null, false).twoC.content));

const s_prefs_64 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(sitesPrefs(true).twoC.consent))
  .setContent(new Issue().setResolutions(sitesPrefs(null, false).twoC.content));

const s_prefs_67 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(sitesPrefs(true).twoC.consent))
  .setContent(new Issue().setResolutions(sitesPrefs(null, true).twoC.content));


const u_prefs_34 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(userPrefs(false).twoC.consent))
  .setContent(new Issue().setResolutions(userPrefs(null, false).twoC.content));

const u_prefs_64 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(userPrefs(true).twoC.consent))
  .setContent(new Issue().setResolutions(userPrefs(null, false).twoC.content));

const u_prefs_67 = new ScoredPreferences()
  .setConsent(new Issue().setResolutions(userPrefs(true).twoC.consent))
  .setContent(new Issue().setResolutions(userPrefs(null, true).twoC.content));

// -------------- 3C Preferences --------------- //

const s_prefs_535 = new ScoredPreferences()
  .setCost(new Issue().setResolutions(sitesPrefs(null).threeC.cost))
  .setConsent(new Issue().setResolutions(sitesPrefs(false).threeC.consent))
  .setContent(
    new Issue().setResolutions(sitesPrefs(null, false).threeC.content)
  );

const s_prefs_565 = new ScoredPreferences()
  .setCost(new Issue().setResolutions(sitesPrefs(null).threeC.cost))
  .setConsent(new Issue().setResolutions(sitesPrefs(true).threeC.consent))
  .setContent(
    new Issue().setResolutions(sitesPrefs(null, false).threeC.content)
  );

const u_prefs_535 = new ScoredPreferences()
  .setCost(new Issue().setResolutions(userPrefs(null).threeC.cost))
  .setConsent(new Issue().setResolutions(userPrefs(false).threeC.consent))
  .setContent(
    new Issue().setResolutions(userPrefs(null, false).threeC.content)
  );

const u_prefs_565 = new ScoredPreferences()
  .setCost(new Issue().setResolutions(userPrefs(null).threeC.cost))
  .setConsent(new Issue().setResolutions(userPrefs(true).threeC.consent))
  .setContent(
    new Issue().setResolutions(userPrefs(null, false).threeC.content)
  );

// --------------    Export   --------------- //

export {
  relevancies_2c,
  relevancies_3c,
  u_prefs_34,
  u_prefs_64,
  u_prefs_67,
  u_prefs_535,
  u_prefs_565,
  s_prefs_34,
  s_prefs_64,
  s_prefs_67,
  s_prefs_535,
  s_prefs_565,
};
