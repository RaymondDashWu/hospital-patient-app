function editMessage(e) {
    const inputs = document.querySelectorAll('input')
    var data = {}
    for(var i = 0;i < inputs.length; i++){
        data[inputs[i].name] = inputs[i].value
    }
    axios.put(`${e.href}`, data).then((res) => {
        window.location.href = '/messages'
    })
}

function editBlog(e) {
    const inputs = document.querySelectorAll('input')
    var data = {}
    for(var i = 0;i < inputs.length; i++){
        data[inputs[i].name] = inputs[i].value
    }
    axios.put(`${e.href}`, data).then((res) => {
        window.location.href = '/blogs'
    })
}