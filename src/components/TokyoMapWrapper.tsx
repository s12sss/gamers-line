"use client";

import { useState } from 'react';
import InteractiveTokyoMap, { TokyoZone } from '@/components/InteractiveTokyoMap';

export default function TokyoMapWrapper() {
  const [selectedZone, setSelectedZone] = useState<TokyoZone>(null);

  return (
    <InteractiveTokyoMap 
      selectedZone={selectedZone} 
      onZoneSelect={setSelectedZone} 
    />
  );
}
