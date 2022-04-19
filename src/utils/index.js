export const initialData = () => {
	const data = [];
	for (let i = 1; i <= 100; i++) {
		data.push({
			key: i,
			name: `Hao Nguyen ${i}`,
			age: 22,
			address: `Binh Thanh, No Trang Long, no. ${i}`,
		});
	}
	return data;
};
