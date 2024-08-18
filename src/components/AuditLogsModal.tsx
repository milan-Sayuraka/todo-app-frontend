import React from 'react';
import { Modal, Timeline, Typography } from 'antd';
import { Todo } from '../models/todo';
import { format } from 'date-fns';

const { Text } = Typography;

interface AuditLogsModalProps {
  visible: boolean;
  onClose: () => void;
  logs: Todo['auditLogs'];
}

const AuditLogsModal: React.FC<AuditLogsModalProps> = ({ visible, onClose, logs }) => {

  const timelineItems = logs.map((log, index) => ({
    key: index,
    children: (
      <div>
        <Text type="secondary" style={{ marginRight: 8 }}>{log.action}:</Text>
        <Text strong>{format(new Date(log.timestamp), 'PPpp')}</Text>
      </div>
    ),
  }));

  return (
    <Modal
      title="Audit Logs"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      style={{ padding: '24px 32px' }}
    >
      <Timeline
        style={{ paddingLeft: '16px' }}
        items={timelineItems.length > 0 ? timelineItems : [{ children: <p>No audit logs available</p> }]}
      />
    </Modal>
  );
};

export default AuditLogsModal;
