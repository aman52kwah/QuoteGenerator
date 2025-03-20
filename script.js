const quoteContainer = document.getElementById("quote-container");
const quoteText= document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton= document.getElementById("new-quote");
const loader = document.getElementById("loader");

// declare quote api with empty array
let apiQuotes = [];

    
// show loading spinner
    function showLoadingSpinner(){
        loader.hidden= false;
        quoteContainer.hidden= true;
    }

    // hide loading spinner
    function removeLoadingSpinner(){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }

    // show New Quote
    function newQuote() {
        // function called within a funct
        showLoadingSpinner(); 
        // pick a random quote from apiQuote array
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

        // check if the author field is blank and replace it "unkown"
        if (!quote.author) {
            authorText.textContent="Unknown";
        } else{
            authorText.textContent=quote.author;
        }

        //check the quote length to determine styling
        if (quote.text.length > 120) {
            quoteText.classList.add("long-quote");
        } else{
            quoteText.classList.remove("long-quote");
        }

        // set quote, hide loader
        quoteText.textContent = quote.text;
        removeLoadingSpinner();
    }
        
        //get quote from api using async and try catch error
        async function getQuotes() {
            showLoadingSpinner();
            const apiUrl ="https://jacintodesign.github.io/quotes-api/data/quotes.json";
           // try catch error
            try {
                const response =await fetch(apiUrl);
                apiQuotes= await response.json();
                newQuote();
            } catch (error) {
                //  catch error here
            }
            
        } 

        // tweet quote
        function tweetQuote(){
            const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
            window.open(twitterUrl,"_blank");
        }

        // add event listeners
        newQuoteButton.addEventListener("click",newQuote) ;
        twitterButton.addEventListener("click",tweetQuote) ;

   
    // on load
    getQuotes();