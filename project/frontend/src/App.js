import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
    DepartmentPage,
    DishPage,
    DishTypePage,
    HomePage,
    IngredientPage,
    IngredientTypePage,
    LoginPage,
    MenuPage,
    NotExistedPage,
    PrivatePage,
    StockInPage,
    StockOutPage,
    SupplierPage,
    UnitPage,
    UserPage,
    WeeklyMenuPage,
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
                        fontFamily: 'Roboto, sans-serif',
                    },
                }}
            >
                <Routes>
                    <Route path="*" element={<NotExistedPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/weekly-menu"
                        element={
                            <PrivatePage
                                roles={[
                                    '65a93be12c65719fb6cf87b9',
                                    '65a93c3b3faf844ac5d41b2d',
                                    '65a93c463faf844ac5d41b30',
                                    '65a93c513faf844ac5d41b33',
                                    '65a93c5a3faf844ac5d41b36',
                                    '65a93c623faf844ac5d41b39',
                                ]}
                            >
                                <WeeklyMenuPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <HomePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/menu"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <MenuPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/dish-list"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <DishPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/dish-type"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <DishTypePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/ingredient-list"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <IngredientPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/ingredient-type"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <IngredientTypePage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/stock-in"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <StockInPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/stock-out"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <StockOutPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/supplier"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
                                <SupplierPage />
                            </PrivatePage>
                        }
                    />
                    <Route
                        path="/others-unit"
                        element={
                            <PrivatePage roles={['65a93be12c65719fb6cf87b9']}>
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
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
