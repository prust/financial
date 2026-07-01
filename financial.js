let filedrag = document.getElementById('filedrag');
filedrag.addEventListener("dragover", FileDragHover, false);
filedrag.addEventListener("dragleave", FileDragHover, false);
filedrag.addEventListener("drop", FileSelectHandler, false);

window.addEventListener('hashchange', navigate);

let start_balance_cents = 986673;
let legacy_cutoff = '2025-04';

let month_names = {'09': 'September', '10': 'October', '11': 'November', '12': 'December', '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August'};

let categories = [
  {id: 0, name: 'Regular Giving', type: 'income'},
  {id: 9, name: 'One-Time Giving', type: 'income'},
  {id: -1, name: '[Uncategorized]', type: 'expense'},
  {id: 2, name: 'Bookkeeper', type: 'expense'},
  {id: 3, name: 'Director', type: 'expense'},
  {id: 10, name: 'Associate Director', type: 'expense'},
  {id: 6, name: 'Events', type: 'expense'},
  {id: 4, name: 'Food', type: 'expense'},
  {id: 5, name: 'Newsletter', type: 'expense'},
  {id: 1, name: 'Online Services', type: 'expense'},
  {id: 7, name: 'Promotional', type: 'expense'},
  {id: 8, name: 'Training & Materials', type: 'expense'},
];

