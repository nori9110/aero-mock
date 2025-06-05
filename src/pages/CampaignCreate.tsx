import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  DatePicker,
  message,
  Card,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Tag,
} from "antd";
import {
  SearchOutlined,
  SendOutlined,
  MailOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Company {
  id: number;
  name: string;
  email: string;
  industry: string;
  region: string;
}

interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
}

const CampaignCreate: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  // モックデータ：企業一覧
  const companies: Company[] = [
    {
      id: 1,
      name: "東京建設株式会社",
      email: "info@tokyo-ken.co.jp",
      industry: "建設業",
      region: "東京都",
    },
    {
      id: 2,
      name: "大阪工業株式会社",
      email: "info@osaka-kogyo.co.jp",
      industry: "製造業",
      region: "大阪府",
    },
    {
      id: 3,
      name: "名古屋電機株式会社",
      email: "info@nagoya-denki.co.jp",
      industry: "電気業",
      region: "愛知県",
    },
  ];

  // モックデータ：テンプレート
  const templates: Template[] = [
    {
      id: 1,
      name: "新規顧客向け案内",
      subject: "【{会社名}】新規サービスご案内",
      body: "{会社名} 御中\n\n平素より大変お世話になっております。\n\nこの度、新サービスを開始いたしましたのでご案内申し上げます。\n\n詳細は下記URLよりご確認ください。\n{URL}\n\nご不明な点がございましたら、お気軽にお問い合わせください。\n\nよろしくお願い申し上げます。",
    },
    {
      id: 2,
      name: "既存顧客向けお知らせ",
      subject: "【{会社名}】システムメンテナンスのお知らせ",
      body: "{会社名} 御中\n\n平素より大変お世話になっております。\n\nシステムメンテナンスを実施させていただきます。\n\n日時：{メンテナンス日時}\n\nご不便をおかけし申し訳ございませんが、\n何卒ご理解いただけますようお願い申し上げます。",
    },
  ];

  const columns: ColumnsType<Company> = [
    {
      title: "企業名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "メールアドレス",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "業種",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "地域",
      dataIndex: "region",
      key: "region",
    },
  ];

  const handleTemplateChange = (templateId: number) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const handleSend = () => {
    if (selectedCompanies.length === 0) {
      message.error("送信先企業を選択してください");
      return;
    }
    if (!selectedTemplate) {
      message.error("テンプレートを選択してください");
      return;
    }
    if (!emailSubject) {
      message.error("件名を入力してください");
      return;
    }
    if (!emailBody) {
      message.error("本文を入力してください");
      return;
    }

    // 送信処理のモック
    message.success(`${selectedCompanies.length}社にメールを送信しました`);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>キャンペーン作成</Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card title="送信先企業の選択" extra={<TeamOutlined />}>
          <Input
            placeholder="企業名で検索"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Table
            dataSource={filteredCompanies}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              onChange: (selectedRowKeys) => setSelectedCompanies(selectedRowKeys as number[]),
            }}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
          <Text type="secondary">
            選択済み: {selectedCompanies.length}社
          </Text>
        </Card>

        <Card title="メール内容の設定" extra={<MailOutlined />}>
          <Form layout="vertical">
            <Form.Item label="テンプレート">
              <Select
                placeholder="テンプレートを選択"
                onChange={handleTemplateChange}
                style={{ width: "100%" }}
                options={templates.map((t) => ({
                  label: t.name,
                  value: t.id,
                }))}
              />
            </Form.Item>

            <Form.Item label="件名">
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="メールの件名を入力"
              />
            </Form.Item>

            <Form.Item label="本文">
              <TextArea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={10}
                placeholder="メールの本文を入力"
              />
            </Form.Item>

            <Form.Item label="プレースホルダー">
              <Space wrap>
                <Tag color="blue">{`{会社名}`}</Tag>
                <Tag color="blue">{`{URL}`}</Tag>
                <Tag color="blue">{`{メンテナンス日時}`}</Tag>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card title="送信設定" extra={<ClockCircleOutlined />}>
          <Form layout="vertical">
            <Form.Item label="送信日時">
              <DatePicker
                showTime
                onChange={(date) => setScheduledDate(date?.toISOString() || null)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Card>

        <Row justify="end">
          <Col>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              size="large"
            >
              送信
            </Button>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default CampaignCreate; 