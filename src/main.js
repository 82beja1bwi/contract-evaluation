import Calculator from './calculator.js'
import ScoredPreferences, {
  Issue
} from './models/scored_preferences.js'
import MinHeap from './min_heap.js'

const calculator = new Calculator()

// input
const usersPrefs = new ScoredPreferences()
  .setConsent(new Issue().setRelevance(0.5).setResolutions({ 0: 1, 1: 0 }))
  .setContent(
    new Issue().setRelevance(0.5).setResolutions({ 100: 1, 50: 0.5 })
  )

const sitesPrefs = new ScoredPreferences()
  .setConsent(new Issue().setRelevance(0.5).setResolutions({ 0: 0, 1: 1 }))
  .setContent(
    new Issue().setRelevance(0.5).setResolutions({ 100: 1, 50: 0.5 })
  )

const usersFunction = calculator.calcUsersScoringFunction(usersPrefs)
const sitesFunction = calculator.calcSitesScoringFunction(sitesPrefs)

const contracts = calculator.calcNashContracts(
  usersPrefs,
  sitesPrefs,
  usersFunction,
  sitesFunction,
  null
)

// calculate contracts
// get best 2c and best 3c from polymorphed minHeap

// write best contracts (2C & 3C) to csv (?)
