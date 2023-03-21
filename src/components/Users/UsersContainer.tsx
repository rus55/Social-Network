import React, {ComponentType} from 'react'
import Users from './Users';
import {connect} from 'react-redux'
import {
    UserType,
    follow,
    setCurrentPage,
    unfollow,
    toggleFollowingProgress,
    getUsers
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';
import {AnyAction, compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<any>
}
type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    setUsers: (users: Array<UserType>) =>void
    setTotalUsersCount: (totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchPropsType
class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return <>
            { this.props.isFetching ?
               <Preloader /> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}
// для передачи юзеров в пропсы для презентационной компоненты
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
// для передачи презентационной компоненте колбеки, которые будет вызывать презентационная компонента
// предназначение коллбеков общаться со стором
/*let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            // диспатчим результат работы action creator (action - объект, который содержит как минимум тип)
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },
    }
}*/
// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleFollowingProgress,
        getUsers
    })
)(UsersContainer)