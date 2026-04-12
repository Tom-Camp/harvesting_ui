import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Plant } from '../lib/types';

export function HarvestTrend({ plant }: { plant: Plant }) {
  if (plant.harvests.length < 2) {
    return <div className="flex h-40 items-center justify-center text-sm text-text-faint">Chart appears after 2+ harvests</div>;
  }

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={plant.harvests}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} width={30} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke={plant.color} fill={plant.color} fillOpacity={0.16} strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
