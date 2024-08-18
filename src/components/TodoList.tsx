import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Input, Space, Tag, Tooltip, message, Checkbox, Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../redux/actions/todoActions';
import { AppState } from '../redux/store';
import TodoModal from './TodoModal';
import AuditLogsModal from './AuditLogsModal';
import { Todo } from '../models/todo';
import './TodoList.css';
import { Status } from '../models/status';
import { Priority } from '../models/priority';

const { confirm } = Modal;

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: AppState) => state.todos);
  const [modalVisible, setModalVisible] = useState(false);
  const [logsVisible, setLogsVisible] = useState(false);
  const [editTodo, setEditTodo] = useState<Partial<Todo> | null>(null);
  const [currentLogs, setCurrentLogs] = useState<Todo['auditLogs']>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      dispatch(fetchTodos({ title: searchTerm }) as any);
    } else {
      dispatch(fetchTodos({}) as any);
    }
  }, [dispatch, searchTerm]);

  const handleCreateTodo = () => {
    setEditTodo(null);
    setModalVisible(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
    setModalVisible(true);
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this todo?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await dispatch(deleteTodo(id) as any);
          message.success('Todo deleted successfully');
        } catch (err) {
          message.error('Failed to delete todo');
        }
      },
    });
  };

  const handleSubmit = async (todo: Partial<Todo>) => {
    try {
      if (editTodo) {
        await dispatch(updateTodo(editTodo.id!, todo) as any);
        message.success('Todo updated successfully');
      } else {
        await dispatch(createTodo(todo) as any);
        message.success('Todo created successfully');
      }
      setModalVisible(false);
    } catch (err) {
      message.error('Failed to save todo');
    }
  };

  const handleCheckChange = async (todo: Todo) => {
    try {
      const updatedTodo = {
        ...todo,
        check: !todo.check,
        status: !todo.check ? Status.DONE : Status.TODO,
      };
      await dispatch(updateTodo(todo.id, updatedTodo) as any);
      message.success('Todo status updated');
    } catch (err) {
      message.error('Failed to update todo status');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleShowLogs = (logs: Todo['auditLogs']) => {
    setCurrentLogs(logs);
    setLogsVisible(true);
  };

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (text: string, record: Todo, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Todo) => (
        <span style={{ textDecoration: record.check ? 'line-through' : 'none' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: Todo) => (
        <span style={{ textDecoration: record.check ? 'line-through' : 'none' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Status) => (
        <Tag color={status === Status.DONE ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Priority) => {
        let color;
        switch (priority) {
          case Priority.HIGH:
            color = 'red';
            break;
          case Priority.MEDIUM:
            color = 'orange';
            break;
          case Priority.LOW:
            color = 'green';
            break;
          default:
            color = 'blue';
        }
        return (
          <Tag color={color}>
            {priority}
          </Tag>
        );
      },
    },
    {
      title: 'Check',
      dataIndex: 'check',
      key: 'check',
      render: (check: boolean, record: Todo) => (
        <Checkbox
          type="checkbox"
          checked={check}
          onChange={() => handleCheckChange(record)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Todo) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEditTodo(record)} type="link" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record.id)}
              type="link"
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'audit',
      key: 'audit',
      render: (text: boolean, record: Todo) => (
        <Tooltip title="Audit Logs">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleShowLogs(record.auditLogs)}
            type="link"
          />
        </Tooltip>
      ),
    },
  ];

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="todo-list-container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Search Todos"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ marginBottom: '20px' }}
          value={searchTerm}
        />
        <Button onClick={handleCreateTodo} type="primary" style={{ marginBottom: '20px' }}>
          Add Todo
        </Button>

        <Table
          columns={columns}
          dataSource={todos}
          rowKey="id"
          pagination={false}
          bordered={false}
          className="todo-table"
          loading={loading}
        />
      </Space>

      <TodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={editTodo || {}}
        isUpdate={!!editTodo}
      />

      <AuditLogsModal
        visible={logsVisible}
        onClose={() => setLogsVisible(false)}
        logs={currentLogs}
      />
    </div>
  );
};

export default TodoList;
