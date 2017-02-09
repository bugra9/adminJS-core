describe('navigationEdit()', function() {
  it('Genel bilgi girişlerinin oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationEdit('a.md');
    assert(testClass.buffer[0].replace(/[ \t\n]+/g,'') == `
      <h4 class="ui dividing header">Genel Bilgiler</h4>
      <div class="field">
        <label>Başlık</label>
        <input type="text" name="title" value="Deneme" />
      </div>`.replace(/[ \t\n]+/g,''), 'Tablo başlığı doğru oluşturulmamış.');
  });
  it('Yayınlama bilgi girişlerinin oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationEdit('a.md');
    assert(testClass.buffer[1].replace(/[ \t\n]+/g,'') == `
      <h4 class="ui dividing header">Yayınlama Bilgileri</h4>
      <div class="field">
        <label>Konum</label>
        <input type="text" name="file.path" value="a.md" />
      </div>`.replace(/[ \t\n]+/g,''), 'Tablo başlığı doğru oluşturulmamış.');
  });
  it('Belirsiz girişlerinin oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationEdit('a.md');
    assert(testClass.buffer[2].replace(/[ \t\n]+/g,'') == `
      <div class="field">
        <label>a1</label>
        <input type="text" name="a1" value="deneme a1" />
      </div>`.replace(/[ \t\n]+/g,''), 'Tablo başlığı doğru oluşturulmamış.');
  });
  it('İçerik girişlerinin oluşumu', function() {
    testClass.buffer = [];
    testClass.navigationEdit('a.md');
    assert(testClass.buffer[3].replace(/[ \t\n]+/g,'') == `
      <div class="field">
        <label>İçerik</label>
        <textarea class="mdEditor" rows="undefined" name="content">Deneme Yazısı</textarea>
      </div>`.replace(/[ \t\n]+/g,''), 'Tablo başlığı doğru oluşturulmamış.');
  });
});