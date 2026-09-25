import React from 'react';
import { HeroSection } from './HeroSection';
import { ProblemSection } from './ProblemSection';
import { SolutionSection } from './SolutionSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CategoriesSection } from './CategoriesSection';
import { CircularEconomySection } from './CircularEconomySection';
import { RoadmapSection } from './RoadmapSection';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CategoriesSection />
      <CircularEconomySection />
      <RoadmapSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};
