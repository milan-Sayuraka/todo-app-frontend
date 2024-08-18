import React, { useEffect } from 'react';
import { Modal, Input, Select, Form, Button, Checkbox } from 'antd';
import { Todo } from '../models/todo';
import { Priority } from '../models/priority';
import { Status } from '../models/status';
import './TodoModal.css';

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (todo: Partial<Todo>) => void;
  initialValues?: Partial<Todo>;
  isUpdate?: boolean;
}

const TodoModal: React.FC<TodoModalProps> = ({ visible, onClose, onSubmit, initialValues = {}, isUpdate = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields(); // Reset form fields after submission
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.status === Status.DONE) {
      form.setFieldsValue({ check: true });
    } else if (changedValues.status && changedValues.status !== Status.DONE) {
      form.setFieldsValue({ check: false });
    } else if (changedValues.check) {
      form.setFieldsValue({ status: Status.DONE });
    }
  };

  return (
    <Modal
      title={isUpdate ? "Update Todo" : "Create Todo"}
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields(); // Reset form fields when the modal is closed without submission
        onClose();
      }}
      className="todo-modal"
      footer={[
        <Button key="back" onClick={() => {
          form.resetFields(); // Reset form fields when cancelling
          onClose();
        }} className="ant-btn-default">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} className="ant-btn-primary">
          {isUpdate ? "Update" : "Create"}
        </Button>
      ]}
    >
      <Form form={form} layout="vertical" className="todo-modal-form" onValuesChange={handleValuesChange}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input placeholder="Enter Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Enter Description" />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select the priority' }]}
        >
          <Select placeholder="Select Priority">
            <Select.Option value={Priority.HIGH}>High Priority</Select.Option>
            <Select.Option value={Priority.MEDIUM}>Medium Priority</Select.Option>
            <Select.Option value={Priority.LOW}>Low Priority</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
        >
          <Select placeholder="Select Status">
            <Select.Option value={Status.TODO}>Todo</Select.Option>
            <Select.Option value={Status.IN_PROGRESS}>In Progress</Select.Option>
            <Select.Option value={Status.DONE}>Done</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="check"
          valuePropName="checked"
        >
          <Checkbox disabled={!isUpdate}>Completed</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;
