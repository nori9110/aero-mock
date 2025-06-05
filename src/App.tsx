import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CompanyList from './pages/CompanyList';
import CompanyDetail from './pages/CompanyDetail';
import TemplateList from './pages/TemplateList';
import TemplateEdit from './pages/TemplateEdit';
import CampaignList from './pages/CampaignList';
import CampaignCreate from './pages/CampaignCreate';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

const { Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <Layout style={{ minHeight: '100vh' }}>
              <Header />
              <Layout>
                <Sider width={200} theme="light">
                  <Sidebar />
                </Sider>
                <Layout style={{ padding: '24px' }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:id" element={<CompanyDetail />} />
                    <Route path="/templates" element={<TemplateList />} />
                    <Route path="/templates/:id" element={<TemplateEdit />} />
                    <Route path="/campaigns" element={<CampaignList />} />
                    <Route path="/campaigns/create" element={<CampaignCreate />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </Layout>
              </Layout>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App; 