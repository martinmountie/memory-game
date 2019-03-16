(function() {
    let data = [
        {id: 1, url: "https://hdqwalls.com/download/resident-evil-the-final-chapter-2016-movie-qu-1024x1024.jpg"},
        {id: 2, url: "http://2.bp.blogspot.com/-vwFdmqzcJOo/UDj4kJs3iSI/AAAAAAAAOuI/b2cStfrcPM0/s1600/Resident_Evil_Retribution_ipad_Wallpaper.jpg"},
        {id: 3, url: "https://i.pinimg.com/originals/50/81/ad/5081add37a1eeda485fbed6594d156ad.jpg"},
        {id: 4, url: "https://mfiles.alphacoders.com/632/632598.jpg"},
        {id: 5, url: "https://stmed.net/sites/default/files/styles/1024x1024/public/resident-evil%3A-the-final-chapter-wallpapers-29844-2786622.jpg?itok=xfd86b7E"},
        {id: 6, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRamnZlBY0-NfQucueVQ8LC9zI-fQHBMWLJ078BRgdEcgCnViBk"},
        {id: 7, url: "https://avatarfiles.alphacoders.com/784/78481.png"},
        {id: 8, url: "https://wallpapershome.com/images/wallpapers/resident-evil-the-final-chapter-1024x1024-milla-jovovich-guns-best-11775.jpg"}
    ];
    //DOM and globals
    let counter = 0;
    // let listOfClickedElements = [];​
    let listOfClickedElements = [];
    let scenes = document.querySelectorAll(".scene");
    let cardsContent = document.querySelectorAll(".scene .back");
    
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

    //Initilize
    let gameBoard = [];

    data.forEach(el => {
        gameBoard.push(el);
        gameBoard.push(el);
    });
    gameBoard = shuffle(gameBoard);
    cardsContent.forEach((el, index) => {
        el.style.backgroundImage = "url(" + gameBoard[index].url + ")";
    });


    //functions
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