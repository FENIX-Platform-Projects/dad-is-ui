import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {toggleTodo} from '../actions/index.jsx'
import TodoList from '../components/TodoList.jsx'
import {getVisibleTodos} from '../reducers/index.jsx'

//use .params because of wrapped by withRouter
const mapStateToProps = (state, {params}) => {
    return {
        todos: getVisibleTodos(state, params.filter || 'all'),
    }
};

/*const mapDispatchToProps = (dispatch) => ({
 onTodoClick(id) {
 dispatch(toggleTodo(id))
 }
 });*/

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    /* mapDispatchToProps */ {onTodoClick: toggleTodo}
)(TodoList));

export default VisibleTodoList