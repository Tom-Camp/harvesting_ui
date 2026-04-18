import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Plant } from '../lib/types';

const plantTypeColors: Record<string, string> = {
  herb: "#3a7a45",
  vegetable: "#4a9e4a",
  fruit: "#e05d2b",
  flower: "#d83b8c",
  shrub: "#6c9e50",
  tree: "#2d6036",
  vine: "#c08a00",
};

export function HarvestTrend({ plant }: { plant: Plant }) {
  const harvests = plant.harvests ?? [];
  if (harvests.length < 2) {
    return <div className="flex h-40 items-center justify-center text-sm text-text-faint">Chart appears after 2+ harvests</div>;
  }

  const color = plantTypeColors[plant.plant_type] ?? "#3a7a45";
  const data = [...harvests]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((h) => ({
      date: new Date(h.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: h.amount,
    }));

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} width={30} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.16} strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
