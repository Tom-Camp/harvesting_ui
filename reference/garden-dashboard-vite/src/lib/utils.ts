import type { Plant } from './types';

const now = new Date('2026-07-18');

export const daysSince = (dateStr: string) =>
  Math.round((now.getTime() - new Date(dateStr).getTime()) / 86400000);

export const plantedFormatted = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const growthPercent = (plant: Plant) =>
  Math.min(100, Math.round((daysSince(plant.plantedDate) / plant.daysToMaturity) * 100));

export const avgPerSession = (plant: Plant) => {
  if (!plant.harvests.length) return '—';
  const total = plant.harvests.reduce((sum, h) => sum + h.value, 0);
  return `${(total / plant.harvests.length).toFixed(plant.harvestUnit === 'count' ? 0 : 1)} ${plant.harvestUnit}`;
};
