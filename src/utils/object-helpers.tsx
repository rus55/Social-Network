import {UserType} from "../../src/redux/users-reducer";

type UserIdType = {
    id: string
}

type updateObjectInArrayTypeProps = {
    items: UserType[]
    itemId: number
    objectPropName: string
    newObjProps: {followed: boolean}
}

export const updateObjectInArray = ({items, itemId, objectPropName, newObjProps}: updateObjectInArrayTypeProps) => {
    return items.map(u => {
        if (u[objectPropName as keyof UserIdType ] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}