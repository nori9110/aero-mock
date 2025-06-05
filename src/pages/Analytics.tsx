import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  DatePicker,
  Typography,
  Space,
  Select,
} from "antd";
import {
  MailOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface CampaignStats {
  id: number;
  name: string;
  sentCount: number;
  openCount: number;
  clickCount: number;
  openRate: number;
  clickRate: number;
  date: string;
}

const Analytics: React.FC = () => {
  // サンプルデータ：日別の送信状況
  const dailyStats = [
    { date: "2024-03-10", sent: 150, opened: 120, clicked: 45 },
    { date: "2024-03-11", sent: 200, opened: 180, clicked: 75 },
    { date: "2024-03-12", sent: 180, opened: 150, clicked: 60 },
    { date: "2024-03-13", sent: 220, opened: 190, clicked: 85 },
    { date: "2024-03-14", sent: 250, opened: 220, clicked: 100 },
    { date: "2024-03-15", sent: 300, opened: 270, clicked: 120 },
  ];

  // サンプルデータ：キャンペーン別の統計
  const campaignStats: CampaignStats[] = [
    {
      id: 1,
      name: "新規サービス案内キャンペーン",
      sentCount: 150,
      openCount: 120,
      clickCount: 45,
      openRate: 80.0,
      clickRate: 30.0,
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "システムメンテナンスのお知らせ",
      sentCount: 200,
      openCount: 180,
      clickCount: 75,
      openRate: 90.0,
      clickRate: 37.5,
      date: "2024-03-14",
    },
    {
      id: 3,
      name: "春の特別キャンペーン",
      sentCount: 180,
      openCount: 150,
      clickCount: 60,
      openRate: 83.3,
      clickRate: 33.3,
      date: "2024-03-13",
    },
  ];

  const columns: ColumnsType<CampaignStats> = [
    {
      title: "キャンペーン名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "送信数",
      dataIndex: "sentCount",
      key: "sentCount",
      sorter: (a, b) => a.sentCount - b.sentCount,
    },
    {
      title: "開封数",
      dataIndex: "openCount",
      key: "openCount",
      sorter: (a, b) => a.openCount - b.openCount,
    },
    {
      title: "クリック数",
      dataIndex: "clickCount",
      key: "clickCount",
      sorter: (a, b) => a.clickCount - b.clickCount,
    },
    {
      title: "開封率",
      dataIndex: "openRate",
      key: "openRate",
      render: (rate) => `${rate}%`,
      sorter: (a, b) => a.openRate - b.openRate,
    },
    {
      title: "クリック率",
      dataIndex: "clickRate",
      key: "clickRate",
      render: (rate) => `${rate}%`,
      sorter: (a, b) => a.clickRate - b.clickRate,
    },
    {
      title: "送信日",
      dataIndex: "date",
      key: "date",
    },
  ];

  // 合計値の計算
  const totalStats = {
    sent: campaignStats.reduce((sum, stat) => sum + stat.sentCount, 0),
    opened: campaignStats.reduce((sum, stat) => sum + stat.openCount, 0),
    clicked: campaignStats.reduce((sum, stat) => sum + stat.clickCount, 0),
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>分析レポート</Title>

      <Space style={{ marginBottom: 16 }}>
        <RangePicker />
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          options={[
            { value: "all", label: "全てのキャンペーン" },
            { value: "last7days", label: "過去7日間" },
            { value: "last30days", label: "過去30日間" },
          ]}
        />
      </Space>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="総送信数"
              value={totalStats.sent}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="総開封数"
              value={totalStats.opened}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="総クリック数"
              value={totalStats.clicked}
              prefix={<LinkOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均開封率"
              value={((totalStats.opened / totalStats.sent) * 100).toFixed(1)}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="日別の送信状況">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#1890ff"
                  name="送信数"
                />
                <Line
                  type="monotone"
                  dataKey="opened"
                  stroke="#52c41a"
                  name="開封数"
                />
                <Line
                  type="monotone"
                  dataKey="clicked"
                  stroke="#722ed1"
                  name="クリック数"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="キャンペーン別の統計">
            <Table
              columns={columns}
              dataSource={campaignStats}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics; 