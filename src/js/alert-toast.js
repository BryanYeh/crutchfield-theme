let clearToast = ()=>{
    let alert_title = document.querySelector('.alert-title');
    let alert_text = document.querySelector('.alert-text');
    let alert_toast = document.querySelector('.alert-toast');

    alert_title.classList.remove('text-red-600');
    alert_title.classList.remove('text-green-600');
    alert_title.innerHTML = '';
    
    alert_text.innerHTML = '';
    alert_text.classList.remove('text-red-500');
    alert_text.classList.remove('text-green-500');
    
    alert_toast.classList.remove('border-red-600');
    alert_toast.classList.remove('border-green-600');
}

/**
 * Clears the notification toast then hides it
 */
let hideToast = ()=>{
    clearToast();

    let alert_toast = document.querySelector('.alert-toast');
    alert_toast.classList.add('hidden');
}

/**
 * Shows the notification toast given params
 * @param {string} notification_type Either success or error
 * @param {string} title The title to show
 * @param {string} description Short description
 */
let showToast = (notification_type,title,description)=>{
    clearToast();

    let alert_title = document.querySelector('.alert-title');
    let alert_text = document.querySelector('.alert-text');
    let alert_toast = document.querySelector('.alert-toast');

    alert_title.innerHTML = title;
    alert_text.innerHTML = description;

    if(notification_type == 'error') {
        alert_title.classList.add('text-red-600');
        alert_text.classList.add('text-red-500');
        alert_toast.classList.add('border-red-600');
    }
    else{
        alert_title.classList.add('text-green-600');
        alert_text.classList.add('text-green-500');
        alert_toast.classList.add('border-green-600');
    }

    alert_toast.classList.remove('hidden');
}

export {hideToast, showToast}