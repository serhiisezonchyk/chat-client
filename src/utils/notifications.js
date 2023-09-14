export const getAllUnreadNotifications = (notifications) =>{
    return notifications.filter((n)=>n.isRead === false);
}

export const getUserUnreadNotifications = (notifications, user) =>{
    return notifications.filter((n)=>(n.isRead === false) && (n.senderId ==user?.id));
}

export const readUserNotifications = async (notifications, user) =>{
    return notifications.map((notification)=>{
        if(notification?.senderId === user?.id && notification.isRead === false){
            return {...notification, isRead:true}
        }
        else return notification;
    });
}