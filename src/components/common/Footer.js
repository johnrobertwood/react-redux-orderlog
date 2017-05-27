import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../actions/orderActions';
import FilterLink from '../../containers/FilterLink';

const Footer = () => (
  <div className="footer">
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </div>
);

export default Footer;
