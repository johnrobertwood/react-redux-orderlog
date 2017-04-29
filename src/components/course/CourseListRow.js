import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListRow = ({course, onChange}) => {
  return (
    <tr style={{backgroundColor: course.complete ? 'grey' : 'white'}}>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><input type="checkbox" name="completeBox" value="complete" onChange={onChange} checked={course.complete}/></td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CourseListRow;