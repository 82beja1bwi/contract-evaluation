import {
  relevancies_3c as relevancies,
  u_prefs_535,
  u_prefs_565,
  s_prefs_535,
  s_prefs_565,
} from "../configs.js";
import Calculator from "../../domain/performance_analysis/calculator.js";
import fs from "fs";
import MinHeap from "../../domain/performance_analysis/min_heap.js";
/**
 * pass n contracts to add operation of min heap. 
 * contracts extracted from contract optimization, then shuffled
 * @returns csvLines
 */
function measureMinHeap() {
  const contracts = [];
  const csvLines = [];
  for (const relevanciesOfUser of relevancies) {
    for (const relevanciesOfSite of relevancies) {
      const u_cost_rel =
        relevanciesOfUser[relevanciesOfUser.length - 3] ?? null;
      const u_consent_rel = relevanciesOfUser[0];
      const u_content_rel = relevanciesOfUser[1];

      const s_cost_rel = relevanciesOfSite[0];
      const s_consent_rel = relevanciesOfSite[0];
      const s_content_rel = relevanciesOfSite[1];

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

        const calculator = new Calculator();

        const usersFunction = calculator.calcUsersScoringFunction(usersPrefs);

        const sitesFunction = calculator.calcSitesScoringFunction(sitesPrefs);

        contracts.push(
          calculator.calcNashContracts(
            usersPrefs,
            sitesPrefs,
            usersFunction,
            sitesFunction,
            10000
          )
        );
      }
    }
  }

  contracts.forEach((contracts) => {
    const minHeap = new MinHeap(1);
    for (let i = contracts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [contracts[i], contracts[j]] = [contracts[j], contracts[i]]; // Swap elements
    }

    contracts.forEach((c) => {
      const score = c.score;
      const contract = c;
      const input = { score, contract };

      const start = performance.now();
      minHeap.add(input);
      const end = performance.now();
      csvLines.push(`${end - start},`);
    });
  });

  return csvLines;
}

/**
 * Run and measure the contract optimization for the known preferences/personas
 * @returns csvLines
 */
function measureCalculation() {
  const csvLines = [];

  for (const relevanciesOfUser of relevancies) {
    for (const relevanciesOfSite of relevancies) {
      const u_cost_rel =
        relevanciesOfUser[relevanciesOfUser.length - 3] ?? null;
      const u_consent_rel = relevanciesOfUser[0];
      const u_content_rel = relevanciesOfUser[1];

      const s_cost_rel = relevanciesOfSite[0];
      const s_consent_rel = relevanciesOfSite[0];
      const s_content_rel = relevanciesOfSite[1];

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

        const calculator = new Calculator();

        let start = performance.now();
        const usersFunction = calculator.calcUsersScoringFunction(usersPrefs);
        let end = performance.now();
        csvLines.push(`u_scoring_func,${end - start},`);

        start = performance.now();
        const sitesFunction = calculator.calcSitesScoringFunction(sitesPrefs);
        end = performance.now();
        csvLines.push(`s_scoring_func,${end - start},`);

        start = performance.now();
        calculator.calcNashContracts(
          usersPrefs,
          sitesPrefs,
          usersFunction,
          sitesFunction,
          1
        );
        end = performance.now();
        csvLines.push(`calculation,${end - start},`);
      }
    }
  }

  return csvLines;
}

/**
 * run and measure contract optimization and min heap operations
 */
export default function run3CPerfAnalysis() {
  //prep header of csv
  let header = "Func,Duration,\n";

  let filePath = "perf_3C_calc.csv";

  fs.unlinkSync(filePath);
  fs.appendFileSync(filePath, header, "utf8");

  let csvLines = measureCalculation();

  // Write the header and CSV line to a file
  csvLines.map((line) => {
    fs.appendFileSync(filePath, line + "\n", "utf8");
  });

  filePath = "perf_3C_min_heap.csv";
  header = "Duration,\n";

  fs.unlinkSync(filePath);
  fs.appendFileSync(filePath, header, "utf8");

  csvLines = measureMinHeap();

  // Write the header and CSV line to a file
  csvLines.map((line) => {
    fs.appendFileSync(filePath, line + "\n", "utf8");
  });
}
