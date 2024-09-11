import React from 'react';
import { useAppSelector } from '../../types/hooks.ts';
import './Header.scss';

const Header: React.FC = () => {

    const dataFromServer = useAppSelector(state => state.dataFromServer);

    return (
        <>
            <div className='header'>
                <h3>User managment table</h3>
                <div className="header_count">
                    <p>All Users:</p>
                    {dataFromServer.length}
                </div>
            </div>
            <hr />
        </>
    )
}

export default Header;