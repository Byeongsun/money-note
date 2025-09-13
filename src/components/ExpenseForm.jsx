import { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    onAdd({ title, amount: parseFloat(amount), date });
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 space-y-3">
      <input
        type="text"
        placeholder="지출 항목 (예: 커피 ☕)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border border-kakao-yellow rounded p-2 focus:outline-none focus:ring-2 focus:ring-kakao-yellow"
      />
      <input
        type="number"
        placeholder="금액"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full border border-kakao-yellow rounded p-2 focus:outline-none focus:ring-2 focus:ring-kakao-yellow"
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="w-full border border-kakao-yellow rounded p-2 focus:outline-none focus:ring-2 focus:ring-kakao-yellow"
      />
      <button
        type="submit"
        className="w-full bg-kakao-yellow text-kakao-dark font-bold py-2 rounded hover:bg-yellow-400 transition"
      >
        추가하기
      </button>
    </form>
  );
}