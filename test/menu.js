describe('Menü', function() {
    it('Menü oluşturuluyor', function() {
        testClass.buffer = [];
        testClass.createMenu();
        assert(testClass.buffer[0].replace(/[ \t\n]+/g,'') == `
        <a class="item" href="#list/_other/author/">
            Yazar 
            <div class="ui left pointing label teal">25</div>
        </a>
        <div class="ui  small header center aligned inverted">Advanced</div>
        <a class="item" href="#list/_extension/">
            Extensions 
            <div class="ui left pointing label pink">12</div>
        </a>`.replace(/[ \t\n]+/g,''), "Menü düzgün oluşturulmamış.");
    });
});