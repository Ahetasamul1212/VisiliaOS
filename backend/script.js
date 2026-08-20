// Elements 
const apps = document.querySelector('#br-os-apps')
var menu = document.querySelector("#os-ct-menu")
const os_window = document.querySelector(".br-os-window")
const brand_window = document.querySelector(".brand")
const app_main = document.querySelector("#app-main")
const minimise = document.querySelector('#app-main')
const maximise = document.querySelector("#maximise")
const shorter = document.querySelector("#shorter")
const cross = document.querySelector("#cross")
const taskbar = document.querySelector("#taskbar")
const click = new Audio('sounds/click.wav')
const con = new Audio('sounds/confirm.mp3')
const okay = new Audio('sounds/positive.mp3')
const no = new Audio('sounds/negative.mp3')

// music

// vex setup
if (typeof vex !== 'undefined') {
    vex.defaultOptions.className = 'vex-theme-os'
}

// Operations
// Reset Window

close(os_window)

create_app('File manager', "images/filemanager.png", "file-manager")
create_app('Recycle bin', "images/recylebin.png", "recycle-bin")
create_app('Settings', "images/settings.png", "settings")
create_app('System Info', "images/system_info.png", "system-info")

//Functions

function create_app(name, image, id){
    let app = document.createElement('div')
    app.classList.add('app')
    app.id = id 
    app.setAttribute('onclick', "window_open('" + id + "')")
    app.oncontextmenu = e =>{
        click.play()
        open_menu(e, id)
    }

    let img = document.createElement('img')
    img.src = image
    img.setAttribute("alt", name)
    let p = document.createElement("p")
    p.innerText = name
    app.appendChild(img)
    app.appendChild(p)
    apps.appendChild(app)
}

function open (tag){
    tag.style.display = 'block'
}

function close (tag){
    tag.style.display = 'none'
}

function window_open(id){
    click.play()
    brand_window.innerHTML=''
    app_main.innerHTML =""
    init_window()

    let main = document.querySelector('#' + id)

    let img = document.createElement('img')
    img.src = main.childNodes[0].src
    img.setAttribute("alt", main.childNodes[0].alt)

    let p = document.createElement('p')
    p.innerText = main.childNodes[1].innerText
    brand_window.appendChild(img)
    brand_window.appendChild(p)
    // os_window.style.display = 'flex'

    app_main.src = `apps/${id}/${id}.html`

    open(os_window)
}

function init_window(){
    close(shorter)
    minimise.onclick=e=>{
        click.play()
        minimise_window();
    }
    maximise.onclick = e =>{
        click.play()
        maximise_window()
    }

    shorter.onclick = e =>{
        click.play()
        shorter_window()
    }

    cross.onclick = e =>{
        click.play()
        close(os_window)
    }
}

function minimise_window(){
    close(os_window)
    let task = document.createElement('div')
    task.classList.add('task')
    task.setAttribute("onclick","open_window()")
    let img = document.createElement("img")
    img.src = brand_window.childNodes[0].src
    img.appendChild(img)
    taskbar.appendChild(task)
}
function open_window(){
    open(os_window)
    let task = document.querySelectorAll(".task")
    task.remove()
}


function maximise_window(){
    open(shorter)
    close(maximise)
    window.restoreX = os_window.style.left
    window.restoreY = os_window.style.top
    os_window.style.top = 0
    os_window.style.left = 0
    os_window.style.width = '100%'
    os_window.style.height = "100vh"
}

function shorter_window(){
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = '60%'
    os_window.style.height = "60vh"
}

function open_menu(e, id){
    e.preventDefault()
    menu.classList.add("active")

    let items = menu.querySelectorAll("ul li")
    items[0].childNodes[0].onclick = () =>{
        window_open(id)
    }
    items[1].childNodes[0].onclick = () =>{
        admin_access(id)
    }
    items[2].childNodes[0].onclick = () =>{
        remove_app(id)
    }

    menu.style.top = e.pageY + 5 + "px"
    menu.style.left = e.pageX + 5 + "px"
    return false
}

function admin_access(id){
    con.play()
    vex.dialog.confirm({
        message: "Are you sure to give admin to this app?",
        callback: function(value){
            if(value){
                okay.play()
                window_open(id)
            }else{
                no.play()
                vex.dialog.alert({
                    message: "Request Declined"
                })
            }
        }
    })
}

function remove_app(id){
    con.play()
    vex.dialog.confirm({
        message: "Are you sure to remove this app?",
        callback: function(value){
            if(value){
                okay.play()
                document.querySelector("#" + id).remove()
            }else{
                no.play()
                vex.dialog.alert({
                    message: "App not removed"
                })
            }
        }
    })
}

window.onclick = e =>{
    if (menu.classList.contains("active")){
        menu.classList.remove("active")
    }
}

os_window.ondragend = e =>{
    let go_top = e.pageY
    let go_left = e.pageX
    if(go_top<0){
        go_top = 0
    }

    os_window.style.top = go_top + "px"
    os_window.style.left = go_left + "px"
}