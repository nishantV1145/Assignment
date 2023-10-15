import axios from 'axios';

export const fetchAllData = () => async (dispatch) =>{
    try {
        dispatch({type : 'data_request'})
        const {data} = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
        dispatch({type : 'data_success', payload : data});
        } catch (error) {
        dispatch({type : 'request_fail'})
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) =>{
    try {
        dispatch({type : 'select_data'})
        let user = false;
        let mySet = new Set();
        let arr = [], selectedData = [];
        if(group === 'status'){
            allTickets.forEach((elem) => {
                mySet.add(elem.status);
            })
            arr = [...mySet];
            arr.forEach((elem, index) => {
                let arr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                })
                selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }else if(group === 'user'){
            user = true;
            allTickets?.allUser?.forEach((elem, index) => {
                arr = allTickets?.allTickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })
                    selectedData.push({
                    [index] : {
                        title : elem.name,
                        value : arr
                    }
                })
            })
        }else{
            let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];
                prior_list.forEach((elem, index) => {
                arr = allTickets.filter((fElem) => {
                    return index === fElem.priority;
                })
                    selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }
        if(orderValue === "title"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }
        if(orderValue === "priority"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority)
            })
        }
        dispatch({type : 'request_success', payload : {selectedData, user}});
    } catch (error) {
        dispatch({type : 'request_failure', payload : error.message})
    }
}
