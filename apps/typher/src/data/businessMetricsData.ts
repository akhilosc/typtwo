export interface BusinessValueMetric {
  id: string;
  valueRange: string;
  label: string;
  sublabel: string;
  caveat: string;
}

export const BUSINESS_METRICS: BusinessValueMetric[] = [
  {
    id: 'workflow-effort',
    valueRange: '10–30%',
    label: 'POTENTIAL WORKFLOW EFFORT REDUCTION',
    sublabel: 'In selected repetitive engineering & ops workflows',
    caveat: 'Illustrative scenario based on internal pilot benchmarks',
  },
  {
    id: 'task-time',
    valueRange: '20–50%',
    label: 'TIME REDUCTION ON REPETITIVE TASKS',
    sublabel: 'Across data entry, document reading, and ticket triage',
    caveat: 'Results depend on baseline workflow automation level',
  },
  {
    id: 'response-time',
    valueRange: '60–90%',
    label: 'FASTER RESPONSE TIMES',
    sublabel: 'Automated local handling of standard inquiries',
    caveat: 'Applies to zero-latency first-token local agent loops',
  },
  {
    id: 'hours-recovered',
    valueRange: '5–10+',
    label: 'HOURS RECOVERED',
    sublabel: 'Per person / week in knowledge-intensive roles',
    caveat: 'Illustrative model based on 40-hour work week',
  },
];

export interface RoiCalculatorDefaults {
  employees: number;
  monthlyCostPerEmployee: number;
  repetitiveHoursPerWeek: number;
  estimatedAutomationPercent: number;
  currentSoftwareSpendMonthly: number;
}

export const DEFAULT_ROI_INPUTS: RoiCalculatorDefaults = {
  employees: 100,
  monthlyCostPerEmployee: 8000,
  repetitiveHoursPerWeek: 8,
  estimatedAutomationPercent: 25,
  currentSoftwareSpendMonthly: 5000,
};
