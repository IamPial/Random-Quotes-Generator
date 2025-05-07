/** 
 * Description : Create a wonderful Random Quotes Generator App with DOM Functionalities
 */


//Global Scope
let  toastContainer = null; 


//finding the all necessary elements
const newQuotesBtn = document.getElementById('new-quote-btn');
const randomText = document.getElementById('random-text');


newQuotesBtn.addEventListener('click', async function(){
    if(toastContainer !== null){
        toastContainer.remove();
        toastContainer = null;
    }
    const newText = await randomQuotes();
    randomText.innerText = newText;
    generateToastMessage('You have generate new quotes');
    
})



//build a function for random quotes
async function randomQuotes(){
    let response = await fetch('https://dummyjson.com/quotes')
    let data = await response.json();
    
    let randomIndex = Math.floor(Math.random() * data.quotes.length);

    const randomData = `${data.quotes[randomIndex].quote} - ${data.quotes[randomIndex].author}`;
    return randomData 
}

//generate Toast Message
function generateToastMessage(msg){
    toastContainer = document.createElement('div');
    toastContainer.innerText = msg;
    
    toastContainer.className = 'toast-message toast-message-slide-in'
    toastContainer.addEventListener('click', function(){
        toastContainer.classList.remove('toast-message-slide-in')
        toastContainer.classList.add('toast-message-slide-out')
        toastContainer.addEventListener('animationend', function(){
            toastContainer.remove();
            // toastContainer = null;
        })
    })

    // Automatically remove the toast message
    setTimeout(()=>{
        if(toastContainer){
            toastContainer.classList.remove('toast-message-slide-in')
            toastContainer.classList.add('toast-message-slide-out')
            if(toastContainer){
                toastContainer.addEventListener('animationend', function(){
                    toastContainer.remove();
                    toastContainer = null;
                })
            }
        }
    }, 2000)
    document.body.appendChild(toastContainer);
}
