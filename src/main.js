import fs from "fs";
import Calculator from "./domain/calculator.js";
import {
  relevanciesOfIssues,
  sitesPrefs562,
  sitesPrefsBinary,
  usersPrefs562,
  usersPrefsBinary,
  usersPrefs532,
  sitesPrefs532,
  usersPrefs524,
  sitesPrefs524,
  usersPrefs564,
  sitesPrefs564,
} from "./configs.js";

fs.unlinkSync("output.csv");

const calculator = new Calculator();
//prep header of csv
const header =
  "u_cost_rel,u_consent_rel,u_content_rel,s_cost_rel,s_consent_rel,s_content_rel,score_binary_2c,score_binary_3c,score_562_2c,score_562_3c,score_532_2c,score_532_3c,score_524_2c,score_524_3c,score_564_2c,score_564_3c,\n";
fs.appendFileSync("output.csv", header, "utf8");

for (const relevanciesOfUser of relevanciesOfIssues) {
  for (const relevanciesOfSite of relevanciesOfIssues) {
    const u_cost_rel = relevanciesOfUser[0];
    const u_consent_rel = relevanciesOfUser[1];
    const u_content_rel = relevanciesOfUser[2];

    const s_cost_rel = relevanciesOfSite[0];
    const s_consent_rel = relevanciesOfSite[1];
    const s_content_rel = relevanciesOfSite[2];

    let contractPairs = [];

    for (const [usersPrefs, sitesPrefs] of [
      [usersPrefsBinary, sitesPrefsBinary],
      [usersPrefs562, sitesPrefs562],
      [usersPrefs532, sitesPrefs532],
      [usersPrefs524, sitesPrefs524],
      [usersPrefs564, sitesPrefs564],
    ]) {
      usersPrefs.cost.setRelevance(u_cost_rel);
      usersPrefs.consent.setRelevance(u_consent_rel);
      usersPrefs.content.setRelevance(u_content_rel);

      sitesPrefs.cost.setRelevance(s_cost_rel);
      sitesPrefs.consent.setRelevance(s_consent_rel);
      sitesPrefs.content.setRelevance(s_content_rel);

      contractPairs.push(calcContracts(usersPrefs, sitesPrefs));
    }

    // const score_binary_2c = contractsBinary[0].score;
    // const score_binary_3c = contractsBinary[1].score;
    // const score_562_2c = contractsGranular[0].score;
    // const score_562_3c = contractsGranular[1].score;

    // Create CSV line
    let csvLine = `${u_cost_rel},${u_consent_rel},${u_content_rel},${s_cost_rel},${s_consent_rel},${s_content_rel},`;

    for (const pair of contractPairs) {
      csvLine += `${pair[0].score},${pair[1].score},`;
    }

    csvLine += "\n";

    // Write the header and CSV line to a file
    fs.appendFileSync("output.csv", csvLine, "utf8");
  }
}

function calcContracts(usersPrefs, sitesPrefs) {
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
