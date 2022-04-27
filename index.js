(function(){

    let container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    let time = 60;
    
    function createForm(){
        let form = document.createElement('div');
        let title = document.createElement('h2');
        let input = document.createElement('input');
        let start = document.createElement('button');
        
        form.classList.add('form');
        title.classList.add('title');
        input.classList.add('form_input');
        input.id = 'input';
        start.classList.add('start');
    
        title.textContent = 'Выберите четное колличесвто карт от 2 до 10';
        input.placeholder = 'Введите число';
        start.textContent = 'Начать игру';
        
        
        
        container.append(form);
        form.append(title);
        form.append(input);
        form.append(start);   
            
      
        start.addEventListener('click', function(){
        
            document.querySelector('.form').style.display = 'none';
            createGame();
            
        });
    }

    createForm();
    
        
     
   function createGame () {
    let timer = document.createElement('h3');
    timer.classList.add('timer');
    container.append(timer); 

     setInterval(function(){
        --time;
        timer.textContent = time;

        if(time === 0){
        location.reload();
        }

    },1000);

    
    
        
   
    

    let cardsList = document.createElement('ul');
    cardsList.classList.add('memory-game');
    container.append(cardsList);

    let firstCardsArray = [];
    let secondCardsArray =[];
    let cardsListItem;
    let backFace, frontFace;

    let cards = document.getElementById('input').value;

    if(cards < 2 || cards> 10 || cards % 2 !== 0){
        cards = 4;
    }
    
    for(let i = 0; i < cards; i++){
        firstCardsArray.push(cards); 
        secondCardsArray.push(cards);
    }

    for(let i = 0; i < (firstCardsArray.length*cards && secondCardsArray.length*cards); i++){
        cardsListItem = document.createElement('li');
        cardsListItem.classList.add('memory-card');

        if(i % 2 === 0){
            cardsListItem.data =  i + 1
        }else{
            cardsListItem.data =  i;
        }
        
        cardsList.append(cardsListItem);
    
        backFace = document.createElement('div');
        backFace.classList.add('back-face');
        cardsListItem.append(backFace);

        frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.textContent = cardsListItem.data;
        cardsListItem.append(frontFace);
    }

    const AllCards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    //переворот карт
    function flipCard() {

        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
            
        checkForMatch();
        
    }
    
    //делаем счетчик
    let couple = (firstCardsArray.length*cards)/2;

    //проверка совпадения двух карт
    function checkForMatch() {
        if (firstCard.data  === secondCard.data) {
            disableCards();
            return;
        }
        unflipCards();
        }

    //при совпадении оставлять карты
    function disableCards() {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();

        couple --;
        
        if(couple === 0 ){
            document.querySelector('.btn').style.display = 'block';
        }

    }

    let btn = document.createElement('button');;
    btn.classList.add('btn');
    btn.textContent = 'Начать сначала';
    cardsList.append(btn);

    btn.addEventListener('click', function(){
        location.reload()
    });

    //обратный переворот карт
    function unflipCards() {

        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();

        }, 500);


    }

    //обновление карт после выбора
    function resetBoard() {

        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];

    }

    //Перемешивание карт
    (function shuffle() {

        AllCards.forEach(card => {
            let randomPosition = Math.floor(Math.random() * firstCardsArray.length*cards);
            card.style.order = randomPosition;
        });

    })();


    AllCards.forEach(card => card.addEventListener('click', flipCard));

    }
   

})();
