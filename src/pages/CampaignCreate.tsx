import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Space,
  Typography,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Company {
  id: number;
  name: string;
}

interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
}

const CampaignCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // サンプルデータ
  const companies: Company[] = [
    { id: 1, name: "東京建設株式会社" },
    { id: 2, name: "大阪工業株式会社" },
  ];

  const templates: Template[] = [
    {
      id: 1,
      name: "新規サービス案内",
      subject: "【新サービス】ご案内",
      body: "いつもご利用ありがとうございます。\n\n新サービスのご案内をさせていただきます。",
    },
    {
      id: 2,
      name: "メンテナンス通知",
      subject: "【重要】システムメンテナンスのお知らせ",
      body: "平素よりご利用ありがとうございます。\n\nシステムメンテナンスを実施させていただきます。",
    },
  ];

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleTemplateChange = (templateId: number) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      form.setFieldsValue({
        subject: template.subject,
        body: template.body,
      });
    }
  };

  const handleSubmit = (values: any) => {
    console.log("送信データ:", values);
    message.success("キャンペーンを作成しました");
    navigate("/campaigns");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>キャンペーン作成</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800 }}
      >
        <Card title="送信先企業" style={{ marginBottom: 16 }}>
          <Form.Item
            name="companies"
            label="送信先企業"
            rules={[{ required: true, message: "送信先企業を選択してください" }]}
          >
            <Select
              mode="multiple"
              placeholder="送信先企業を選択"
              style={{ width: "100%" }}
            >
              {companies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>

        <Card title="メール内容" style={{ marginBottom: 16 }}>
          <Form.Item
            name="template"
            label="テンプレート"
            rules={[{ required: true, message: "テンプレートを選択してください" }]}
          >
            <Select
              placeholder="テンプレートを選択"
              onChange={handleTemplateChange}
              style={{ width: "100%" }}
            >
              {templates.map((template) => (
                <Option key={template.id} value={template.id}>
                  {template.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subject"
            label="件名"
            rules={[{ required: true, message: "件名を入力してください" }]}
          >
            <Input placeholder="件名を入力" />
          </Form.Item>

          <Form.Item
            name="body"
            label="本文"
            rules={[{ required: true, message: "本文を入力してください" }]}
          >
            <TextArea
              rows={10}
              placeholder="本文を入力"
              style={{ fontFamily: "monospace" }}
            />
          </Form.Item>
        </Card>

        <Card title="送信設定" style={{ marginBottom: 16 }}>
          <Form.Item
            name="sendType"
            label="送信タイプ"
            initialValue="immediate"
          >
            <Select>
              <Option value="immediate">即時送信</Option>
              <Option value="scheduled">予約送信</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.sendType !== currentValues.sendType
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("sendType") === "scheduled" ? (
                <Space>
                  <Form.Item
                    name="scheduledDate"
                    rules={[
                      {
                        required: true,
                        message: "送信日を選択してください",
                      },
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      placeholder="送信日を選択"
                    />
                  </Form.Item>
                  <Form.Item
                    name="scheduledTime"
                    rules={[
                      {
                        required: true,
                        message: "送信時刻を選択してください",
                      },
                    ]}
                  >
                    <TimePicker format="HH:mm" placeholder="送信時刻を選択" />
                  </Form.Item>
                </Space>
              ) : null
            }
          </Form.Item>
        </Card>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              キャンペーンを作成
            </Button>
            <Button onClick={() => navigate("/campaigns")}>キャンセル</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CampaignCreate; 