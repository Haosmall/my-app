import { Button, Col, Input, Row, Table } from "antd";
import React, { useRef, useState } from "react";
import "./App.css";
import { initialData } from "./utils";

function App() {
	const { Column } = Table;

	let dataCache = initialData();

	const [data, setData] = useState(dataCache);

	const fileInput = useRef();

	const handleImportData = (event) => {
		console.log(event.target.files[0]);

		let reader = new FileReader();

		reader.readAsText(event.target.files[0]);

		const data = JSON.parse(reader.result);
		dataCache = data;

		setData(data);
	};

	const handleClearData = () => {
		setData([]);
	};

	const handleSearchByName = (event) => {
		const value = event.target.value;
		console.log(value);

		const newDatas = dataCache.filter((element) =>
			element.name.includes(value)
		);

		setData(newDatas);
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
					// Set vertical scrolling, specify the height of the scroll area to be 300
					scroll={{ y: 400 }}
					// Set row key, record is each element in your data. So you can replace record.key with other attributes in record
					rowKey={(record) => record.key}
				>
					<Column title="Name" dataIndex="name" width={200} />
					<Column title="Age" dataIndex="age" width={150} />
					<Column title="Address" dataIndex="address" />
				</Table>
			</div>
		</div>
	);
}

export default App;
