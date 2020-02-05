import statuses from './dataStatus';

const SET_STATUS = "_SET_STATUS";
const ADD_RANGE = "_ADD_RANGE";

const ITEM_ADD = "_ITEM_ADD";
const ITEM_SET_STATUS = "_ITEM_SET_STATUS";

export const createActions = (entity) =>{
    return { 
        set_status: (status) => {
            return {
                type: entity+SET_STATUS,
                status
            }
        },
        add_range: (items) => {
            return {
                type: entity+ADD_RANGE,
                items: items.map(item => { return {...item, status: statuses.READY}})
            }
        },
        item_add: (item, status = statuses.READY) => {
            return {
                type: entity+ITEM_ADD,
                item: {...item, status}
            }
        },
        item_set_status: (ident, status) => {
            return {
                type: entity+ITEM_SET_STATUS,
                ident,
                status
            }
        }
    }
}

export const createReducer = (entity) => {
    return (state = [], action) => {
        switch (action.type){
            case entity+SET_STATUS:
                return {
                    ...state,
                    status: action.status
                }
            case entity+ADD_RANGE:
                return {
                    ...state,
                    status: statuses.READY,
                    items: action.items
                }
            case entity+ITEM_ADD:
                return {
                ...state,
                items: [...state.items, action.item]
            }
            case entity+ITEM_SET_STATUS:
                console.log(`item set status ${action.ident} ${action.status}`)
                return {
                    ...state,
                    items: state.items.map(item => {
                        if(item.ident === action.ident){
                            return {...item, status: action.status}
                        }
                        return {...item};
                    })
                }
            default:
                return state;
        }
    }
}