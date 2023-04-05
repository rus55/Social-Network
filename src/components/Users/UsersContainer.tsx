import React, {ComponentType} from 'react'
import Users from './Users';
import {connect} from 'react-redux'
import {
    UserType,
    follow,
    setCurrentPage,
    unfollow,
    toggleFollowingProgress,
    requestUsers
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

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
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersContainer)