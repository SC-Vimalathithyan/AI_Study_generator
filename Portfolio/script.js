var tablinks =document.getElementsByClassName("tab-links");
var tabcontents =document.getElementsByClassName("tab-contents"); 
var sidemenu =document.getElementById("sidemenu");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    Event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
function openmenu(){
    sidemenu.style.right="0";
}
function closemenu(){
    sidemenu.style.right="-200px";
}
const scriptURL = 'https://script.google.com/macros/s/AKfycbzniiNaGsJCMz62OvOVn4AuIFa6fHs0W7pQcd-df9YBEFwAglou14J7W0gYzetDlSHj/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML="Messsage  Sent Successfully"
            setTimeout(function(){
                msg.innerHTML=""
            },3000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
  })