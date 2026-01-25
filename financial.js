let filedrag = document.getElementById('filedrag');
filedrag.addEventListener("dragover", FileDragHover, false);
filedrag.addEventListener("dragleave", FileDragHover, false);
filedrag.addEventListener("drop", FileSelectHandler, false);

window.addEventListener('hashchange', navigate);

// let trn_json = localStorage.getItem('transactions');
// window.transactions = trn_json ? JSON.parse(trn_json) : [];

let start_balance_cents = 986673;
let legacy_cutoff = '2025-04';

let month_names = {'09': 'September', '10': 'October', '11': 'November', '12': 'December', '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August'};

let categories = [
  {id: 0, name: 'Regular Giving', type: 'income'},
  {id: 9, name: 'One-Time Giving', type: 'income'},
  {id: -1, name: '[Uncategorized]', type: 'expense'},
  {id: 2, name: 'Bookkeeper', type: 'expense'},
  {id: 3, name: 'Director', type: 'expense'},
  {id: 6, name: 'Events', type: 'expense'},
  {id: 4, name: 'Food', type: 'expense'},
  {id: 5, name: 'Newsletter', type: 'expense'},
  {id: 1, name: 'Online Services', type: 'expense'},
  {id: 7, name: 'Promotional', type: 'expense'},
  {id: 8, name: 'Training & Materials', type: 'expense'},
];

