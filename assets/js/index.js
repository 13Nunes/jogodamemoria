let index = {
    // Vars
    chances: 10,
    hits: 0,
    misses: 0,

    // Methos
    init: function(){
        index.updateScoreBoard();
        index.shuffleCards("#container-base-form");
        index.shuffleCards("#container-past-tense");
        index.shuffleCards("#container-past-participle");
    },
    updateScoreBoard: function(){
        $("#chances").text(index.chances);
        $("#misses").text(index.misses);
        $("#hits").text(index.hits);
    },
    shuffleCards: function(deck){
        var parent = $(deck);
        var divs = parent.children('div');
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    },
    flipCard: function(element){
        // Init
        let $card              = $(element);
        let verbPastParticiple = $card.attr('data-verb-tense');
        let verbBaseForm       = $card.attr('data-base-form');
        let verbType           = $card.attr('data-type');

        // Check card face
        if($card.hasClass('face-up')){
            // Face-down Card
            $card.removeClass('face-up').removeClass('flip').addClass('face-down').addClass('flip-invert');
        }else{
            // Prevents cards from the same group
            if($("[data-type='"+verbType+"'].face-up").length > 0){return false;}

            // Face-up Card
            $card.removeClass('face-down').removeClass('flip-invert').addClass('face-up').addClass('flip');

            // Play sound
            let $audio = document.getElementById('audio');
            $audio.setAttribute('src', 'assets/cards/' + verbBaseForm + '/' + verbPastParticiple + '.mp3');
            setTimeout(function(){
                $audio.play();

                // Check winner
                let qtyCardsFacep = $(".card.face-up").length;
                if(qtyCardsFacep >= 3){
                    // Check misses and hits
                    if($("[data-base-form='"+verbBaseForm+"'].face-up").length >= 3){
                        // +1 Hit, update score hits and remove cards
                        index.hits++;
                        $("#hits").text(index.hits);
                        $("[data-base-form='"+verbBaseForm+"'].face-up").addClass('correct').removeClass('face-up');

                        // Bonus: +1 Chance
                        index.chances++;
                        index.updateScoreBoard();

                        // Winner
                        if($(".card.correct").length == $(".card").length){
                            alert("Vencedor");
                            location.reload(true);
                        }
                    }else{
                        index.misses++;
                        index.chances--;
                        $("#misses").text(index.misses);
                        $("#chances").text(index.chances);
                        $(".face-up").trigger('click');
                    }

                    // Looser
                    if(index.chances == 0){
                        alert("Game Over");
                        location.reload(true);
                    }

                }
            }, 1000);
        }
    }
}
index.init();