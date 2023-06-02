const TIMEOUT = 30000;
const IMAGE_PATH = 'http://localhost:3000/tests/assets/images';
const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const OPTIONS = {
  cacheMethod: 'readOnly',
  langPath: 'http://localhost:3000/tests/assets/traineddata',
  cachePath: './tests/assets/traineddata',
  corePath: '../node_modules/tesseract.js-core/tesseract-core.wasm.js',
  ...(IS_BROWSER ? { workerPath: '../dist/worker.dev.js' } : {}),
};
const SIMPLE_TEXT = 'Tesseract.js\n';
const SIMPLE_TEXT_HALF = 'Tesse\n';
const COMSIC_TEXT = 'HellO World\nfrom beyond\nthe Cosmic Void\n';
const TESTOCR_TEXT = 'This is a lot of 12 point text to test the\nocr code and see if it works on all types\nof file format.\n\nThe quick brown dog jumped over the\nlazy fox. The quick brown dog jumped\nover the lazy fox. The quick brown dog\njumped over the lazy fox. The quick\nbrown dog jumped over the lazy fox.\n';
const CHINESE_TEXT = '繁 體 中 文 測 試\n';
const BILL_SPACED_TEXT = 'FIRST CHEQUING\n\nLine of Credit 100,000.00 Rate 4.2000\n\nDate      Description                                   Number     Debits     Credits    Balance\n31Jul2018  Balance Forward                                                         99,878.08 -\n01Aug2018  Clearing Cheque                                4987      36.07             99,914.15 -\n01Aug2018  Clearing Cheque                                4986      60.93             99,975.08 -\n01Aug2018  Clearing Cheque                             4982     800.04           100,775.12 EX\n01Aug2018  Clearing Cheque                             4981     823.34           101,598.46 EX\n01Aug2018  Incoming Interac e-Transfer                                   1454 101,583.92 EX\n01Aug2018  Incoming Interac e-Transfer                                   400.00  101,183.92 EX\n01Aug2018  Assisted Deposit                                                3241450  68,769.42 -\n01Aug2018 Transfer out to loan 7                                          1,500.00               70,269.42 -\n02Aug2018  Clearing Cheque                                4984      48.08             70,317.50 -\n02Aug2018  Clearing Cheque                           4985     7051           70,388.01 -\n02Aug2018 Clearing Cheque                           4992    500.00           70.888.01 -\n';
const SIMPLE_WHITELIST_TEXT = 'Tesses\n';
const FORMATS = ['png', 'jpg', 'bmp', 'pbm', 'webp', 'gif'];
const SIMPLE_PNG_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0CAIAAABqhmJGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASuSURBVHhe7dftVdswAIbRzsVAzMM0XabDUCOUxLYsWW4Jp+/pvf9w9GH76CHw4x2IJWAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAI9p8G/PbyY8rL2686g8t+vnqHTyfgIYfvz/26veTXn/UKX8+f0EU9bHrtu/6KfAN/AwEXAj7lFf2TBFw4nae8on+SgIvJ01n/KLzpDK+L3bT/Ap4O+HC+V12mTH+M3gzcLbIY/EO6HfxYp13k09nb6r3UqcdnjoCL3ll72J26h+35Oxy2XvZ0wOLaXq9v2+F1UC+7RZtMZ/DnfX1lwDOPzwUCLo7O2trtDK8H3M/iqoc6bj1subT68XTA/F7bGJooyzKbhTvLPHY8eJLHlbNX1DqYUVfdXbqwJjsCLsans37aNNJM6w68OR0wv9f9ymKw3k67yn2ZZpHlg3a3zis60s6oV+ZvlzMCLoanc3Dsdt9TdWT/lM8OmNjr5KY72jmzq1zfrbvXtVtmRMDF8HTWcgaaqIrD1U4G/MFewxrW262s5jS/Fzpmdts6mnHy+Fwl4GJ0OjsNrG1P/y7CNo3+gEt7jW56MVprNed7A/5w+n6YJ+BieDpnj/jO6pweTz0acGWvmZveL9XOmd3x6wKuTt8PEwRczLRw4eje1XX7c/cDruw1uuneOu2c4aOvzI57mJhRh1xZlQ0BF+Oz9vcF96fuB1zYa7R2b5mD6/XSwdfg8snj4q21+W/L02dfzIxhQMDFyTm6Hd7m+JYP7rPKT5sRuzhOBywm91rUkYc3fV9ltchtr8VmzuGOdfDB9N1tFYefNfdXLmyGjNZkhoCLUQufVqd/7z7rUcLW/XieDvg0s9difNOdRV5ePibt5vTuazusWbF9rs2E5v4mH58LBFyMW7g5OID7s9cMuTygmt9rcNPb5MrAz0lHc3Z9Ht7XZsxqxO36ZtLR/c0+PpMEzLOc/4LhrwmYZ6lfywJ+JgHzJPr9DgLmi23/zdXvcwmYL7YKWL1PJ2AIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmAIJmCI9f7+G6yFxVg/GyYwAAAAAElFTkSuQmCC';
const SIMPLE_JPG_BASE64 = 'data:image/jpeg;base64,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';

if (typeof module !== 'undefined') {
  module.exports = {
    TIMEOUT,
    IMAGE_PATH,
    IS_BROWSER,
    SIMPLE_PNG_BASE64,
    SIMPLE_JPG_BASE64,
    CHINESE_TEXT,
    SIMPLE_TEXT,
    SIMPLE_WHITELIST_TEXT,
    SIMPLE_TEXT_HALF,
    COMSIC_TEXT,
    TESTOCR_TEXT,
    BILL_SPACED_TEXT,
    FORMATS,
    OPTIONS,
  };
}
