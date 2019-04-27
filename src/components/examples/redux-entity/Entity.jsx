import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { resetEntity, deleteEntity } from 'redux-entity';

import Icon from '../../common/Icon';

class Entity extends Component {
  constructor (props) {
    super(props);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.resetEntity = this.resetEntity.bind(this);
  }

  componentDidMount () {
    if (this.props.runFetchEntityOnMount) {
      this.props.fetchEntity();
    }
  }

  deleteEntity () {
    const { name, deleteEntity } = this.props;
    deleteEntity(name);
  }

  resetEntity () {
    const { name, resetEntity } = this.props;
    resetEntity(name, Date.now());
  }

  renderContent (name, entity) {
    const { append } = this.props;
    const { isFetching, data, error } = entity;

    if (error) {
      return (
        <div className="m-bottom--small">
          <Icon icon="exclamation-triangle" className="has-text-danger"/>
          &nbsp;Failed to fetch&nbsp;<code>{name}</code>
          &nbsp;due to&nbsp;<code className="has-text-danger">{error.toString()}</code>
        </div>
      );
    }

    if (isFetching) {
      return (
        <div className="m-bottom--small">
          Fetching fresh data!
        </div>
      );
    }

    if (isEmpty(data)) {
      return (
        <span>Entity <code>{name}</code> is reset.</span>
      );
    }

    const action = append ? 'Appending to ' : 'Fetch for ';
    const message = append ? <span>&nbsp;took&nbsp;<code>{data.delay}s</code></span> : null;

    return (
      <div className="m-bottom--small">
        <Icon icon="check" className="has-text-success"/>&nbsp;
        {action}
        <code>{name}</code>
        {message}
        <span>
            @&nbsp;<code>{moment(data.lastUpdated).format('LTS')}</code>
        </span>
      </div>
    );
  }

  fetchButton (isFetching) {
    return (
      <p key="Fetch" className="control">
        <a className={`button is-info ${isFetching ? 'is-loading' : ''}`} onClick={this.props.fetchEntity}>
          <span className="icon">
            <Icon icon="download"/>
          </span>
          <span>Fetch</span>
        </a>
      </p>
    );
  }

  resetButton (isFetching) {
    const onClick = !isFetching ? this.resetEntity : () => {};
    return (
      <p key="Reset" className="control">
        <a className="button" disabled={isFetching} onClick={onClick}>
          <span className="icon">
            <Icon icon="history"/>
          </span>
          <span>Reset</span>
        </a>
      </p>
    );
  }

  deleteButton (isFetching) {
    const onClick = !isFetching ? this.deleteEntity : () => {};
    return (
      <p key="Delete" className="control">
        <a className="button is-danger" disabled={isFetching} onClick={onClick}>
          <span className="icon">
            <Icon icon="trash"/>
          </span>
          <span>Delete</span>
        </a>
      </p>
    );
  }

  render () {
    const { name, entity } = this.props;

    if (isEmpty(entity)) {
      return (
        <Fragment>
          <NoEntity name={name}/>
          {this.fetchButton()}
        </Fragment>
      );
    }

    const { isFetching } = entity;

    return (
      <div className="m-top--large m-bottom--large">
        {this.renderContent(name, entity)}
        <div className="field has-addons">
          {this.fetchButton(isFetching)}
          {this.resetButton(isFetching)}
          {this.deleteButton(isFetching)}
        </div>
      </div>
    );
  }
}

const NoEntity = ({ name }) => (
  <div className="m-top--large">
    <div className="m-bottom--small">
      <Icon icon="exclamation-triangle" className="has-text-danger"/>
      &nbsp;Entity&nbsp;<code>{name}</code>&nbsp;does not exist on&nbsp;<code>entities</code>
    </div>
  </div>
);

NoEntity.propTypes = {
  name: PropTypes.string.isRequired
};

Entity.propTypes = {
  name: PropTypes.string.isRequired,
  append: PropTypes.bool,
  entity: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }),
  runFetchEntityOnMount: PropTypes.bool,
  fetchEntity: PropTypes.func.isRequired,
  resetEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired
};

export default connect(null, {
  resetEntity,
  deleteEntity
})(Entity);
