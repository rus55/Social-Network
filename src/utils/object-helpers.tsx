import {UserType} from "../../src/redux/users-reducer";

type updateObjectInArrayTypeProps = {
    items: Array<UserType>
    itemId: number
    objectPropName: string
    newObjProps: {followed: boolean}
}

export const updateObjectInArray = ({items, itemId, objectPropName, newObjProps}: updateObjectInArrayTypeProps) => {
    return items.map(u => {
        if (u[objectPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}