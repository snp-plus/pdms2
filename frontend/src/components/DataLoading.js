import React from 'react';
import ReactLoading from 'react-loading';

const DataLoading = ({ type, color }) => (
	<ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

export default DataLoading;