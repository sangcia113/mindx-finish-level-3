import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
    DepartmentPage,
    HomePage,
    LoginPage,
    NotExistedPage,
    PrivatePage,
    RolePage,
    SupplierPage,
    UnitPage,
    UserPage,
} from './pages/index';

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
                            <PrivatePage
                                roles={['65a93be12c65719fb6cf87b9', '65a93c463faf844ac5d41b30']}
                            >
                                <HomePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/supplier"
                        element={
                            <PrivatePage
                                roles={['65a93be12c65719fb6cf87b9', '65a93c463faf844ac5d41b30']}
                            >
                                <SupplierPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/others-unit"
                        element={
                            <PrivatePage
                                roles={['65a93be12c65719fb6cf87b9', '65a93c463faf844ac5d41b30']}
                            >
                                <UnitPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/others-user"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <UserPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/others-department"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <DepartmentPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/others-role"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <RolePage />{' '}
                            </PrivatePage>
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
