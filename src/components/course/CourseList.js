import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CourseListRow from './CourseListRow';
import { toggleCourse } from '../../actions/courseActions';

const CourseList = ({courses, onChange}) => {
 return (
   <table className="table">
     <thead>
       <tr>
         <th>&nbsp;</th>
         <th>Title</th>
         <th>Author</th>
         <th>Category</th>
         <th>Length</th>
         <th>Complete</th>
       </tr>
     </thead>
     <tbody>
       {courses.map(course => 
        <CourseListRow key={course.id} course={course} onChange={() => onChange(course.id)}/>
       )}
     </tbody>
   </table>
  );
};

const getVisibleCourses = (courses, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return courses;
    case 'SHOW_COMPLETED':
      return courses.filter(t => t.complete);
    case 'SHOW_ACTIVE':
      return courses.filter(t => !t.complete);
    default:
      // throw new Error('Unknown filter: ' + filter)
      return courses;
  }
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  courses: getVisibleCourses(state.courses, state.visibilityFilter)
});

const mapDispatchToProps = {
  onChange: toggleCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);