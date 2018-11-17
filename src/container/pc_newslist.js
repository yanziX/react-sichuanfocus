import { connect } from 'react-redux'
import NewsList from '../component/View/NewsList'

const mapStateToProps = state => ({
    lists: state.lists
})

export default connect(mapStateToProps)(NewsList)