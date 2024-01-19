import React from 'react';

import { Table } from 'antd';

const TableComponent = ({
    bordered,
    columns,
    dataSource,
    expandable,
    onChange,
    pagination,
    summary,
}) => {
    return (
        <Table
            bordered={bordered}
            columns={columns}
            dataSource={dataSource}
            expandable={expandable}
            onChange={onChange}
            pagination={pagination}
            summary={summary}
            scroll={{ x: true }}
            showSorterTooltip={false}
        />
    );
};

export default TableComponent;
