const defaultSubjectState = [];
const SubjectReducer = (state = defaultSubjectState, action) => {
  switch (action.type) {
    case 'ADD_SUBJECT':
      return action.subjects;
    default:
      return state;
  }
};
export default SubjectReducer;
