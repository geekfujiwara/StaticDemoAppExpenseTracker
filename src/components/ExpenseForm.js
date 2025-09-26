import React, { useState } from 'react';
import { TextField, PrimaryButton, mergeStyleSets } from '@fluentui/react';
import { parse, isValid, format } from 'date-fns';

const classes = mergeStyleSets({
  form: { display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' },
  full: { gridColumn: '1 / -1' },
});

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState(''); // 取引内容
  const [vendor, setVendor] = useState(''); // 店名
  const [amount, setAmount] = useState(''); // 合計金額
  const [dateText, setDateText] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [memo, setMemo] = useState('');

  function clear() {
    setTitle('');
    setVendor('');
    setAmount('');
    setDateText(format(new Date(), 'yyyy-MM-dd'));
    setMemo('');
  }

  function submit(e) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!title || !vendor || !amount || isNaN(parsed)) return;

    // parse dateText
    let usedDate = new Date();
    if (typeof dateText === 'string') {
      const p = parse(dateText, 'yyyy-MM-dd', new Date());
      if (isValid(p)) usedDate = p;
    }

    onAdd({
      id: Date.now().toString(),
      title,
      vendor,
      amount: parsed,
      date: usedDate,
      memo,
      status: '申請済',
    });
    clear();
  }

  return (
    <form className={classes.form} onSubmit={submit}>
      <TextField label="取引内容" value={title} onChange={(_, v) => setTitle(v || '')} />
      <TextField label="店名" value={vendor} onChange={(_, v) => setVendor(v || '')} />
      <TextField label="取引日時 (yyyy-MM-dd)" value={dateText} onChange={(_, v) => {
        const txt = v || '';
        setDateText(txt);
      }} />
      <TextField label="合計金額" value={amount} onChange={(_, v) => setAmount(v || '')} />
      <TextField className={classes.full} label="メモ" multiline value={memo} onChange={(_, v) => setMemo(v || '')} />
      <div className={classes.full}>
        <PrimaryButton text="申請追加" type="submit" />
      </div>
    </form>
  );
}
