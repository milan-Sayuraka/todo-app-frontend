import React from 'react';
import { Layout } from 'antd';
import TodoList from '../components/TodoList';
import Logo from '../assets/img/todo.svg';
import './LandingPage.css';

const { Header, Content } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={Logo} alt="Logo" width={60}/>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <h1>Todo List</h1>
          <TodoList />
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
