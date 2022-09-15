
import { isLeft } from 'fp-ts/lib/Either';
import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiContext } from '../../../api';

export const PlansIndex = () => {
    const api = useContext(ApiContext);
    let { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // added check for pathname because component is rendered twice and don't know why
        pathname === '/plans' && api.plans.getAll().send().then(plans => {
            if (isLeft(plans)) {
                return;
            }
            if (plans.right.length > 0) {
            } else {
                navigate("/plans/new");
            }
        });
    }, []);
    return <div><img alt="Plans" /></div>
};