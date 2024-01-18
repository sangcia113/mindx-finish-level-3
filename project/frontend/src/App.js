import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { DepartmentPage, HomePage, LoginPage, NotExistedPage, UserPage } from './pages/index';
import { FooterComponent, HeaderComponent } from './components';

const App = () => {
    console.log('App run.....');

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: '#fff',
                        controlHeight: 40,
                        fontSize: 20,
                        fontFamily: "'Roboto', sans-serif",
                    },
                }}
            >
                <Routes>
                    <Route path="*" element={<NotExistedPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            // <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                <HomePage />
                                <FooterComponent />
                            </Layout>
                            // </PrivatePage>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            // <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                <UserPage />
                                <FooterComponent />
                            </Layout>
                            // </PrivatePage>
                        }
                    />
                    <Route
                        path="/department"
                        element={
                            // <PrivatePage roles={[1, 2, 3, 4, 5, 6]}>
                            <Layout style={{ minHeight: '100vh' }}>
                                <HeaderComponent />
                                <DepartmentPage />
                                <FooterComponent />
                            </Layout>
                            // </PrivatePage>
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
