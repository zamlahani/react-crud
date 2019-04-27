import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  icon,
  prefix,
  className,
  size = 'fa-1x'
}) => {
  let iconPrefix = prefix || 'fa';
  return (
    <span>
      <i className={`${iconPrefix} fa-${icon} ${className || ''} ${size}`}/>
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string
};

export default Icon;
