import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'stores';
import Layout from './template';
import forms from '../config';

const Forms = props => {
  const dispatch = useDispatch();
  const [hideLayout, setHideLayout] = useState(false);
  const { computedMatch, ...rest } = props;
  const { type } = computedMatch.params;
  const { Content, ...config } = forms.find(f => f.Link.split('/')[2] === type);

  const layoutFlag = useCallback(flag => {
    setHideLayout(flag);
  }, []);

  useEffect(() => {
    if (type === 'sunsys-coa-setup') {
      dispatch(actions.investor.fetchRebates({ size: 1000 }));
    }
  }, [type, dispatch]);

  return hideLayout ? (
    <Content layoutFlag={layoutFlag} {...rest} />
  ) : (
    <Layout {...config}>
      <Content layoutFlag={layoutFlag} {...rest} />
    </Layout>
  );
};

export default Forms;
