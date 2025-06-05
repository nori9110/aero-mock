import React, { useState } from 'react';
import { Table, Card, Input, Select, Button, Space, Typography, message, Modal } from 'antd';
import { SearchOutlined, DownloadOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Company {
  id: number;
  name: string;
  address: string;
  industry: string;
  region: string;
  employeeCount: number;
  lastUpdated: string;
}

const CompanyList: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // サンプルデータ
  const companies: Company[] = [
    {
      id: 1,
      name: '東京建設株式会社',
      address: '東京都千代田区丸の内1-1-1',
      industry: '建設業',
      region: '関東',
      employeeCount: 150,
      lastUpdated: '2024-03-15',
    },
    {
      id: 2,
      name: '大阪工業株式会社',
      address: '大阪府大阪市中央区本町2-2-2',
      industry: '製造業',
      region: '関西',
      employeeCount: 200,
      lastUpdated: '2024-03-14',
    },
  ];

  const columns: ColumnsType<Company> = [
    {
      title: '企業名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '所在地',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '業種',
      dataIndex: 'industry',
      key: 'industry',
      filters: [
        { text: '建設業', value: '建設業' },
        { text: '製造業', value: '製造業' },
      ],
      onFilter: (value, record) => record.industry === value,
    },
    {
      title: '地域',
      dataIndex: 'region',
      key: 'region',
      filters: [
        { text: '関東', value: '関東' },
        { text: '関西', value: '関西' },
      ],
      onFilter: (value, record) => record.region === value,
    },
    {
      title: '従業員数',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      sorter: (a, b) => a.employeeCount - b.employeeCount,
    },
    {
      title: '最終更新日',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            編集
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record)}
          >
            削除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Company) => {
    // 編集処理の実装
    console.log('編集:', record);
  };

  const handleDelete = (record: Company) => {
    // 削除処理の実装
    console.log('削除:', record);
  };

  const handleExport = () => {
    // エクスポート処理の実装
    message.success('企業データをエクスポートしました');
  };

  const handleCollect = () => {
    setIsCollecting(true);
    // 実際の収集処理はここに実装
    setTimeout(() => {
      setIsCollecting(false);
      message.success('企業情報の収集が完了しました');
    }, 2000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    handleCollect();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>企業一覧</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="企業名で検索"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="地域を選択"
            allowClear
            style={{ width: 120 }}
            onChange={setSelectedRegion}
          >
            <Option value="関東">関東</Option>
            <Option value="関西">関西</Option>
            <Option value="中部">中部</Option>
            <Option value="九州">九州</Option>
          </Select>
          <Select
            placeholder="業種を選択"
            allowClear
            style={{ width: 120 }}
            onChange={setSelectedIndustry}
          >
            <Option value="建設業">建設業</Option>
            <Option value="製造業">製造業</Option>
            <Option value="IT">IT</Option>
            <Option value="サービス">サービス</Option>
          </Select>
          <Button
            type="primary"
            icon={<SyncOutlined spin={isCollecting} />}
            onClick={showModal}
            loading={isCollecting}
          >
            企業情報収集
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            エクスポート
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => console.log('新規企業追加')}
          >
            新規企業追加
          </Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={companies}
        rowKey="id"
        pagination={{
          total: companies.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `全 ${total} 件`,
        }}
      />

      <Modal
        title="企業情報収集の確認"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>以下の条件で企業情報の収集を開始します：</p>
        <ul>
          <li>検索キーワード: {searchKeyword || '指定なし'}</li>
          <li>地域: {selectedRegion || '指定なし'}</li>
          <li>業種: {selectedIndustry || '指定なし'}</li>
        </ul>
        <p>収集を開始してよろしいですか？</p>
      </Modal>
    </div>
  );
};

export default CompanyList; 