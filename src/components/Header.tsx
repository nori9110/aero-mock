import React from "react";
import { Layout, Button, Space } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader style={{ background: "#fff", padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Space>
          <Button type="text" icon={<BellOutlined />} />
          <Button type="text" icon={<UserOutlined />} />
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header; 