import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CompanyList from './pages/CompanyList';
import CompanyDetail from './pages/CompanyDetail';
import TemplateList from './pages/TemplateList';
import TemplateEdit from './pages/TemplateEdit';
import CampaignList from './pages/CampaignList';
import CampaignCreate from './pages/CampaignCreate';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Sidebar />
          <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />
              <Route path="/templates" element={<TemplateList />} />
              <Route path="/templates/:id" element={<TemplateEdit />} />
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/campaigns/create" element={<CampaignCreate />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App; 