import { Button, Col, Input, Row, Table, Tag } from "antd";
import React, { useRef, useState } from "react";
import "./App.css";

function App() {
	const { Column } = Table;

	const dataCache = useRef([]);

	const [data, setData] = useState(dataCache.current);

	const fileInput = useRef();

	const handleImportData = (event) => {
		console.log(event.target.files[0]);
		const reader = new FileReader();

		reader.readAsText(event.target.files[0]);

		reader.onload = (event) => {
			// The file's text will be printed here
			// console.log(event.target.result);
			const dataObj = JSON.parse(event.target.result);

			const newData = [];

			if (dataObj["ont-ports"]) {
				for (const [_, value] of Object.entries(dataObj["ont-ports"])) {
					newData.push(value);
				}
			}
			dataCache.current = newData;
			setData(newData);
		};
	};

	const handleClearData = () => {
		setData([]);
	};

	const handleSearchByName = (event) => {
		const value = event.target.value;

		const newData = dataCache.current.filter((element) =>
			element["ont-name"].includes(value)
		);

		setData(newData);
	};

	const renderValue = (value) => {
		return value ? <span>{value}</span> : <Tag color="error">Empty</Tag>;
	};

	return (
		<div className="App">
			<div className="container">
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col className="gutter-row" span={19}>
						<Input
							placeholder="Search by name...."
							onChange={handleSearchByName}
						/>
					</Col>

					<Col className="gutter-row" span={2}>
						<input
							type="file"
							accept=".json"
							style={{ display: "none" }}
							ref={fileInput}
							onChange={handleImportData}
						/>
						<Button
							type="primary"
							ghost
							onClick={() => fileInput.current.click()}
						>
							Import
						</Button>
					</Col>

					<Col className="gutter-row" span={3}>
						<Button danger onClick={handleClearData}>
							Clear
						</Button>
					</Col>
				</Row>

				<Table
					className="table"
					dataSource={data}
					// Config pagination,
					pagination={{
						defaultPageSize: 10,
						showSizeChanger: true,
						pageSizeOptions: ["10", "20", "30"],
					}}
					// Set scrolling
					scroll={{ x: "fit-content", y: 400 }}
					// Set row key, record is each element in your data. So you can replace record.key with other attributes in record
					rowKey={(record) => record.ontId}
				>
					<Column
						title="cardType"
						dataIndex="cardType"
						render={(text) => {
							return renderValue(text);
						}}
					/>
					<Column
						title="deviceName"
						dataIndex="deviceName"
						width={150}
						render={(text) => renderValue(text)}
					/>
					<Column
						title="expected-serial-number"
						dataIndex="expected-serial-number"
						render={(text) => renderValue(text)}
					/>
					<Column
						title="ont-name"
						dataIndex="ont-name"
						render={(text) => renderValue(text)}
					/>
					<Column
						title="ont-speed"
						dataIndex="ont-speed"
						render={(text) => renderValue(text)}
					/>
					<Column
						title="ont-type"
						dataIndex="ont-type"
						render={(text) => renderValue(text)}
					/>
					<Column
						title="onu-service-profile"
						dataIndex="onu-service-profile"
						render={(text) => renderValue(text)}
					/>
					<Column
						title="ponId"
						dataIndex="ponId"
						render={(text) => renderValue(text)}
					/>
				</Table>
			</div>
		</div>
	);
}

export default App;
