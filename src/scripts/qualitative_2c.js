import {
  relevancies_2c as relevancies,
  relevancies_3c,
  u_prefs_34,
  u_prefs_64,
  s_prefs_34,
  s_prefs_64,
  u_prefs_67,
  s_prefs_67,
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

export default function runQualititativeAnalysis() {
  //prep header of csv
  const header =
    "user,site,default,score_34,score_64,score_67,consent_34,consent_64,consent_67,content_34,content_64,content_67,\n";

  const filePath = "qualitative_2c.csv";

  fs.unlinkSync(filePath);
  fs.appendFileSync(filePath, header, "utf8");

  for (const relevanciesOfUser of relevancies) {
    for (const relevanciesOfSite of relevancies) {
      //const u_cost_rel = relevanciesOfUser[relevanciesOfUser.length - 3] ?? null;  2C//3C
      const u_consent_rel = relevanciesOfUser[0];
      const u_content_rel = relevanciesOfUser[1];

      //const s_cost_rel = relevanciesOfSite[0];
      const s_consent_rel = relevanciesOfSite[0];
      const s_content_rel = relevanciesOfSite[1];

      const default_score = Math.round(
        10000 * //u_cost_rel * 0 +
          //users score
          (u_consent_rel * 1 +
            u_content_rel / 2) * //s_cost_rel * 0 +
              //sites score
              (s_consent_rel * 0 + s_content_rel / 2),2)
      

      let contracts = [];

      for (const [usersPrefs, sitesPrefs] of [
        [u_prefs_34, s_prefs_34],
        [u_prefs_64, s_prefs_64],
        [u_prefs_67, s_prefs_67],
      ]) {
        //usersPrefs.cost.setRelevance(u_cost_rel);
        usersPrefs.consent.setRelevance(u_consent_rel);
        usersPrefs.content.setRelevance(u_content_rel);

        //sitesPrefs.cost.setRelevance(s_cost_rel);
        sitesPrefs.consent.setRelevance(s_consent_rel);
        sitesPrefs.content.setRelevance(s_content_rel);

        contracts.push(calcContracts(usersPrefs, sitesPrefs));
      }

      // Create CSV line
      let csvLine = `${relevanciesOfUser.join(' ')},${relevanciesOfSite.join(' ')},${default_score},`;

      for (const contract of contracts) {
        csvLine += `${contract[0].score},`;
      }

      const contract34 = contracts[0][0];
      const contract64 = contracts[1][0];
      const contract67 = contracts[2][0];
      csvLine += `${contract34.consent.toString()},${contract64.consent.toString()},${contract67.consent.toString()},${
        contract64.content
      },${contract64.content},${contract67.content},`;

      csvLine += "\n";

      // Write the header and CSV line to a file
      fs.appendFileSync(filePath, csvLine, "utf8");
    }
  }
}