// legacy pseudo-transaction from old spreadsheets (really just month summaries per category)
window.transactions = [
  {"id": "1", "date": "2024-09-01", "amount": 109590, "categories": [{"category_id": 0, "amount": 109590}]},
  {"id": "2", "date": "2024-10-01", "amount": 174589, "categories": [{"category_id": 0, "amount": 174589}]},
  {"id": "3", "date": "2024-11-01", "amount": 114460, "categories": [{"category_id": 0, "amount": 114460}]},
  {"id": "4", "date": "2024-12-01", "amount": 164193, "categories": [{"category_id": 0, "amount": 164193}]},
  {"id": "5", "date": "2025-01-01", "amount": 294205, "categories": [{"category_id": 0, "amount": 294205}]},
  {"id": "6", "date": "2025-02-01", "amount": 211455, "categories": [{"category_id": 0, "amount": 211455}]},
  {"id": "7", "date": "2025-03-01", "amount": 214717, "categories": [{"category_id": 0, "amount": 214717}]},
  {"id": "8", "date": "2024-09-01", "amount": -3298, "categories": [{"category_id": 2, "amount": -3298}]},
  {"id": "9", "date": "2024-10-01", "amount": -0, "categories": [{"category_id": 2, "amount": -0}]},
  {"id": "10", "date": "2024-11-01", "amount": -7537, "categories": [{"category_id": 2, "amount": -7537}]},
  {"id": "11", "date": "2024-12-01", "amount": -3298, "categories": [{"category_id": 2, "amount": -3298}]},
  {"id": "12", "date": "2025-01-01", "amount": -7538, "categories": [{"category_id": 2, "amount": -7538}]},
  {"id": "13", "date": "2025-02-01", "amount": -1884, "categories": [{"category_id": 2, "amount": -1884}]},
  {"id": "14", "date": "2025-03-01", "amount": -4711, "categories": [{"category_id": 2, "amount": -4711}]},
  {"id": "15", "date": "2024-09-01", "amount": -0, "categories": [{"category_id": 3, "amount": -0}]},
  {"id": "16", "date": "2024-10-01", "amount": -92649, "categories": [{"category_id": 3, "amount": -92649}]},
  {"id": "17", "date": "2024-11-01", "amount": -142252, "categories": [{"category_id": 3, "amount": -142252}]},
  {"id": "18", "date": "2024-12-01", "amount": -75635, "categories": [{"category_id": 3, "amount": -75635}]},
  {"id": "19", "date": "2025-01-01", "amount": -55908, "categories": [{"category_id": 3, "amount": -55908}]},
  {"id": "20", "date": "2025-02-01", "amount": -129569, "categories": [{"category_id": 3, "amount": -129569}]},
  {"id": "21", "date": "2025-03-01", "amount": -74966, "categories": [{"category_id": 3, "amount": -74966}]},
  {"id": "22", "date": "2025-01-01", "amount": -2439, "categories": [{"category_id": 6, "amount": -2439}]},
  {"id": "23", "date": "2024-09-01", "amount": -20295, "categories": [{"category_id": 4, "amount": -20295}]},
  {"id": "24", "date": "2024-10-01", "amount": -34896, "categories": [{"category_id": 4, "amount": -34896}]},
  {"id": "25", "date": "2024-11-01", "amount": -37414, "categories": [{"category_id": 4, "amount": -37414}]},
  {"id": "26", "date": "2024-12-01", "amount": -7974, "categories": [{"category_id": 4, "amount": -7974}]},
  {"id": "27", "date": "2025-01-01", "amount": -37382, "categories": [{"category_id": 4, "amount": -37382}]},
  {"id": "28", "date": "2025-02-01", "amount": -41233, "categories": [{"category_id": 4, "amount": -41233}]},
  {"id": "29", "date": "2025-03-01", "amount": -28853, "categories": [{"category_id": 4, "amount": -28853}]},
  {"id": "30", "date": "2024-10-01", "amount": -1141, "categories": [{"category_id": 5, "amount": -1141}]},
  {"id": "31", "date": "2025-01-01", "amount": -28031, "categories": [{"category_id": 5, "amount": -28031}]},
  {"id": "32", "date": "2024-09-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "33", "date": "2024-10-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "34", "date": "2024-11-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "35", "date": "2024-12-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "36", "date": "2025-01-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "37", "date": "2025-02-01", "amount": -11728, "categories": [{"category_id": 1, "amount": -11728}]},
  {"id": "38", "date": "2025-03-01", "amount": -11478, "categories": [{"category_id": 1, "amount": -11478}]},
];

let legacy_trn_cats = {
  "00002061470000036100": [{"category_id": 2, "amount": -3123}, {"category_id": 3, "amount": -74000}],
  "00002073640000034703": [{"category_id": 2, "amount": -3513}, {"category_id": 3, "amount": -109322}],
  "00002095980000039276": [{"category_id": 2, "amount": -3904}, {"category_id": 3, "amount": -105164}],
  "00002085410000035679": [{"category_id": 2, "amount": -781}, {"category_id": 3, "amount": -99858}],
  "00002073640000034702": [{"category_id": 2, "amount": -725}, {"category_id": 3, "amount": -21277}],
  "00002061470000036099": [{"category_id": 2, "amount": -644}, {"category_id": 3, "amount": -14405}],
  "00002062530000035450": [{"category_id": 3, "amount": 80}],
  "00002095980000039275": [{"category_id": 2, "amount": -806}, {"category_id": 3, "amount": -20471}],
  "00002085410000035678": [{"category_id": 2, "amount": -161}, {"category_id": 3, "amount": -19436}],
};

let auto_cat_rules = [
  {pattern: "BANKCARD 1161 MTOT", category_id: 0},
  {pattern: "BHAM TECH FOOD SERVICE", category_id: 4},
  {pattern: "DEPOSIT BRANCH 0362", category_id: 0},
  {pattern: "GIVING FIRE ACH FEES", category_id: 1},
  {pattern: "GOOGLE *GSUITE", category_id: 1},
  {pattern: "GOOGLE GSUITE", category_id: 1},
  {pattern: "GUSTO FEE", category_id: 1},
  {pattern: "GUSTO TLR", category_id: 1},
  {pattern: "HANA TERIYAKI", category_id: 4},
  {pattern: "INTEREST PAYMENT", category_id: 0},
  {pattern: "MAC FOOD PAVI", category_id: 4},
  {pattern: "PAPA JOHN", category_id: 4},
  {pattern: "SAFEWAY", category_id: 4},
  {pattern: "SUBWAY", category_id: 4},
  {pattern: "RELIAFUND INC DEPOSIT", category_id: 0},
  {pattern: "TACO TIME", category_id: 4},
  {pattern: "TIMEKEEPERS", category_id: 5},
];

navigate();

function navigate() {
  let hash = location.hash.replace(/^#/, '');
  if (/^\d\d\d\d-\d\d$/.test(hash)) {
    monthReport(hash);
  }
  else if (/^\d\d\d\d$/.test(hash)) {
    annualReport(parseInt(hash));
  }
  else {
    let start_year = new Date().getFullYear();
    let SEPT = 8; // JS months are 0-based
    if (new Date().getMonth() < SEPT)
      start_year--;
    annualReport(start_year);
  }
}

// file drag hover
function FileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileSelectHandler(e) {
  // cancel event and hover styling
  FileDragHover(e);

  // fetch FileList object
  let file = (e.target.files || e.dataTransfer.files)[0];

  console.log('file dropped:', file.name, file.type, file.size);
  let reader = new FileReader();
  reader.onload = onFileLoad.bind(null, reader, file);
  reader.readAsText(file);
}

async function onFileLoad(reader, file, e) {
  let text = reader.result;

  if (!/\.[OQ]FX/i.test(file.name))
    return alert(`File name "${file.name}" does not end in .OFX or .QFX`);

  let new_transactions = parseOFXQFX(text);

  // don't import anything before the legacy cutoff (April 2025)
  // since these are already in the legacy summary data
  new_transactions = new_transactions.filter(trn => trn.date >= legacy_cutoff);

  // build index of preexisting transactions
  let idx = {};
  for (let trn of window.transactions)
    idx[trn.id] = trn;

  // count records added
  let add_trns = [];

  // iterate new transactions & add/update preexisting ones
  for (let new_trn of new_transactions) {
    let old_trn = idx[new_trn.id];
    if (old_trn) {
      if (old_trn.date != new_trn.date || old_trn.amount != new_trn.amount || old_trn.description != new_trn.description)
        console.warning(`Did not import updated transaction date/amount/description (${new_trn.id}): ${new_trn.date} / ${new_trn.amount} / ${new_trn.description}`);
    }
    else {
      window.transactions.push(new_trn);
      add_trns.push(new_trn);
    }
  }

  window.transactions.sort((a, b) => a.date - b.date);
  
  localStorage.setItem('transactions', JSON.stringify(window.transactions, null, 2));
  alert(`Added ${add_trns.length} transactions (${new_transactions.length - add_trns.length} were already imported) from ${file.name} import`);

  let legacy_cat_ct = 0;
  let auto_cat_ct = 0;
  for (let trn of add_trns) {
    if (trn.id in legacy_trn_cats) {
      trn.categories = legacy_trn_cats[trn.id];
      legacy_cat_ct++;
    }
    else {
      // the first rule that matches is the one that "wins"
      for (let rule of auto_cat_rules) {
        if (trn.description.toUpperCase().includes(rule.pattern)) {
          trn.categories = [{category_id: rule.category_id, amount: trn.amount}];
          auto_cat_ct++;
          break;
        }
      }
    }
  }

  if (legacy_cat_ct)
    alert(`Assigned categories to ${legacy_cat_ct} transactions based on legacy data`);
  if (auto_cat_ct)
    alert(`Auto-assigned categories to ${auto_cat_ct} transactions based on rules`);

  navigate();
  return;
};

// sample OFX files available at https://github.com/wesabe/fixofx/tree/master/test/fixtures
// QFX is a quicken-specific extension that adds stuff, but we should only be relying on core tags/attributes
function parseOFXQFX(text) {
  let transactions = [];

  let parser = sax.parser(false);
  let curr_tag = '';
  let curr_trans = null;

  parser.onerror = function (e) {
    console.error(e);
  };
  parser.ontext = function (t) {
    t = t.trim();
    if (t && curr_trans) {
      if (curr_tag == 'TRNTYPE')
        curr_trans.type = t.toLowerCase();
      else if (curr_tag == 'DTPOSTED')
        curr_trans.date = `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}`;
      else if (curr_tag == 'TRNAMT')
        curr_trans.amount = Math.round(parseFloat(t) * 100);
      else if (curr_tag == 'FITID')
        curr_trans.id = t;
      else if (curr_tag == 'NAME')
        curr_trans.description = t;
    }
  };
  parser.onopentag = function (node) {
    curr_tag = node.name;
    if (curr_tag == 'STMTTRN') {
      if (curr_trans)
        throw new Error('<SMTMTRN opened without previous one closing');
      curr_trans = {};
    }
  };
  parser.onclosetag = function (tag_name) {
    if (tag_name == 'STMTTRN') {
      // ensure every record has a category; default to -1 (uncategorized)
      curr_trans.categories = [{category_id: -1, amount: curr_trans.amount}];
      transactions.push(curr_trans);
      curr_trans = null;
    }
  };

  parser.write(text).close();
  if (curr_trans)
    throw new Error('final <SMTMTRN not closed');

  console.log(transactions);
  return transactions;
}

function annualReport(year_1) {
  // get the bounds of the data, so we know what prev/next links we can provide
  // TODO: make these global so we don't need to walk them all the time?
  let earliest_date = transactions[0].date;
  let latest_date = transactions[0].date;
  for (let trn of transactions) {
    if (trn.date < earliest_date)
      earliest_date = trn.date;
    else if (trn.date > latest_date)
      latest_date = trn.date;
  }

  let year_2 = year_1 + 1;
  let months = [`${year_1}-09`, `${year_1}-10`, `${year_1}-11`, `${year_1}-12`, `${year_2}-01`, `${year_2}-02`, `${year_2}-03`, `${year_2}-04`, `${year_2}-05`, `${year_2}-06`, `${year_2}-07`, `${year_2}-08`];
  let year_records = transactions.filter(r => months.includes(getYearMonth(r.date)));

  // pre-calculate all relevant categories
  let category_ids = [];
  for (let record of year_records)
    for (let item of record.categories)
      if (!category_ids.includes(item.category_id))
        category_ids.push(item.category_id);

  let cats = categories.filter(cat => category_ids.includes(cat.id));

  // heading
  document.title = `${year_1}-${year_2} Annual Overview`;
  let html = `<h3>${document.title}`;

  if (earliest_date < months[0] || latest_date.slice(0, 7) > months[11]) {
    html += '<div class="btn-group" role="group" aria-label="year navigation buttons" style="margin-left: 1rem">';
    if (earliest_date < months[0])
      html += `<a href="#${year_1 - 1}" class="btn btn-outline-secondary">← Previous Year</button>`;
    if (latest_date.slice(0, 7) > months[11])
      html += `<a href="#${year_1 + 1}" class="btn btn-outline-secondary">Next Year →</button>`;
    html += '</div>';
  }
  html += '</h3>';

  // build table
  html += '<table>';
  // display column headers at the top of the table
  html += '<tr>';
  html += '<th></th>'; // empty cell in the top-left corner
  for (let month of months) {
    let month_name = month_names[month.slice(-2)];
    html += `<th><b>${month >= legacy_cutoff ? `<a href="#${month}" class="month">${month_name}</a>` : month_name}</b></th>`;
  }
  html += '</tr>';

  let totals = {income: {}, expense: {}};
  for (let cat_type of ['income', 'expense']) {
    html += `<tr><th class="sidebar"><u>${capitalize(cat_type)}</u></th></tr>`;
    for (let cat of cats.filter(cat => cat.type == cat_type)) {
      html += `<tr><th class="category">${cat.name}</th>`;
      for (let month of months) {
        let records = filterRecords(year_records, {month, category_id: cat.id});
        let cents = sumAmounts(records);
        if (cat.type == 'expense')
          cents = -cents;

        if (!totals[cat_type][month])
          totals[cat_type][month] = 0;
        totals[cat_type][month] += cents;
        html += `<td class="amt">${displayCents(cents)}</td>`;
      }
      html += '</tr>';
    }

    html += '<tr><th class="sidebar">Total</th>';
    for (let month of months) {
      html += `<td class="amt"><b>${displayCents(totals[cat_type][month])}</b></td>`;
    }
    html += '</tr>';
    html += '<tr><th class="separator"></th></tr>';
  }

  html += '<tr><th class="sidebar">Profit / Loss</th>';
  for (let month of months) {
    html += `<td class="amt"><b>${displayCents(totals.income[month] - totals.expense[month])}</b></td>`;
  }
  html += '</tr>';

  html += '<tr><th class="separator"></th></tr>';

  html += '<tr><th class="sidebar">Balance</th>';
  let balance_cents = start_balance_cents;
  for (let month of months) {
    if (totals.income[month] || totals.expense[month]) {
      balance_cents += totals.income[month] - totals.expense[month];
      html += `<td class="amt"><b>${displayCents(balance_cents)}</b></td>`;
    }
    else {
      // empty balance cell for months that aren't populated with income/expenses yet
      html += `<td class="amt"></td>`;
    }
  }
  html += '</tr>';
  
  html += '</table>';
  $('report').innerHTML = html;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function monthReport(month) {
  let trns = transactions.filter(t => t.date.startsWith(month));

  let category_ids = [];
  for (let t of trns) {
    for (let cat of t.categories) {
      if (!category_ids.includes(cat.category_id))
        category_ids.push(cat.category_id);
    }
  }
  let cats = categories.filter(cat => category_ids.includes(cat.id));

  let month_name = month_names[month.slice(-2)];
  html = `<p>${trns.length} transactions for the month of ${month_name}</p>`;

  for (let cat of cats) {
    let records = filterRecords(trns, {month, category_id: cat.id});
    let cents = sumAmounts(records);

    html += `<p>${cat.name}: ${displayCents(cents)}</p>`;
    html += transactionsToList(records);
  }
  $('report').innerHTML = html;
  document.title = $('report_header').innerText = `${month} Month Details`;
}

function transactionsToList(records) {
  let html = '<ul>';
  html += records.map(function(record) {
    let date_parts = record.date.split('-');
    let us_date = `${date_parts[1]}/${date_parts[2]}/${date_parts[0]}`;
    return `<li>${us_date} ${displayCents(record.amount)} ${_.escape(record.description)}</li>`;
  }).join('\n');
  return html + '</ul>';
}

function getYear(dt_str) {
  return dt_str.slice(0, 4);
}

function getYearMonth(dt_str) {
  return dt_str.slice(0, 7);
}

function filterRecords(records, filters) {
  if (filters.month)
    records = records.filter(r => getYearMonth(r.date) == filters.month);
  
  let filtered_records;
  // can't check if (filters.category_id) since 0 is a valid category_id
  if ('category_id' in filters) {
    filtered_records = [];
    for (let record of records)
      for (let item of record.categories)
        if (item.category_id == filters.category_id)
          filtered_records.push({...item, description: record.description, date: record.date});
  }
  else {
    filtered_records = records;
  }

  return filtered_records;
}

function sumAmounts(records) {
  let total = 0;
  for (let record of records)
    total += record.amount;
  
  return total;
}

function displayCents(cents) {
  if (!cents)
    return '';
  let val = cents / 100;
  let str = val.toFixed(2);
  if (val >= 1000)
    str = `${str.slice(0, -6)},${str.slice(-6)}`;
  return str;
}

function assert(val) {
  if (!val)
    throw new Error(`Assertion failed`);
}

function $(id) {
  return document.getElementById(id);
}