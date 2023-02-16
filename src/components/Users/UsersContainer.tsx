import React from 'react'
import Users from './Users';
import {connect} from 'react-redux'
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow,
    UserType
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import axios from 'axios';
import Preloader from '../common/Preloader/Preloader';



type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
}

type MapDispatchPropsType = {
    toggleIsFetching: (isFetching: boolean) => void
    setUsers: (users: Array<UserType>) =>void
    setTotalUsersCount: (totalUsersCount: number) => void
    setCurrentPage: (currentPage: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount(): void {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                console.log(response.data)
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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
            />
        </>
    }
}

// для передачи юзеров в пропсы для презентационной компоненты
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        // usersPage: state.usersPage.users,
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching
})(UsersContainer)