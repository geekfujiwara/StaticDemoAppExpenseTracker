import React, { useState } from 'react';
import { initializeIcons, Stack, Text, Separator, PrimaryButton, Modal, mergeStyleSets, DefaultButton } from '@fluentui/react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

initializeIcons();

const styles = mergeStyleSets({
  modalMain: { background: 'white', padding: 20, width: 600 },
  modalFooter: { marginTop: 12, textAlign: 'right' },
  newButtonSmall: { height: 32, padding: '0 12px' },
  newButtonRow: { display: 'flex', justifyContent: 'flex-end' },
});

function App() {
  const sample = [
    { id: '1001', title: 'ランチ - 会議', vendor: '中華レストラン 銀座店', date: '2025-09-20', amount: '1,250', memo: 'チームミーティング', status: '申請済' },
    { id: '1002', title: 'タクシー - 帰社', vendor: '東京タクシー', date: '2025-09-19', amount: '820', memo: '深夜帰宅', status: '承認済' },
    { id: '1003', title: '電車 - 出張', vendor: 'JR東日本', date: '2025-09-18', amount: '1,480', memo: '出張往復', status: '却下' },
    { id: '1004', title: 'ホテル - 宿泊', vendor: 'ホテル東京', date: '2025-09-17', amount: '12,800', memo: '展示会参加', status: '申請済' },
    { id: '1005', title: '新幹線 - 出張', vendor: 'JR東海', date: '2025-09-16', amount: '13,500', memo: '会議出席', status: '申請済' },
    { id: '1006', title: 'ランチ - 客先', vendor: 'カフェ品川', date: '2025-09-15', amount: '980', memo: '商談', status: '承認済' },
    { id: '1007', title: '印刷代 - 資料', vendor: 'コンビニ印刷', date: '2025-09-14', amount: '450', memo: '資料準備', status: '申請済' },
    { id: '1008', title: '会議室利用料', vendor: '貸会議室A', date: '2025-09-13', amount: '3,000', memo: '外部イベント', status: '申請済' },
    { id: '1009', title: '交通費 - 市内移動', vendor: '都営バス', date: '2025-09-12', amount: '220', memo: '移動', status: '承認済' },
    { id: '1010', title: '接待 - ディナー', vendor: 'イタリアン 品川', date: '2025-09-11', amount: '9,700', memo: '接待費', status: '申請済' },
  ];

  const [items, setItems] = useState(sample);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [approveTarget, setApproveTarget] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  function addItem(x) {
    setItems(prev => [x, ...prev]);
    setCreatedId(x.id);
    setIsNewOpen(false);
    setIsIdModalOpen(true);
  }

  // Update only items whose ids are provided
  const updateStatus = (newStatus, ids = []) => {
    if (!ids || ids.length === 0) return;
    setItems(items.map((it) => (ids.includes(it.id) ? { ...it, status: newStatus } : it)));
  };

  function requestApprove(item) {
    setApproveTarget(item);
    setIsApproveModalOpen(true);
  }

  function confirmApprove(confirm) {
    if (confirm && approveTarget) {
      setItems(prev => prev.map(it => it.id === approveTarget.id ? { ...it, status: '承認済' } : it));
    }
    setApproveTarget(null);
    setIsApproveModalOpen(false);
  }

  return (
    <div style={{ padding: 24 }}>
      <Stack tokens={{ childrenGap: 12 }}>
  <Text variant="xLarge">経費申請アプリ</Text>
        <Separator />
        <div className={styles.newButtonRow}>
          <PrimaryButton className={styles.newButtonSmall} text="新規申請" onClick={() => setIsNewOpen(true)} />
        </div>

        <Modal isOpen={isNewOpen} onDismiss={() => setIsNewOpen(false)} isBlocking={false}>
          <div className={styles.modalMain}>
            <Text variant="large">新規経費申請</Text>
            <ExpenseForm onAdd={addItem} />
          </div>
        </Modal>

        <Modal isOpen={isIdModalOpen} onDismiss={() => setIsIdModalOpen(false)} isBlocking={false}>
          <div className={styles.modalMain}>
            <Text variant="large">申請完了</Text>
            <div style={{ marginTop: 12 }}>
              伝票ID: <strong>{createdId}</strong>
            </div>
            <div className={styles.modalFooter}>
              <PrimaryButton text="閉じる" onClick={() => setIsIdModalOpen(false)} />
            </div>
          </div>
        </Modal>

        <Separator />
        <ExpenseList items={items} onUpdateStatus={updateStatus} onRequestApprove={requestApprove} />

        <Modal isOpen={isApproveModalOpen} onDismiss={() => confirmApprove(false)} isBlocking={false}>
          <div className={styles.modalMain}>
            <Text variant="large">承認確認</Text>
            <div style={{ marginTop: 12 }}>
              伝票 <strong>{approveTarget?.id}</strong> を承認しますか？
            </div>
            <div className={styles.modalFooter}>
              <DefaultButton text="キャンセル" onClick={() => confirmApprove(false)} />
              <PrimaryButton text="承認する" onClick={() => confirmApprove(true)} style={{ marginLeft: 8 }} />
            </div>
          </div>
        </Modal>
      </Stack>
    </div>
  );
}

export default App;
