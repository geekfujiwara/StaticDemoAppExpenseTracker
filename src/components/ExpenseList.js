import React, { useMemo, useState, useRef } from 'react';
import { DetailsList, Selection, SelectionMode, Dropdown, PrimaryButton, DefaultButton, mergeStyleSets, Text } from '@fluentui/react';

const classes = mergeStyleSets({
  container: { display: 'grid', gap: 12 },
  toolbar: { display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' },
  rightActions: { display: 'flex', gap: 8 },
  statusPill: {
    padding: '6px 10px',
    borderRadius: 16,
    color: 'white',
    display: 'inline-block',
    fontSize: 12,
  },
});

const statusOptions = [
  { key: 'all', text: 'すべて' },
  { key: '申請済', text: '申請済' },
  { key: '承認済', text: '承認済' },
  { key: '却下', text: '却下' },
];

export default function ExpenseList({ items, onUpdateStatus, onRequestApprove }) {
  const [status, setStatus] = useState('all');
  const [selectedCount, setSelectedCount] = useState(0);
  const selectionRef = useRef(null);

  if (!selectionRef.current) {
    selectionRef.current = new Selection({
      onSelectionChanged: () => {
        setSelectedCount(selectionRef.current.getSelectedCount());
      },
    });
  }

  const filtered = useMemo(() => {
    return items.filter(it => (status === 'all' || it.status === status));
  }, [items, status]);

  const columns = [
    { key: 'col1', name: '取引内容', fieldName: 'title', minWidth: 150 },
    { key: 'col2', name: '店名', fieldName: 'vendor', minWidth: 120 },
    { key: 'col3', name: '取引日時', fieldName: 'date', minWidth: 140, onRender: item => new Date(item.date).toLocaleString() },
    { key: 'col4', name: '合計金額', fieldName: 'amount', minWidth: 100, onRender: item => `¥${item.amount}` },
    { key: 'col5', name: 'メモ', fieldName: 'memo', minWidth: 200 },
    { key: 'col6', name: 'ステータス', fieldName: 'status', minWidth: 120, onRender: item => {
      const bg = item.status === '承認済' ? '#107C10' : item.status === '却下' ? '#A80000' : '#605E5C';
      return <div className={classes.statusPill} style={{ background: bg }}>{item.status}</div>;
    }},
    { key: 'col7', name: '', fieldName: 'actions', minWidth: 120, onRender: item => (
      <PrimaryButton text="承認" onClick={() => onRequestApprove(item)} />
    )},
  ];

  function setSelectedStatus(newStatus) {
    const selected = selectionRef.current.getSelection();
    const ids = selected.map(s => s.id);
    if (ids.length === 0) return;
    onUpdateStatus(newStatus, ids);
    // clear selection after action
    selectionRef.current.setAllSelected(false);
    setSelectedCount(0);
  }

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <Dropdown label="ステータスで絞る" selectedKey={status} options={statusOptions} onChange={(_, o) => setStatus(o.key)} />
        <div className={classes.rightActions}>
          <PrimaryButton text="承認にする" onClick={() => setSelectedStatus('承認済')} disabled={selectedCount === 0} />
          <DefaultButton text="却下にする" onClick={() => setSelectedStatus('却下')} disabled={selectedCount === 0} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Text>該当する経費はありません。</Text>
      ) : (
        <DetailsList items={filtered} columns={columns} selection={selectionRef.current} selectionMode={SelectionMode.multiple} />
      )}
    </div>
  );
}
