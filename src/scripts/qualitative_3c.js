import {
  relevancies_3c as relevancies,
  u_prefs_535,
  u_prefs_565,
  s_prefs_535,
  s_prefs_565,
} from "../configs/configs.js";
import Calculator from "../domain/calculator.js";
import fs from "fs";

function calcContracts(usersPrefs, sitesPrefs) {
  const calculator = new Calculator();

  const usersFunction = calculator.calcUsersScoringFunction(usersPrefs);
  const sitesFunction = calculator.calcSitesScoringFunction(sitesPrefs);

  return calculator.calcNashContracts(
    usersPrefs,
    sitesPrefs,
    usersFunction,
    sitesFunction,
    null
  );
}

export default function run3CQualititativeAnalysis() {
  //prep header of csv
  const header =
    "user,site,default,score_535,score_565,consent_535,consent_565,content_535,content_565,cost_535,cost_565,\n";

  const filePath = "qualitative_3c.csv";

  fs.unlinkSync(filePath);
  fs.appendFileSync(filePath, header, "utf8");

  for (const relevanciesOfUser of relevancies) {
    for (const relevanciesOfSite of relevancies) {
      const u_cost_rel = relevanciesOfUser[0];
      const u_consent_rel = relevanciesOfUser[1];
      const u_content_rel = relevanciesOfUser[2];

      const s_cost_rel = relevanciesOfSite[0];
      const s_consent_rel = relevanciesOfSite[1];
      const s_content_rel = relevanciesOfSite[2];

      const default_score = Math.round(
        10000 *
          //users score
          (u_cost_rel * 0.8 + u_consent_rel * 1 + u_content_rel / 2) *
          //sites score
          (s_cost_rel * 0 + s_consent_rel * 0 + s_content_rel / 2),
        2
      );

      let contracts = [];

      for (const [usersPrefs, sitesPrefs] of [
        [u_prefs_535, s_prefs_535],
        [u_prefs_565, s_prefs_565],
      ]) {
        usersPrefs.cost.setRelevance(u_cost_rel);
        usersPrefs.consent.setRelevance(u_consent_rel);
        usersPrefs.content.setRelevance(u_content_rel);

        sitesPrefs.cost.setRelevance(s_cost_rel);
        sitesPrefs.consent.setRelevance(s_consent_rel);
        sitesPrefs.content.setRelevance(s_content_rel);

        contracts.push(calcContracts(usersPrefs, sitesPrefs));
      }

      // Create CSV line
      let csvLine = `${relevanciesOfUser.join(" ")},${relevanciesOfSite.join(
        " "
      )},${default_score},`;

      for (const contract of contracts) {
        csvLine += `${contract[0].score},`;
      }

      const contract534 = contracts[0][0];
      const contract564 = contracts[1][0];
      csvLine += `${contract534.consent.toString()},${contract564.consent.toString()},${
        contract564.content
      },${contract564.content},${contract564.cost},${contract564.cost},`;

      csvLine += "\n";

      // Write the header and CSV line to a file
      fs.appendFileSync(filePath, csvLine, "utf8");
    }
  }
}
