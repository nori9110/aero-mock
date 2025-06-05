import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
  Input,
  Tag,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Template {
  id: number;
  name: string;
  subject: string;
  category: string;
  lastModified: string;
  createdBy: string;
  usageCount: number;
}

const TemplateList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // サンプルデータ
  const templates: Template[] = [
    {
      id: 1,
      name: "新規顧客向け案内",
      subject: "【{会社名}】新規サービスご案内",
      category: "新規顧客",
      lastModified: "2024-03-15 10:30:00",
      createdBy: "山田太郎",
      usageCount: 15,
    },
    {
      id: 2,
      name: "既存顧客向けお知らせ",
      subject: "【{会社名}】システムメンテナンスのお知らせ",
      category: "既存顧客",
      lastModified: "2024-03-14 16:45:00",
      createdBy: "鈴木花子",
      usageCount: 8,
    },
    {
      id: 3,
      name: "セミナー案内",
      subject: "【{会社名}】新技術セミナーのご案内",
      category: "イベント",
      lastModified: "2024-03-13 09:15:00",
      createdBy: "佐藤次郎",
      usageCount: 3,
    },
  ];

  const columns: ColumnsType<Template> = [
    {
      title: "テンプレート名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "件名",
      dataIndex: "subject",
      key: "subject",
      ellipsis: true,
    },
    {
      title: "カテゴリー",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={
          category === "新規顧客" ? "blue" :
          category === "既存顧客" ? "green" :
          "purple"
        }>
          {category}
        </Tag>
      ),
    },
    {
      title: "最終更新日時",
      dataIndex: "lastModified",
      key: "lastModified",
    },
    {
      title: "作成者",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "使用回数",
      dataIndex: "usageCount",
      key: "usageCount",
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(`/templates/${record.id}`)}
          />
          <Button
            type="text"
            icon={<CopyOutlined />}
            onClick={() => handleCopy(record)}
          />
          <Popconfirm
            title="テンプレートを削除しますか？"
            description="この操作は取り消せません。"
            onConfirm={() => handleDelete(record.id)}
            okText="削除"
            cancelText="キャンセル"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCopy = (template: Template) => {
    message.success(`${template.name}をコピーしました`);
  };

  const handleDelete = (id: number) => {
    message.success("テンプレートを削除しました");
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchText.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>テンプレート管理</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/templates/new")}
          >
            新規作成
          </Button>
        </Col>
      </Row>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="テンプレート名または件名で検索"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredTemplates}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default TemplateList; 