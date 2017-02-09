describe('Olaylar', function() {
    it('Url değişince sistemin tepki vermesi', function(done){
        testClass.function = [];
        window.location.href = "#list/"+ Math.floor((Math.random() * 100) + 1) +"/";
        setTimeout(function() {
            if(testClass.function[0] == "navigation")
                done();
            else
                done("Url değişince navigation fonksiyonu çalışmadı.");
        }, 100);
    });

});