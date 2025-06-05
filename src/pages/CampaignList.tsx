import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Typography,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Campaign {
  id: number;
  name: string;
  template: string;
  status: "draft" | "scheduled" | "sending" | "completed" | "failed";
  targetCount: number;
  sentCount: number;
  openCount: number;
  clickCount: number;
  scheduledDate: string;
  createdAt: string;
}

const CampaignList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // サンプルデータ
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "新規サービス案内キャンペーン",
      template: "新規顧客向け案内",
      status: "completed",
      targetCount: 150,
      sentCount: 150,
      openCount: 120,
      clickCount: 45,
      scheduledDate: "2024-03-15 10:00:00",
      createdAt: "2024-03-14 15:30:00",
    },
    {
      id: 2,
      name: "システムメンテナンスのお知らせ",
      template: "既存顧客向けお知らせ",
      status: "scheduled",
      targetCount: 200,
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      scheduledDate: "2024-03-20 09:00:00",
      createdAt: "2024-03-15 11:20:00",
    },
    {
      id: 3,
      name: "春の特別キャンペーン",
      template: "新規顧客向け案内",
      status: "draft",
      targetCount: 0,
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      scheduledDate: "",
      createdAt: "2024-03-16 14:15:00",
    },
  ];

  const getStatusTag = (status: Campaign["status"]) => {
    const statusConfig = {
      draft: { color: "default", text: "下書き" },
      scheduled: { color: "processing", text: "送信予定" },
      sending: { color: "warning", text: "送信中" },
      completed: { color: "success", text: "完了" },
      failed: { color: "error", text: "失敗" },
    };
    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: ColumnsType<Campaign> = [
    {
      title: "キャンペーン名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "テンプレート",
      dataIndex: "template",
      key: "template",
    },
    {
      title: "ステータス",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "送信先数",
      dataIndex: "targetCount",
      key: "targetCount",
    },
    {
      title: "送信済み",
      dataIndex: "sentCount",
      key: "sentCount",
    },
    {
      title: "開封数",
      dataIndex: "openCount",
      key: "openCount",
    },
    {
      title: "クリック数",
      dataIndex: "clickCount",
      key: "clickCount",
    },
    {
      title: "送信予定日時",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
    },
    {
      title: "作成日時",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(`/campaigns/${record.id}`)}
          />
          <Button
            type="text"
            icon={<SendOutlined />}
            disabled={record.status !== "draft"}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            disabled={record.status === "sending"}
          />
        </Space>
      ),
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>キャンペーン一覧</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/campaigns/create")}
          >
            新規作成
          </Button>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16 }} size="large">
          <Input
            placeholder="キャンペーン名で検索"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="ステータス"
            style={{ width: 120 }}
            allowClear
            options={[
              { value: "draft", label: "下書き" },
              { value: "scheduled", label: "送信予定" },
              { value: "sending", label: "送信中" },
              { value: "completed", label: "完了" },
              { value: "failed", label: "失敗" },
            ]}
          />
          <RangePicker showTime />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredCampaigns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default CampaignList; 