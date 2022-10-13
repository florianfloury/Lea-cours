import { connect } from 'react-redux'

import { Home } from './Home'

import { AppDispatch, AppState } from 'src/shared/store'

export type CasesState = {}

export type CasesDispatch = {}

const mapStateToProps = (state: AppState): CasesState => ({})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
