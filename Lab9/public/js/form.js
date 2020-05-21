(function() {
  const palindromeMethod = {
      isPalindrome(phrase){
           if (!phrase || typeof(phrase) !== 'string') throw `Error: Phrase not Supplied.`;
           const palStr = phrase.toLowerCase().replace(/[\W]/g, '');
           const revStr = palStr.split('').reverse().join('');
           return palStr === revStr;
       }
   };

   const staticForm = document.getElementById("static-form");

   if (staticForm) {
       const phraseElement = document.getElementById("phrase");
       const errorContainer = document.getElementById("error-container");
       const errorTextElement = errorContainer.getElementsByClassName(
           "text-goes-here"
       )[0];

       const resultContainer = document.getElementById("result-container");
       const resultTextElement = document.getElementById("attempts")
      staticForm.addEventListener("submit", event => {
          event.preventDefault();

          try {
              // hide containers by default
              errorContainer.classList.add("hidden");
              resultContainer.classList.add("hidden");


              const phraseValue = phraseElement.value;
              var liElement = document.createElement("LI");
              var textnode =  document.createTextNode(phraseValue);
              liElement.appendChild(textnode);
              const result = palindromeMethod.isPalindrome(phraseValue)
              if (result) {
                  liElement.setAttribute("class", "is-palindrome")
              } else {
                  liElement.setAttribute("class", "not-palindrome")
              }
              resultTextElement.appendChild(liElement)
              resultContainer.classList.remove("hidden")

          } catch (e) {
              const message = typeof e === "string" ? e : e.message;
              errorTextElement.textContent = e;
              errorContainer.classList.remove("hidden");
          }
      });
  }
})();