// legacy pseudo-transaction from old spreadsheets (really just month summaries per category)
let trn_json = localStorage.getItem('transactions');
window.transactions = trn_json ? JSON.parse(trn_json) : [
  {"id": "1", "date": "2024-09-01", "amount": 109590, "splits": [{"category_id": 0, "amount": 109590}]},
  {"id": "2", "date": "2024-10-01", "amount": 174589, "splits": [{"category_id": 0, "amount": 174589}]},
  {"id": "3", "date": "2024-11-01", "amount": 114460, "splits": [{"category_id": 0, "amount": 114460}]},
  {"id": "4", "date": "2024-12-01", "amount": 164193, "splits": [{"category_id": 0, "amount": 164193}]},
  {"id": "5", "date": "2025-01-01", "amount": 294205, "splits": [{"category_id": 0, "amount": 294205}]},
  {"id": "6", "date": "2025-02-01", "amount": 211455, "splits": [{"category_id": 0, "amount": 211455}]},
  {"id": "7", "date": "2025-03-01", "amount": 214717, "splits": [{"category_id": 0, "amount": 214717}]},
  {"id": "8", "date": "2024-09-01", "amount": -3298, "splits": [{"category_id": 2, "amount": -3298}]},
  {"id": "9", "date": "2024-10-01", "amount": -0, "splits": [{"category_id": 2, "amount": -0}]},
  {"id": "10", "date": "2024-11-01", "amount": -7537, "splits": [{"category_id": 2, "amount": -7537}]},
  {"id": "11", "date": "2024-12-01", "amount": -3298, "splits": [{"category_id": 2, "amount": -3298}]},
  {"id": "12", "date": "2025-01-01", "amount": -7538, "splits": [{"category_id": 2, "amount": -7538}]},
  {"id": "13", "date": "2025-02-01", "amount": -1884, "splits": [{"category_id": 2, "amount": -1884}]},
  {"id": "14", "date": "2025-03-01", "amount": -4711, "splits": [{"category_id": 2, "amount": -4711}]},
  {"id": "15", "date": "2024-09-01", "amount": -0, "splits": [{"category_id": 3, "amount": -0}]},
  {"id": "16", "date": "2024-10-01", "amount": -92649, "splits": [{"category_id": 3, "amount": -92649}]},
  {"id": "17", "date": "2024-11-01", "amount": -142252, "splits": [{"category_id": 3, "amount": -142252}]},
  {"id": "18", "date": "2024-12-01", "amount": -75635, "splits": [{"category_id": 3, "amount": -75635}]},
  {"id": "19", "date": "2025-01-01", "amount": -55908, "splits": [{"category_id": 3, "amount": -55908}]},
  {"id": "20", "date": "2025-02-01", "amount": -129569, "splits": [{"category_id": 3, "amount": -129569}]},
  {"id": "21", "date": "2025-03-01", "amount": -74966, "splits": [{"category_id": 3, "amount": -74966}]},
  {"id": "22", "date": "2025-01-01", "amount": -2439, "splits": [{"category_id": 6, "amount": -2439}]},
  {"id": "23", "date": "2024-09-01", "amount": -20295, "splits": [{"category_id": 4, "amount": -20295}]},
  {"id": "24", "date": "2024-10-01", "amount": -34896, "splits": [{"category_id": 4, "amount": -34896}]},
  {"id": "25", "date": "2024-11-01", "amount": -37414, "splits": [{"category_id": 4, "amount": -37414}]},
  {"id": "26", "date": "2024-12-01", "amount": -7974, "splits": [{"category_id": 4, "amount": -7974}]},
  {"id": "27", "date": "2025-01-01", "amount": -37382, "splits": [{"category_id": 4, "amount": -37382}]},
  {"id": "28", "date": "2025-02-01", "amount": -41233, "splits": [{"category_id": 4, "amount": -41233}]},
  {"id": "29", "date": "2025-03-01", "amount": -28853, "splits": [{"category_id": 4, "amount": -28853}]},
  {"id": "30", "date": "2024-10-01", "amount": -1141, "splits": [{"category_id": 5, "amount": -1141}]},
  {"id": "31", "date": "2025-01-01", "amount": -28031, "splits": [{"category_id": 5, "amount": -28031}]},
  {"id": "32", "date": "2024-09-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "33", "date": "2024-10-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "34", "date": "2024-11-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "35", "date": "2024-12-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "36", "date": "2025-01-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "37", "date": "2025-02-01", "amount": -11728, "splits": [{"category_id": 1, "amount": -11728}]},
  {"id": "38", "date": "2025-03-01", "amount": -11478, "splits": [{"category_id": 1, "amount": -11478}]},
];

let legacy_trn_splits = {
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
  {pattern: "DEPOSIT BRANCH 0362", category_id: 0},
  {pattern: "INTEREST PAYMENT", category_id: 0},
  {pattern: "RELIAFUND INC DEPOSIT", category_id: 0},
  {pattern: "GIVING FIRE ACH FEES", category_id: 1},
  {pattern: "GOOGLE *GSUITE", category_id: 1},
  {pattern: "GOOGLE GSUITE", category_id: 1},
  {pattern: "GOOGLE WORKSPACE", category_id: 1},
  {pattern: "GUSTO FEE", category_id: 1},
  {pattern: "GUSTO TLR", category_id: 1},
  {pattern: "QUICKEN INC", category_id: 1},
  {pattern: "BHAM TECH FOOD SERVICE", category_id: 4},
  {pattern: "HANA TERIYAKI", category_id: 4},
  {pattern: "MAC FOOD PAVI", category_id: 4},
  {pattern: "PAPA JOHN", category_id: 4},
  {pattern: "SAFEWAY", category_id: 4},
  {pattern: "SUBWAY", category_id: 4},
  {pattern: "TACO TIME", category_id: 4},
  {pattern: "MI RANCHO", category_id: 4},
  {pattern: "COSTCO WHSE", category_id: 4},
  {pattern: "PANDA EXPRESS", category_id: 4},
  {pattern: "TIMEKEEPERS", category_id: 5},
  {pattern: "USPS PO", category_id: 5},
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
  // since these are in the legacy summary data
  new_transactions = new_transactions.filter(trn => trn.date >= legacy_cutoff);

  // build index of preexisting transactions
  let idx = {};
  for (let trn of window.transactions)
    idx[trn.id] = trn;

  // iterate new transactions & add ones that aren't preexisting
  let add_trns = [];
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

  window.transactions.sort((a, b) => a.date == b.date ? 0 : (a.date < b.date ? -1 : 1));

  for (let trn of add_trns) {
    if (trn.id in legacy_trn_splits) {
      trn.splits = legacy_trn_splits[trn.id];
    }
    else {
      // the first rule that matches is the one that "wins"
      for (let rule of auto_cat_rules) {
        if (trn.description.toUpperCase().includes(rule.pattern)) {
          trn.splits = [{category_id: rule.category_id, amount: trn.amount}];
          break;
        }
      }
    }
  }

  saveTransactions();

  navigate();
  return;
};

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(window.transactions, null, 2));
}

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
      curr_trans.splits = [{category_id: -1, amount: curr_trans.amount}];
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
    for (let item of record.splits)
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
        let are_valid = records.every(trn => areSplitsValid(trn));
        let cents = sumAmounts(records);
        if (cat.type == 'expense')
          cents = -cents;

        if (!totals[cat_type][month])
          totals[cat_type][month] = 0;
        totals[cat_type][month] += cents;
        html += `<td class="amt ${are_valid ? '' : 'invalid'}">${displayCents(cents)}</td>`;
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
  let prev_records = transactions.filter(r => r.date < months[0]);
  let prev_profit_loss = sumAmounts(prev_records);
  balance_cents += prev_profit_loss;

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
    for (let cat of t.splits) {
      if (!category_ids.includes(cat.category_id))
        category_ids.push(cat.category_id);
    }
  }
  let cats = categories.filter(cat => category_ids.includes(cat.id));

  document.title = `${month} Month Details`;
  let month_name = month_names[month.slice(-2)];
  html = `<h3>${document.title}</h3>
    <p>${trns.length} transactions for the month of ${month_name}</p>`;

  html += `<div style="width: 75px"></div>
    <table class="table" style="table-layout: fixed; width: 100%">`;
    // html += '<tr><td style="width: 100px"></td><td style="width: 85px"></td><td class="action-btn" style="width: 200px"></td><td></td></tr>';
  html += '<colgroup><col style="width: 100px"><col style="width: 85px"><col class="action-btn"><col></col></colgroup>';
  for (let curr_cat of cats) {
    let records = filterRecords(trns, {month, category_id: curr_cat.id});
    let cents = sumAmounts(records);

    html += `<tr><th colspan="4">${curr_cat.name}: ${displayCents(cents)}</th></tr>`;
    html += records.map(function(record) {
      let is_valid = areSplitsValid(record);
      return `<tr>
        <td>${toUSDate(record.date)}</td>
        <td class="amt ${is_valid ? '' : 'invalid'}">${displayCents(record.amount)}</td>
        <td class="action-btn"><div style="display: inline-block" class="dropdown">
          <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${curr_cat.name}
          </button>
          ${renderCatDropdown(curr_cat, record.ix, record.id)}
          <span class="badge text-bg-${record.split ? 'danger' : 'secondary'} split ${record.split ? 'is-split' : ''}" data-bs-toggle="modal" data-bs-target="#split_modal" data-trn-id="${record.id}">Split</span>
        </div></td>
        <td style="white-space: nowrap">${_.escape(record.description)}</td>
        </tr>`;
    }).join('\n');
  }
  html += '</table>';

  $('report').innerHTML = html;
}

