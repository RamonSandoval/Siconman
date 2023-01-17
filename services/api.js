import conection from './conection';


const api = {
    /*---------------------------------STRAPI REQUEST TO COLLECTION TYPES---------------------------------------*/
    devicesList: async (pagenum) => {
        return await conection.GET('/api/devices?pagination[pageSize]=100&populate=%2A&pagination[page]='+pagenum);
    },
    departmentsList: async () => {
        return await conection.GET('/api/departments?pagination[pageSize]=300&populate=%2A');
    },
    maintenanceList: async () => {
        return await conection.GET('/api/maintenances?pagination[pageSize]=300');
    },
    productionList: async () => {
        return await conection.GET('/api/productions?pagination[pageSize]=300&populate=%2A');
    },
    usersList: async () => {
        return await conection.GET('/api/users?pagination[pageSize]=300');
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------ADD REQUEST--------------------------------------------------*/
    addDevice: async (body) =>{
        return await conection.POST('/api/devices?populate=%2A', body);
    },
    addDepartment: async (body) =>{
        return await conection.POST('/api/departments', body);
    },
    addMaintenance: async (body) =>{
        return await conection.POST('/api/maintenances?populate=%2A', body);
    },
    addUser: async (body) => {
        return await conection.POST('/api/users',body);
    },
    addProduction: async (body) => {
        return await conection.POST('/api/productions',body);
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------DELETE REQUEST-----------------------------------------------*/
    deleteDevice: async (id) => {
        return await conection.DELETE('/api/devices/' + id);
    },
    deleteDepartment: async (id) => {
        return await conection.DELETE('/api/departments/' + id);
    },
    deleteMaintenance: async (id) => {
        return await conection.DELETE('/api/maintenances/' + id);
    },
    deleteUser: async (id) => {
        return await conection.DELETE('/api/users/' + id);
    },
    deleteProduction: async (id) => {
        return await conection.DELETE('/api/productions/' + id);
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------UPDATE REQUEST-----------------------------------------------*/
    updateDevice: async (id,body) => {
        return await conection.UPDATE('/api/devices/' + id,body);
    },
    updateDepartment: async (id,body) => {
        return await conection.UPDATE('/api/departments/' + id,body);
    },
    updateMaintenance: async (id,body) => {
        return await conection.UPDATE('/api/maintenances/' + id,body);
    },
    updateUser: async (id,body) => {
        return await conection.UPDATE('/api/users?pagination[pageSize]=300' + id,body);
    },
    updateProduction: async (id,body) => {
        return await conection.UPDATE('/api/productions/' + id,body);
    },
    /*----------------------------------------------------------------------------------------------------------*/

}

export default api;