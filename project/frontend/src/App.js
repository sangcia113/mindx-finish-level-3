import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ConfigProvider, Layout } from 'antd';

import {
    DepartmentPage,
    DishPage,
    DishTypePage,
    HomePage,
    IngredientPage,
    IngredientTypePage,
    MenuPage,
    NotFoundPage,
    RolePage,
    StaffPage,
    StockInPage,
    StockOutPage,
    SupplierPage,
    UnitPage,
    WeeklyMenuPage,
} from './pages/index';

import { FooterComponent, HeaderComponent, SiderComponent } from './components';

const App = () => {
    console.log('App run.....');

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgLayout: '#f5f7fa',
                        fontSize: 18,
                        // fontFamily: 'Helvetica,sans-serif',
                        // fontFamily: 'SF Mono',
                        fontFamily: 'Public Sans',
                        // fontFamily:
                        //     'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace !important',
                        // colorText: 'rgba(0, 0, 0, 1)',
                        controlHeight: 36,
                    },
                    components: {
                        Layout: {
                            headerBg: '#f5f7fa',
                            headerHeight: 50,
                            // siderBg: '#f5f7fa',
                            footerBg: '#f5f5f5',
                        },
                        Button: {
                            defaultBorderColor: '#fff',
                        },
                    },
                }}
            >
                <Routes>
                    <Route path="/" element={<WeeklyMenuPage />} />
                    <Route
                        path="*"
                        element={
                            <Layout
                                style={{
                                    minHeight: '96vh',
                                    margin: '10px 0 0 10px',
                                }}
                            >
                                <SiderComponent defaultSelectedKeys={''} />
                                <Layout>
                                    <HeaderComponent />
                                    <Routes>
                                        <Route path="*" element={<NotFoundPage />} />
                                        <Route path="/home" element={<HomePage />} />
                                        <Route path="/menu" element={<MenuPage />} />
                                        <Route path="/dish-list" element={<DishPage />} />
                                        <Route path="/dish-type" element={<DishTypePage />} />
                                        <Route
                                            path="/ingredient-list"
                                            element={<IngredientPage />}
                                        />
                                        <Route
                                            path="/ingredient-type"
                                            element={<IngredientTypePage />}
                                        />
                                        <Route path="/stock-in" element={<StockInPage />} />
                                        <Route path="/stock-out" element={<StockOutPage />} />
                                        <Route path="/supplier" element={<SupplierPage />} />
                                        <Route path="/others-unit" element={<UnitPage />} />
                                        <Route path="/others-staff" element={<StaffPage />} />
                                        <Route
                                            path="/others-department"
                                            element={<DepartmentPage />}
                                        />
                                        <Route path="/others-role" element={<RolePage />} />
                                    </Routes>
                                    <FooterComponent />
                                </Layout>
                            </Layout>
                        }
                    />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
