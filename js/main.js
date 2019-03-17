(function() {
    let testMode = 0;

    //DOM and globals
    let counter = 0;
    // let listOfClickedElements = [];​
    let listOfClickedElements = [];
    let scenes = document.querySelectorAll(".scene");
    let cardsContent = document.querySelectorAll(".scene .back");
    let gameBoard = [];

    data = [
        { id: 1, url: "https://loremflickr.com/400/400?random=1" },
        { id: 2, url: "https://loremflickr.com/400/400?random=2" },
        { id: 3, url: "https://loremflickr.com/400/400?random=3" },
        { id: 4, url: "https://loremflickr.com/400/400?random=4" },
        { id: 5, url: "https://loremflickr.com/400/400?random=5" },
        { id: 6, url: "https://loremflickr.com/400/400?random=6" },
        { id: 7, url: "https://loremflickr.com/400/400?random=7" },
        { id: 8, url: "https://loremflickr.com/400/400?random=8" }
    ];
    if(testMode) {
        initGame(data);
    } else {
        fetch("https://api.unsplash.com/photos/random/?count=8&client_id=f16727b40ea8cfd006cb99dc10807560afb25554a379c01fe4e28e698ecff2b6")
          .then(function(response) {
              if(response.status !== 200) {
                  testMode = 1;
                  return data;
              } else
                return response.json();
           })  
          .then(function(data) {
              initGame(data);
          });
    }
    
    function initGame(data) {
        
        //Initilize
        data.forEach(el => {
            gameBoard.push(el);
            gameBoard.push(el);
        });
        gameBoard = shuffle(gameBoard);
        cardsContent.forEach((el, index) => {
            if (testMode) el.style.backgroundImage = "url(" + gameBoard[index].url + ")";
            else el.style.backgroundImage = "url(" + gameBoard[index].urls.small + ")";
        });
        startGame();
    }
    
    //events
    scenes.forEach(el => {
        el.addEventListener("click", function() {
            if (!this.classList.contains("clicked")) {
                counter++;
                if (counter > 2) {
                    counter = clearBoard(listOfClickedElements);
                    openCard(this);
                } else {
                    openCard(this);
                }
                if (counter === 2)
                    if(checkPair(listOfClickedElements)) {
                        counter = hideCards(listOfClickedElements);
                    }
            }
        });
    });


    //functions
    function startGame() {
        let game = document.getElementById("gameGrid");
        game.classList.add("started");
    }

    function checkPair(list) {
        return list[0].querySelector(".back").style.backgroundImage === list[1].querySelector(".back").style.backgroundImage;
    }

    function openCard(el) {
        el.classList.add("clicked");
        listOfClickedElements.push(el);
    }

    function clearBoard(list) {
        list.forEach(el => {
            el.classList.remove("clicked");
        });
        list.length = 0;
        return 1;
    }
    function hideCards(list) {
        list.forEach(el => {
            el.classList.add("hide");
            el.classList.remove("clicked");
        });
        list.length = 0;
        return 0;
    }

    //external functions
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    
})();