function renderCatDropdown(curr_cat, split_ix, trn_id) {
  let prev_cat = null;
  return `<ul class="dropdown-menu">
    ${categories.map(cat => {
      // track the difference in category types, to inject divider
      let html = prev_cat && prev_cat.type != cat.type ? '<li><hr class="dropdown-divider"></li>' : '';
      prev_cat = cat;

      return html + `<li>
        <a class="dropdown-item cat ${cat == curr_cat ? 'active' : ''}" href="${location.hash}" data-cat-id="${cat.id}" data-trn-id="${trn_id}", data-split-ix="${split_ix}">
          ${cat.name}
        </a></li>`;
    }).join('')}
  </ul>`;
}

// `var` instead of `let` for easier debugging
var modal_trn = null; // live ref to transaction being edited
var modal_splits = null; // deep clone, so splits can be thrown away on 'cancel'
var currency_re = /^-?\d+(\.\d\d)?$/;

function renderSplitModal() {
  $('split_modal_title').innerText = `${modal_trn.description} (${toUSDate(modal_trn.date)})`;

  let splits_sum = sumAmounts(modal_splits);
  let html = `
    <form class="was-validated">
      ${modal_splits.map((split, split_ix) => {
        let cat = categories.find(cat => cat.id == split.category_id);
        return `<div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input type="text" class="form-control split-amount" inputmode="numeric" data-split-ix="${split_ix}" pattern="${currency_re.source}" value="${displayCents(split.amount)}">
          <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${cat.name}</button>
          ${renderCatDropdown(cat, split_ix)}
          <button type="button" class="btn btn-outline-danger del" data-split-ix="${split_ix}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </div>`
      }).join('')}
        <div class="mb-3 text-end">
          <button type="button" class="btn btn-success add">
            <svg class="bi" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
            </svg>
            Add Split
          </button>
        </div>
        <div class="mb-3">
          <label for="split_modal_total" class="col-form-label">Total</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" id="split_modal_total" class="form-control" aria-describedby="total_help_inline" value="${displayCents(splits_sum)}" disabled readonly>
            <div id="total_help_inline" class="form-text invalid-feedback text-start">
              Must total ${displayCents(modal_trn.amount)}
            </div>
          </div>
        </div>
      </div>
    </form>`;
  $('split_modal_body').innerHTML = html;
}

// recalc total and update total validation
$('split_modal_body').addEventListener('input', function(evt) {
  let split_ix = evt.target.dataset.splitIx;
  if (currency_re.test(evt.target.value)) {
    let val = parseFloat(evt.target.value);
    modal_splits[split_ix].amount = Math.round(val * 100);
  }
  validateSplitModal();
});

function validateSplitModal() {
  let are_all_inputs_valid = true;
  let inputs = $('split_modal_body').querySelectorAll('input.split-amount');
  for (let input of inputs) {
    if (!currency_re.test(input.value))
      are_all_inputs_valid = false;
  }

  let splits_sum = are_all_inputs_valid ? sumAmounts(modal_splits) : Number.NaN;
  $('split_modal_total').value = isNaN(splits_sum) ? '' : displayCents(splits_sum);
  if (splits_sum == modal_trn.amount) {
    $('split_modal_total').classList.remove('is-invalid');
    $('split_modal_submit').removeAttribute('disabled');
  }
  else {
    $('split_modal_total').classList.add('is-invalid');
    $('split_modal_submit').setAttribute('disabled', 'disabled');
  }
}

$('split_modal_submit').addEventListener('click', function() {
  modal_trn.splits = modal_splits;
  saveTransactions();
  bootstrap.Modal.getInstance($('split_modal')).hide();
  monthReport(location.hash.replace(/^#/, ''));
});

let click_events = {
  '#report a.cat': onCategoryClick,
  '#report span.split': onSplitClick,
  '#split_modal a.cat': onSplitCategoryClick,
  '#split_modal button.add': onSplitAdd,
  '#split_modal button.del': onSplitDel,
};

// TODO: move this to framework/helper function at the bottom
// and organize one set of event handlers on the #report and one on the #split_modal
// follow backbone & include the event name before the selector
document.addEventListener('click', function(evt) {
  for (let sel in click_events) {
    let node = evt.target;
    while (node && node.matches && !node.matches(sel))
      node = node.parentNode;

    if (node && node.matches) {
      click_events[sel](node.dataset, node, evt);
      break;
    }
  }
});

function onCategoryClick(data) {
  let trn = transactions.find(trn => trn.id == data.trnId);
  trn.splits[data.splitIx].category_id = parseInt(data.catId);
  saveTransactions();
  navigate();
}

function onSplitCategoryClick(data) {
  modal_splits[data.splitIx].category_id = parseInt(data.catId);
  renderSplitModal();
}

function onSplitClick(data) {
  let trn = transactions.find(trn => trn.id == data.trnId);
  modal_trn = trn;
  modal_splits = trn.splits.map(split => _.clone(split));
  renderSplitModal();
}

function onSplitAdd() {
  modal_splits.push({category_id: -1, amount: 0});
  renderSplitModal();
}

function onSplitDel(data) {
  let ix = parseInt(data.splitIx);
  modal_splits.splice(ix, 1);
  renderSplitModal();
  validateSplitModal();
}

function getYear(dt_str) {
  return dt_str.slice(0, 4);
}

function getYearMonth(dt_str) {
  return dt_str.slice(0, 7);
}

function toUSDate(iso_date) {
  let date_parts = iso_date.split('-');
  return `${date_parts[1]}/${date_parts[2]}/${date_parts[0]}`;
}

function filterRecords(records, filters) {
  if (filters.month)
    records = records.filter(r => getYearMonth(r.date) == filters.month);

  let filtered_records;
  // can't check if (filters.category_id) since 0 is a valid category_id
  if ('category_id' in filters) {
    filtered_records = [];
    for (let record of records) {
      let ix = 0;
      for (let item of record.splits) {
        if (item.category_id == filters.category_id)
          filtered_records.push({...item, id: record.id, description: record.description, date: record.date, split: record.splits.length > 1, ix, orig_trn: record});
        ix++;
      }
    }
  }
  else {
    filtered_records = records;
  }

  return filtered_records;
}

function areSplitsValid(record) {
  let trn = record.orig_trn || record;

  return sumAmounts(trn.splits) == trn.amount;
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

function $$(sel) {
  return document.querySelector(sel);
}
