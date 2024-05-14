import ScoredPreferences, { Issue } from "./models/scored_preferences.js";
// Vary Relevances Of Issues
const relevanciesOfIssues = [
  [0.0, 0.1, 0.9],
  [0.0, 0.2, 0.8],
  [0.0, 0.3, 0.7],
  [0.0, 0.4, 0.6],
  [0.0, 0.5, 0.5],
  [0.0, 0.6, 0.4],
  [0.0, 0.7, 0.3],
  [0.0, 0.8, 0.2],
  [0.0, 0.9, 0.1],
  //
  [0.1, 0.1, 0.8],
  [0.1, 0.2, 0.7],
  [0.1, 0.3, 0.6],
  [0.1, 0.4, 0.5],
  [0.1, 0.5, 0.4],
  [0.1, 0.6, 0.3],
  [0.1, 0.7, 0.2],
  [0.1, 0.8, 0.1],
  //[0.1, 0.9, 0],
  [0.2, 0.1, 0.7],
  [0.2, 0.2, 0.6],
  [0.2, 0.3, 0.5],
  [0.2, 0.4, 0.4],
  [0.2, 0.5, 0.3],
  [0.2, 0.6, 0.2],
  //[0.2, 0.8, 0],
  [0.3, 0.1, 0.6],
  [0.3, 0.2, 0.5],
  [0.3, 0.3, 0.4],
  [0.3, 0.4, 0.3],
  [0.3, 0.5, 0.2],
  //[0.3, 0.7, 0],
  [0.4, 0.1, 0.5],
  [0.4, 0.2, 0.4],
  [0.4, 0.3, 0.3],
  [0.4, 0.4, 0.2],
  [0.4, 0.5, 0.1],
  //[0.4, 0.6, 0],
  [0.5, 0.1, 0.4],
  [0.5, 0.2, 0.3],
  [0.5, 0.3, 0.2],
  [0.5, 0.4, 0.1],
  //[0.5, 0.5, 0],
  [0.6, 0.1, 0.3],
  [0.6, 0.2, 0.2],
  //[0.6, 0.4, 0],
  [0.7, 0.1, 0.2],
  //[0.7, 0.3, 0],
  [0.8, 0.1, 0.1],
  //[0.8, 0.2, 0],
  //[0.9, 0.1, 0],
];

//------------A complex cost rest BINARY-------------------------

const usersPrefsBinary = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.4).setResolutions({
      0: 1,
      1: 3 / 4,
      6: 1 / 2,
      12: 1 / 8,
      20: 0,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      all: 1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.4).setResolutions({
      full: 1,
      restr: 3 / 8,
    })
  );
const sitesPrefsBinary = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.5).setResolutions({
      0: 0,
      1: 6 / 10,
      6: 8 / 10,
      12: 9 / 10,
      20: 1,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      all: 1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.3).setResolutions({
      full: 1,
      restr: 1 / 2,
    })
  );


//------ +  Complex Consent (6 Options) -> 562 -----
const usersPrefs562 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.4).setResolutions({
      0: 1,
      1: 3 / 4,
      6: 1 / 2,
      12: 1 / 8,
      20: 0,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.2,
      marketing: 0.1,
      personalizedContent: 0.1,
      personalizedAds: 0.4,
      externalContent: 0.1,
      identification: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.4).setResolutions({
      100: 1,
    //   90: 7 / 8,
    //   70: 5 / 8,
      50: 3 / 8,
    })
  );
const sitesPrefs562 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.5).setResolutions({
      0: 0,
      1: 6 / 10,
      6: 8 / 10,
      12: 9 / 10,
      20: 1,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.2,
      marketing: 0.1,
      personalizedContent: 0.1,
      personalizedAds: 0.4,
      externalContent: 0.1,
      identification: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.3).setResolutions({
      100: 1,
    //   90: 7 / 8,
    //   70: 6 / 8,
      50: 1 / 2,
    })
  );

//------ + B Prefs with Complex Consent (3 Options) -----
const usersPrefs532 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.4).setResolutions({
      0: 1,
      1: 3 / 4,
      6: 1 / 2,
      12: 1 / 8,
      20: 0,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.4,
      personalizedAds: 0.5,
      externalContent: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.4).setResolutions({
      100: 1,
      //   90: 7 / 8,
      //   70: 5 / 8,
      50: 3 / 8,
    })
  );
const sitesPrefs532 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.5).setResolutions({
      0: 0,
      1: 6 / 10,
      6: 8 / 10,
      12: 9 / 10,
      20: 1,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.4,
      personalizedAds: 0.5,
      externalContent: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.3).setResolutions({
      100: 1,
      //   90: 7 / 8,
      //   70: 6 / 8,
      50: 1 / 2,
    })
  );
//------ + C Prefs with Complex Content -----------
const usersPrefs524 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.4).setResolutions({
      0: 1,
      1: 3 / 4,
      6: 1 / 2,
      12: 1 / 8,
      20: 0,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      all: 1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.4).setResolutions({
      100: 1,
      90: 7 / 8,
      70: 5 / 8,
      50: 3 / 8,
    })
  );
const sitesPrefs524 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.5).setResolutions({
      0: 0,
      1: 6 / 10,
      6: 8 / 10,
      12: 9 / 10,
      20: 1,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      all: 1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.3).setResolutions({
      100: 1,
      90: 7 / 8,
      70: 6 / 8,
      50: 1 / 2,
    })
  );

//------------ Complex all 3C ---------------------------

const usersPrefs564 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.4).setResolutions({
      0: 1,
      1: 3 / 4,
      6: 1 / 2,
      12: 1 / 8,
      20: 0,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.2,
      marketing: 0.1,
      personalizedContent: 0.1,
      personalizedAds: 0.4,
      externalContent: 0.1,
      identification: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.4).setResolutions({
      100: 1,
      90: 7 / 8,
      70: 5 / 8,
      50: 3 / 8,
    })
  );
const sitesPrefs564 = new ScoredPreferences()
  .setCost(
    new Issue().setRelevance(0.5).setResolutions({
      0: 0,
      1: 6 / 10,
      6: 8 / 10,
      12: 9 / 10,
      20: 1,
    })
  )
  .setConsent(
    new Issue().setRelevance(0.2).setResolutions({
      analytics: 0.2,
      marketing: 0.1,
      personalizedContent: 0.1,
      personalizedAds: 0.4,
      externalContent: 0.1,
      identification: 0.1,
    })
  )
  .setContent(
    new Issue().setRelevance(0.3).setResolutions({
      100: 1,
      90: 7 / 8,
      70: 6 / 8,
      50: 1 / 2,
    })
  );


  export {
    relevanciesOfIssues,
    usersPrefsBinary,
    usersPrefs562,
    sitesPrefsBinary,
    sitesPrefs562,
    usersPrefs532,
    sitesPrefs532,
    usersPrefs524,
    sitesPrefs524,
    usersPrefs564,
    sitesPrefs564
  };