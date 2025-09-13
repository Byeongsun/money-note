export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-500">지출 내역이 없습니다.</p>;
  }

  return (
    <ul className="space-y-3">
      {expenses.map((item, idx) => (
        <li key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-semibold text-kakao-dark">{item.title}</div>
          <div className="text-gray-700 font-bold">₩{item.amount.toLocaleString()}</div>
          <div className="text-sm text-gray-400">{item.date}</div>
        </li>
      ))}
    </ul>
  );
}