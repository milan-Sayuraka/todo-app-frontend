import React from 'react';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface DeleteConfirmProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ id, onDelete }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this todo?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await onDelete(id);
          message.success('Todo deleted successfully');
        } catch (err) {
          message.error('Failed to delete todo');
        }
      },
    });
  };

  return (
    <span onClick={showDeleteConfirm}>
      Delete
    </span>
  );
};

export default DeleteConfirm;
