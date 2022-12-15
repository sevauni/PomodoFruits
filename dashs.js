function myFunction() {
    let horoskopes = {
        aries: ['aries aries aries', 'aries aries','saaas'],
        taurus: ['taurus taurus taurus', 'taurus taurus','saaas','saasdadasas'],
        gemini: ['gemini gemini gemini', 'gemini gemini'],
    };


    //let key = (Object.keys(horoskopes))[1];

    let key = 'gemini';

    const randomNumber= Math.floor(Math.random() * horoskopes[key].length);

    
    console.log(horoskopes[key][randomNumber]);
    // 
    // //horoscopes = document.getElementById("zodiak").value;
    // // document.getElementById("eduform").innerHTML = horoscopes.random;
    // console.log(randomElement);
}


myFunction();
/*function myFunction(){
    let horoskopes = ['aries', 'taurus', 'gemini' ]
    let zodiak = document.getElementById("zodiak").value;
    document.getElementById("eduform").innerHTML = horoscopes[Math.random()
}*/