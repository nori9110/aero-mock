import React from 'react';
import { Layout, Menu, Dropdown, Button, Space } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "プロフィール",
    },
    {
      key: "settings",
      label: "設定",
    },
    {
      key: "logout",
      label: "ログアウト",
    },
  ];

  return (
    <AntHeader style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold' }}>
        メール自動送信システム
      </div>
      <Space>
        <Button type="text" icon={<BellOutlined />} />
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Button type="text" icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header; 