import React from 'react';
import { useHttp } from '../../hooks/http.hooks.js';
import config from '../config/config.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Spinner from '../spinner/Spinner.tsx';
import { filtered, dataFetched } from '../../redux/actions.ts';
import { User, Filters, RootState } from '../../types/types.ts';
import './Table.scss';

const Table: React.FC = () => {
    const {request} = useHttp();
    const _APIURL = config.apiUrl;

    const dispatch = useDispatch();

    const dataFromSelector = (state: RootState) => ({
        dataFromServer: state.dataFromServer,
        filters: state.filters,
        loading: state.isLoadingUsers
    });

    // destructuring data from redux state.
    // shallowEqual - to avoid re-rendering
    const {dataFromServer, filters, loading} = useSelector(dataFromSelector, shallowEqual);


    // Function to get data
    const getDataFromServer = async () => {
        try {
            const data: User[] = await request(_APIURL);
            dispatch(dataFetched(data));
        } catch (error) {
            // Handle error if necessary
            console.error('Failed to fetch data:', error);
        }
    }

    // Get data from server on initial render
    React.useEffect(() => {
        getDataFromServer();
    }, [])

    // Handle filter input change
    const handleFiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
        // destructuring from e.target
        const { name, value } = e.target;
        dispatch(filtered({[name]: value} as Partial<Filters>))
    };

    // filter data form server with users value
    const filteredData = dataFromServer.filter((item) => (
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        item.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        item.phone.toLocaleLowerCase().includes(filters.phone)
    ))

    if (loading) return <Spinner/>;

    return (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%', border: 'none' }}>
            <thead>
            <tr>
                <th>
                    NAME
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleFiltered}
                        placeholder="type name..."
                    />
                </th>
                <th>
                    USERNAME
                    <input
                        type="text"
                        name="username"
                        value={filters.username}
                        onChange={handleFiltered}
                        placeholder="type username..."
                    />
                </th>
                <th>
                    EMAIL
                    <input
                        type="text"
                        name="email"
                        value={filters.email}
                        onChange={handleFiltered}
                        placeholder="type email..."
                    />
                </th>
                <th>
                    PHONE
                    <input
                        type="text"
                        name="phone"
                        value={filters.phone}
                        onChange={handleFiltered}
                        placeholder="type phone..."
                    />
                </th>
            </tr>
            </thead>
            <tbody>
            {
            filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                            <td>{item.phone}</td>
                        </tr>
                    ))
                ) : 
                (
                    <tr>
                        <td colSpan={4} className="empty_table">
                            No users with this filter.
                        </td>
                </tr>
            )}
            </tbody>
            
      </table>
    )
}

export default Table;
