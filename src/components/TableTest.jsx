import { useEffect, useState } from "react";
import { Table, Button, Space, Pagination, Select } from "antd";
import qs from "qs";

const { Option } = Select;

const columnsConfig = [
  { title: "ID", dataIndex: "id", sorter: true, width: "10%" },
  { title: "Title", dataIndex: "title", sorter: true, width: "20%" },
  { title: "Description", dataIndex: "description", width: "30%" },
  { title: "Price", dataIndex: "price", sorter: true, width: "10%" },
  { title: "Brand", dataIndex: "brand", width: "10%" },
  { title: "Rating", dataIndex: "rating", sorter: true, width: "10%" },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    render: (thumbnail) => <img src={thumbnail} alt="Thumbnail" width={50} />,
  },
];

const getApiParams = (params) => ({
  limit: params.pagination?.pageSize,
  skip: (params.pagination?.current - 1) * params.pagination?.pageSize,
});

const TableTest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Initialize visible columns state
  const [visibleColumns, setVisibleColumns] = useState(
    columnsConfig.map((col) => col.dataIndex)
  );

  const fetchData = () => {
    setLoading(true);
    const params = getApiParams(tableParams);
    fetch(`https://dummyjson.com/products?${qs.stringify(params)}`)
      .then((res) => res.json())
      .then(({ products, total }) => {
        setData(products);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total,
          },
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });

    // Clear data if the page size changes
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize,
      },
    });
  };

  // Handle column visibility changes
  const handleColumnChange = (value) => {
    setVisibleColumns(value); // Update visible columns based on selected values
  };

  // Calculate the range of items being shown (start and end)
  const startIndex =
    (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + 1;
  const endIndex = Math.min(
    tableParams.pagination.current * tableParams.pagination.pageSize,
    tableParams.pagination.total
  );

  // Filter columns based on selected visible columns
  const filteredColumns = columnsConfig.filter((col) =>
    visibleColumns.includes(col.dataIndex)
  );

  return (
    <div>
      <h1 className="mb-6 font-bold">
        Thực hành xử lý bảng + dữ liệu ( dynamic table )
      </h1>

      <Space style={{ marginBottom: 16 }}>
        <Button
          onClick={() => {
            setTableParams({
              ...tableParams,
              pagination: { ...tableParams.pagination, current: 1 },
            });
          }}
        >
          Reset Filters
        </Button>
      </Space>

      <div className="flex justify-end items-center mb-12">
        {/* Column visibility select */}
        <Select
          mode="multiple"
          style={{ width: 300 }}
          placeholder="Select columns"
          onChange={handleColumnChange}
          value={visibleColumns}
        >
          {columnsConfig.map((col) => (
            <Option key={col.dataIndex} value={col.dataIndex}>
              {col.title}
            </Option>
          ))}
        </Select>

        {/* Showing the range of items */}
        <div className="mr-4">
          <span>
            Showing {startIndex} to {endIndex} of {tableParams.pagination.total}{" "}
            items
          </span>
        </div>

        {/* Pagination */}
        <Pagination
          current={tableParams.pagination.current}
          pageSize={tableParams.pagination.pageSize}
          total={tableParams.pagination.total}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>

      <Table
        columns={filteredColumns} // Use the filtered columns
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={false} // Disable pagination in Table because it's handled outside
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TableTest;
