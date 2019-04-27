import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Flex from '../../common/glamorous/Flex';
import Icon from '../../common/Icon';

const RouteContent = ({
  path,
  label,
  counter,
  dispatch,
  action,
  icon
}) => {
  return (
    <Flex column={true} padding={10}>
      <Flex vAlignCenter={true}>
        <Icon icon="angle-right"/>
        &nbsp;Connected to the Redux store at the&nbsp;<code>{path || '/'}</code>&nbsp;route
      </Flex>
      <Flex vAlignCenter={true}>
        <Icon icon="angle-right"/>
        &nbsp;<code>counter</code>: <code>{counter}</code>
      </Flex>
      <br/>
      <div className="m-top--small">
        <button
          className="button"
          onClick={dispatch.bind(this, action())}>
          <Icon icon={icon}/>&nbsp;{label} counter
        </button>
      </div>
    </Flex>
  );
};

RouteContent.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  (state) => {
    return {
      ...{ counter: state.counter }
    };
  }
)(RouteContent);
