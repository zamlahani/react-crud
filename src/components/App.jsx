import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { doFetch } from '../redux/actions/thunks';
import { createTodo } from '../redux/actions/action-creators';

import ReduxState from './examples/ReduxState';
import TodoTable from './examples/TodoTable';
import FormModal from './examples/FormModal';

import Icon from './common/Icon';
import NavBar from './common/bulma/Navbar';
import Flex from './common/glamorous/Flex';

const URL = {
  BOILERPLATE: '/'
};

const ColumnBody = ({ title, subtitle, icon, body }) => (
  <Fragment>
    <div>
      <h1 className="title">
        <Icon icon={icon} className="has-text-primary" />
        &nbsp;{title}
      </h1>
      <h2 className="subtitle ">
        <Icon icon="angle-right" />
        &nbsp;
        {subtitle}
      </h2>
    </div>
    {body}
  </Fragment>
);

const Body = ({ location, history }) => {
  const todos = useSelector(state => state.todos);
  const isFormModalOpen = useSelector(state => state.formModal.isOpen);
  const dispatch = useDispatch();
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div>{isFormModalOpen && <FormModal />}</div>
          <div className="columns">
            <div className="column">
              <ColumnBody
                icon="clock"
                title="Pending"
                subtitle={<span>Tugas yang belum selesai</span>}
                body={
                  <TodoTable data={todos.filter(val => val.status === 0)} />
                }
              />
            </div>
            <div className="column">
              <ColumnBody
                icon="clipboard-check"
                title="Done"
                subtitle={<span>Tugas yang sudah selesai</span>}
                body={
                  <TodoTable data={todos.filter(val => val.status === 1)} />
                }
              />
            </div>
          </div>

          {false && (
            <div className="columns">
              <div className="column">
                <ColumnBody
                  icon="tree"
                  title="State Tree"
                  subtitle={
                    <span>Open devtools to view dispatched actions</span>
                  }
                  body={<ReduxState />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const App = ({ location, history }) => {
  useEffect(() => {
    doFetch();
  }, []);
  return (
    <Flex column height="100%" width="100%">
      <div>
        <NavBar url={URL.BOILERPLATE} label="React CRUD" />
      </div>
      <Body location={location} history={history} />
    </Flex>
  );
};

ColumnBody.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired
};

App.propTypes = {
  location: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object)
};

Body.propTypes = {
  location: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object)
};

export default withRouter(App);
