describe('Veri İşlevleri', function() {
    it('findAll() => file.path == "b/a.md"', function() {
        var temp = testClass.findAll([{
            attr: "file.path",
            value: "b/a.md",
            op: "=="
        }]);
        assert(temp.length > 0, 'Kayıt bulunamadı.');
    });
    it('findAll() => "b/" dizini altındaki dosyalar aranıyor...', function() {
        var temp = testClass.findAll([{
            attr: "file.path",
            value: "b/",
            op: "path"
        }]);
        assert(temp.length > 0, 'Kayıt bulunamadı.');
    });

    it('condition("==", "deneme", "deneme") == true', function() {
        assert(testClass.condition("==", "deneme", "deneme"), 'Kayıt bulunamadı.');
    });
    it('condition("==", "deneme", "deneme2") == false', function() {
        assert(!testClass.condition("==", "deneme", "deneme2"), 'Kayıt bulunamadı.');
    });
    it('condition(">", 3, 2) == true', function() {
        assert(testClass.condition(">", 3, 2), 'Kayıt bulunamadı.');
    });
    it('condition(">", 3, 3) == false', function() {
        assert(!testClass.condition(">", 3, 3), 'Kayıt bulunamadı.');
    });
    it('condition(">=", 3, 3) == true', function() {
        assert(testClass.condition(">=", 3, 3), 'Kayıt bulunamadı.');
    });
    it('condition(">=", 3, 4) == false', function() {
        assert(!testClass.condition(">=", 3, 4), 'Kayıt bulunamadı.');
    });

    it('condition("<", 1, 2) == true', function() {
        assert(testClass.condition("<", 1, 2), 'Kayıt bulunamadı.');
    });
    it('condition("<", 3, 3) == false', function() {
        assert(!testClass.condition("<", 3, 3), 'Kayıt bulunamadı.');
    });
    it('condition("<=", 3, 3) == true', function() {
        assert(testClass.condition("<=", 3, 3), 'Kayıt bulunamadı.');
    });
    it('condition("<=", 5, 4) == false', function() {
        assert(!testClass.condition("<=", 5, 4), 'Kayıt bulunamadı.');
    });

    it('condition("[]", 2, [2, 5]) == true', function() {
        assert(testClass.condition("[]", 2, [2, 5]), 'Kayıt bulunamadı.');
    });
    it('condition("[]", 4, [2, 5]) == false', function() {
        assert(!testClass.condition("[]", 4, [2, 5]), 'Kayıt bulunamadı.');
    });

    it('condition("contain", [2, 5], 2) == true', function() {
        assert(testClass.condition("contain", [2, 5], 2), 'Kayıt bulunamadı.');
    });
    it('condition("contain", [2, 5], 4) == false', function() {
        assert(!testClass.condition("contain", [2, 5], 4), 'Kayıt bulunamadı.');
    });

    it('condition("contain", "b/deneme", "den") == true', function() {
        assert(testClass.condition("contain", "b/deneme", "den"), 'Kayıt bulunamadı.');
    });
    it('condition("contain", "b/deneme", "den2") == false', function() {
        assert(!testClass.condition("contain", "b/deneme", "den2"), 'Kayıt bulunamadı.');
    });

    it('condition("path", "b/deneme/aa", "b/deneme/") == true', function() {
        assert(testClass.condition("path", "b/deneme/aa", "b/deneme/"), 'Kayıt bulunamadı.');
    });
    it('condition("path", "b/deneme/aa", "b/den") == false', function() {
        assert(!testClass.condition("path", "b/deneme/aa", "b/den"), 'Kayıt bulunamadı.');
    });
    it('condition("path", "b/deneme/aa", "b/") == false', function() {
        assert(!testClass.condition("path", "b/deneme/aa", "b/"), 'Kayıt bulunamadı.');
    });

    it('getAttrList() -> Ortak özellik testi', function() {
        var temp = testClass.getAttrList([0, 1], testClass.getType('/b/'));
        assert(temp.length == 1 && temp[0] == "title", 'Kayıt bulunamadı.');
    });
    it('getAttrList() -> Benzer özellik testi', function() {
        var temp = testClass.getAttrList([1, 2], testClass.getType('/b/'));
        assert(temp.length == 2 && temp[0] == "title" && temp[1] == "b1", 'Kayıt bulunamadı.');
    });

    it('getDataAttr() -> file.path', function() {
        var temp = testClass.getDataAttr('file.path', 1);
        assert(temp == "b/a.md", 'Kayıt bulunamadı.');
    });
    it('getDataAttr() -> b1', function() {
        var temp = testClass.getDataAttr('b1', 1);
        assert(temp == "aa", 'Kayıt bulunamadı.');
    });

});