import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Card,
  Typography,
  message,
  Modal,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Template {
  id: number;
  name: string;
  subject: string;
  updatedAt: string;
  createdBy: string;
}

const TemplateList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // サンプルデータ
  const templates: Template[] = [
    {
      id: 1,
      name: "新規サービス案内",
      subject: "【新サービス】ご案内",
      updatedAt: "2024-03-15",
      createdBy: "管理者",
    },
    {
      id: 2,
      name: "メンテナンス通知",
      subject: "【重要】システムメンテナンスのお知らせ",
      updatedAt: "2024-03-14",
      createdBy: "管理者",
    },
  ];

  const columns: ColumnsType<Template> = [
    {
      title: "テンプレート名",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "件名",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "最終更新日",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "作成者",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            編集
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            削除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Template) => {
    // 編集処理の実装
    console.log("編集:", record);
  };

  const handleDelete = (record: Template) => {
    setSelectedTemplate(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (selectedTemplate) {
      // 削除処理の実装
      console.log("削除:", selectedTemplate);
      message.success("テンプレートを削除しました");
    }
    setIsModalVisible(false);
    setSelectedTemplate(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedTemplate(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>テンプレート管理</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="テンプレート名で検索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => console.log("新規テンプレート作成")}
          >
            新規テンプレート作成
          </Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={templates}
        rowKey="id"
        pagination={{
          total: templates.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `全 ${total} 件`,
        }}
      />

      <Modal
        title="テンプレートの削除確認"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>
          テンプレート「{selectedTemplate?.name}」を削除してもよろしいですか？
        </p>
        <p>この操作は取り消せません。</p>
      </Modal>
    </div>
  );
};

export default TemplateList; 