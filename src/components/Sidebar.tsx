import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  MailOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'ダッシュボード',
    },
    {
      key: '/companies',
      icon: <TeamOutlined />,
      label: '企業情報管理',
    },
    {
      key: '/templates',
      icon: <FileTextOutlined />,
      label: 'テンプレート管理',
    },
    {
      key: '/campaigns',
      icon: <MailOutlined />,
      label: 'キャンペーン管理',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '分析・レポート',
    },
  ];

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar; 