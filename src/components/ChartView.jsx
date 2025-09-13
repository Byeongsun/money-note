import { useMemo } from 'react';

export default function ChartView({ expenses }) {
  const monthlyTotals = useMemo(() => {
    const totals = {};
    expenses.forEach(({ amount, date }) => {
      const month = date.slice(0, 7);
      totals[month] = (totals[month] || 0) + amount;
    });
    return totals;
  }, [expenses]);

  const months = Object.keys(monthlyTotals).sort();

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-kakao-dark mb-4">📊 월별 지출</h2>
      <div className="space-y-2">
        {months.map(month => (
          <div key={month} className="flex justify-between border-b pb-2 text-gray-700">
            <span>{month}</span>
            <span className="font-semibold text-kakao-dark">₩{monthlyTotals[month].toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}