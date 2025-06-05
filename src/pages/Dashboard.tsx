import React from 'react';
import { Row, Col, Card, Statistic, Table, Alert } from 'antd';
import {
  MailOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // モックデータ
  const recentCampaigns = [
    {
      key: '1',
      name: '6月度営業キャンペーン',
      sentAt: '2025-06-01 10:00',
      recipients: 45,
      openRate: '52.2%',
      status: '完了',
    },
    {
      key: '2',
      name: '新規顧客フォローアップ',
      sentAt: '2025-06-02 14:30',
      recipients: 30,
      openRate: '48.5%',
      status: '完了',
    },
  ];

  const columns = [
    {
      title: 'キャンペーン名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '送信日時',
      dataIndex: 'sentAt',
      key: 'sentAt',
    },
    {
      title: '配信数',
      dataIndex: 'recipients',
      key: 'recipients',
    },
    {
      title: '開封率',
      dataIndex: 'openRate',
      key: 'openRate',
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <h1>ダッシュボード</h1>
      
      <Alert
        message="システム情報"
        description="本日の配信枠: 残り27通"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="本日の配信数"
              value={23}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="月間配信数"
              value={523}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均開封率"
              value={47.4}
              suffix="%"
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="返信数"
              value={12}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="最近のキャンペーン" style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={recentCampaigns}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 