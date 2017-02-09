describe('navigationList()', function() {
  it('Listeleme başlık oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationList('b/');
    assert(testClass.buffer[0].replace(/[ \t\n]+/g,'') == '<tr><th></th><th>Başlık</th><th>b1</th><th>İşlemler</th></tr>'.replace(/[ \t\n]+/g,''), 'Tablo başlığı doğru oluşturulmamış.');
  });
  it('Listeleme içerik oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationList('b/');
    assert(testClass.buffer[1].replace(/[ \t\n]+/g,'') == `
      <tr><td class="collapsing" title="b/a.md"><i class="file outline icon"></i></td><td>Deneme2</td><td>aa</td><td class="right aligned collapsing">
        <a href="#edit/b/a.md"><i class="edit icon"></i></a>
        <a href="#toggle/b/a.md"><i class="circle icon green"></i></a>
        <a href="#delete/b/a.md"><i class="remove icon red"></i></a>
      </td></tr><tr><td class="collapsing" title="b/b.md"><i class="file outline icon"></i></td><td>Deneme3</td><td>dd</td><td class="right aligned collapsing">
        <a href="#edit/b/b.md"><i class="edit icon"></i></a>
        <a href="#toggle/b/b.md"><i class="circle icon green"></i></a>
        <a href="#delete/b/b.md"><i class="remove icon red"></i></a>
      </td></tr>`.replace(/[ \t\n]+/g,''), 'Tablo içeriği doğru oluşturulmamış.');
  });
  it('Listeleme dizin oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationList('');
    assert(testClass.buffer[2].replace(/[ \t\n]+/g,'') == `
      <a class="item" href="#list/b/">
        <i class="big folder icon"></i>
        <div class="content">
          <div class="header">b</div>
        </div>
      </a>`.replace(/[ \t\n]+/g,''), 'Dizinler doğru oluşturulmamış.');
  });

  it('getDirs()', function() {
      var temp = testClass.getDirs("");
      assert(temp.length == 1 && temp[0] == "b", 'Kayıt bulunamadı.');
  });
});