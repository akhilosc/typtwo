import { createFileRoute } from '@tanstack/react-router';
import { HeroV9 } from '@/components/v9/HeroV9';
import { ClienteleV9 } from '@/components/v9/ClienteleV9';
import { DualEngineV9 } from '@/components/v9/DualEngineV9';
import { TechFeaturesV9 } from '@/components/v9/TechFeaturesV9';
import { StudiosFeaturesV9 } from '@/components/v9/StudiosFeaturesV9';
import { VoiceCloningV9 } from '@/components/v9/VoiceCloningV9';
import { MethodologyV9 } from '@/components/v9/MethodologyV9';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#040404] min-h-screen text-white">
      <HeroV9 />
      <ClienteleV9 />
      <DualEngineV9 />
      <TechFeaturesV9 />
      <StudiosFeaturesV9 />
      <VoiceCloningV9 />
      <MethodologyV9 />
    </div>
  );
}
