import React, { useState } from 'react';
import { DEFAULT_ROI_INPUTS, RoiCalculatorDefaults } from '../../data/businessMetricsData';
import { Calculator, Sparkles, TrendingUp, Clock, DollarSign, Percent } from 'lucide-react';

interface RoiCalculatorProps {
  className?: string;
  currencySymbol?: string;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  className = '',
  currencySymbol = '$',
}) => {
  const [inputs, setInputs] = useState<RoiCalculatorDefaults>(DEFAULT_ROI_INPUTS);

  // Math Calculations:
  // Total work hours/week per employee = 40
  // Automated hours/week per employee = repetitiveHoursPerWeek * (estimatedAutomationPercent / 100)
  // Total hours recovered/year = employees * automatedHoursPerWeek * 52 weeks
  const automatedHoursPerWeekPerEmp = inputs.repetitiveHoursPerWeek * (inputs.estimatedAutomationPercent / 100);
  const totalHoursRecoveredYear = Math.round(inputs.employees * automatedHoursPerWeekPerEmp * 52);

  // Hourly rate per employee = monthlyCost / (4 weeks * 40 hours) = monthlyCost / 160
  const hourlyRate = inputs.monthlyCostPerEmployee / 160;

  // Monthly labor value recovered = employees * automatedHoursPerWeek * 4.33 weeks * hourlyRate
  const monthlyLaborValue = Math.round(inputs.employees * automatedHoursPerWeekPerEmp * 4.33 * hourlyRate);
  const annualLaborValue = Math.round(monthlyLaborValue * 12);

  // Potential software consolidation savings (e.g. replacing expensive per-seat cloud SaaS tokens)
  const monthlySoftwareSavings = Math.round(inputs.currentSoftwareSpendMonthly * 0.6); // illustrative 60% reduction
  const annualSoftwareSavings = monthlySoftwareSavings * 12;

  const totalAnnualValue = annualLaborValue + annualSoftwareSavings;

  // Estimated Typher private deployment infrastructure cost (illustrative $1,200/mo base for 100 employees)
  const estimatedTypherAnnualCost = Math.max(6000, inputs.employees * 120);
  const estimatedRoiPercent = Math.max(120, Math.round(((totalAnnualValue - estimatedTypherAnnualCost) / estimatedTypherAnnualCost) * 100));

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  return (
    <div className={`machine-panel p-6 sm:p-10 rounded-2xl border border-machine-750 corner-brackets font-mono ${className}`}>
      {/* Header */}
      <div className="border-b border-machine-800 pb-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            ROI ENGINE // OPERATIONAL LEVERAGE ESTIMATOR
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-machine-100 mt-0.5">
            ESTIMATE YOUR LOCAL AI EFFICIENCY VALUE
          </h3>
        </div>

        <div className="text-[10px] px-2.5 py-1 rounded bg-machine-900 border border-machine-800 text-machine-400">
          ILLUSTRATIVE SCENARIO MODEL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Matrix */}
        <div className="lg:col-span-6 space-y-4 text-xs">
          
          {/* Input 1: Employees */}
          <div className="p-3.5 rounded-lg bg-machine-900/90 border border-machine-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-machine-400 font-semibold uppercase">01 // EMPLOYEES</span>
              <span className="text-cyan-300 font-bold">{inputs.employees} team members</span>
            </div>
            <input
              type="range"
              min={5}
              max={1000}
              step={5}
              value={inputs.employees}
              onChange={(e) => setInputs({ ...inputs, employees: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 bg-machine-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Input 2: Monthly Cost per Employee */}
          <div className="p-3.5 rounded-lg bg-machine-900/90 border border-machine-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-machine-400 font-semibold uppercase">02 // MONTHLY COST / EMPLOYEE</span>
              <span className="text-cyan-300 font-bold">{formatCurrency(inputs.monthlyCostPerEmployee)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={inputs.monthlyCostPerEmployee}
              onChange={(e) => setInputs({ ...inputs, monthlyCostPerEmployee: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 bg-machine-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Input 3: Repetitive Hours per Week */}
          <div className="p-3.5 rounded-lg bg-machine-900/90 border border-machine-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-machine-400 font-semibold uppercase">03 // REPETITIVE HOURS / WEEK</span>
              <span className="text-cyan-300 font-bold">{inputs.repetitiveHoursPerWeek} hrs / person</span>
            </div>
            <input
              type="range"
              min={2}
              max={25}
              step={1}
              value={inputs.repetitiveHoursPerWeek}
              onChange={(e) => setInputs({ ...inputs, repetitiveHoursPerWeek: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 bg-machine-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Input 4: Estimated Automation % */}
          <div className="p-3.5 rounded-lg bg-machine-900/90 border border-machine-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-machine-400 font-semibold uppercase">04 // ESTIMATED AUTOMATION %</span>
              <span className="text-cyan-300 font-bold">{inputs.estimatedAutomationPercent}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={inputs.estimatedAutomationPercent}
              onChange={(e) => setInputs({ ...inputs, estimatedAutomationPercent: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 bg-machine-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Input 5: Current Cloud AI / SaaS Spend */}
          <div className="p-3.5 rounded-lg bg-machine-900/90 border border-machine-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-machine-400 font-semibold uppercase">05 // CURRENT MONTHLY AI / SAAS SPEND</span>
              <span className="text-cyan-300 font-bold">{formatCurrency(inputs.currentSoftwareSpendMonthly)}</span>
            </div>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={inputs.currentSoftwareSpendMonthly}
              onChange={(e) => setInputs({ ...inputs, currentSoftwareSpendMonthly: parseInt(e.target.value) })}
              className="w-full accent-cyan-400 bg-machine-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

        </div>

        {/* Right Calculated Outputs Matrix */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="machine-panel p-6 rounded-xl border border-cyan-500/70 shadow-glow-cyan bg-machine-850 space-y-6">
            
            {/* Top Primary ROI Badge */}
            <div className="flex items-center justify-between border-b border-machine-800 pb-4">
              <div>
                <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
                  ESTIMATED OPERATING ROI
                </div>
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-cyan-300 text-glow-cyan mt-1">
                  {estimatedRoiPercent}%
                </div>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>

            {/* Calculated Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 rounded bg-machine-950 border border-machine-800">
                <div className="text-[10px] text-machine-500 uppercase">HOURS RECOVERED / YEAR</div>
                <div className="text-lg font-bold text-machine-100 mt-0.5">
                  {totalHoursRecoveredYear.toLocaleString()} <span className="text-xs text-machine-500 font-normal">hrs</span>
                </div>
              </div>

              <div className="p-3 rounded bg-machine-950 border border-machine-800">
                <div className="text-[10px] text-machine-500 uppercase">MONTHLY VALUE</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">
                  {formatCurrency(monthlyLaborValue)}
                </div>
              </div>

              <div className="p-3 rounded bg-machine-950 border border-machine-800">
                <div className="text-[10px] text-machine-500 uppercase">ANNUAL VALUE</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">
                  {formatCurrency(annualLaborValue)}
                </div>
              </div>

              <div className="p-3 rounded bg-machine-950 border border-machine-800">
                <div className="text-[10px] text-machine-500 uppercase">POTENTIAL SAAS SAVING</div>
                <div className="text-lg font-bold text-sky-400 mt-0.5">
                  {formatCurrency(annualSoftwareSavings)}
                </div>
              </div>

            </div>

            {/* Summary Tagline */}
            <div className="p-3 rounded bg-machine-900 border border-machine-800 text-[11px] text-machine-300 leading-relaxed font-sans">
              Deploying <strong>TYPHER</strong> locally replaces variable per-token API meter rates with fixed on-prem compute, while recovering an estimated <strong>{totalHoursRecoveredYear.toLocaleString()} hours</strong> of engineering & workflow effort annually.
            </div>

          </div>

          {/* Mandatory Disclaimer */}
          <div className="text-[10px] text-machine-500 text-center font-mono pt-1">
            ESTIMATE ONLY — ACTUAL RESULTS VARY BY WORKFLOW, ORGANIZATION AND CONFIGURATION.
          </div>

        </div>

      </div>
    </div>
  );
};
